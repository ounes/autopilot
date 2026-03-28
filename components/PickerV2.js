import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

/**
 * Picker Component — Design System compliant
 * Modern modal bottom sheet avec recherche intégrée
 */
export default function Picker({
  label,
  value,
  items,
  onValueChange,
  placeholder,
  searchable = false,
  error,
  disabled = false,
  style,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedItem = items.find(item => item.value === value);
  const displayValue = selectedItem ? selectedItem.label : placeholder || 'Sélectionner';

  const filteredItems = searchable
    ? items.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  const handleSelect = (itemValue) => {
    onValueChange(itemValue);
    setModalVisible(false);
    setSearchQuery('');
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.pickerButton,
          error && styles.pickerError,
          disabled && styles.pickerDisabled,
        ]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <Text style={[
          styles.pickerText,
          !selectedItem && styles.placeholderText,
          disabled && styles.disabledText,
        ]}>
          {displayValue}
        </Text>
        <Ionicons
          name="chevron-down"
          size={theme.components.icon.sm}
          color={disabled ? theme.colors.text.disabled : theme.colors.text.tertiary}
        />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label || 'Sélectionner'}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={theme.components.icon.lg} color={theme.colors.text.secondary} />
              </TouchableOpacity>
            </View>

            {/* Search bar */}
            {searchable && (
              <View style={styles.searchContainer}>
                <Ionicons
                  name="search"
                  size={theme.components.icon.md}
                  color={theme.colors.text.tertiary}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Rechercher..."
                  placeholderTextColor={theme.colors.text.disabled}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Ionicons
                      name="close-circle"
                      size={theme.components.icon.md}
                      color={theme.colors.text.tertiary}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* List */}
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.listItem,
                    item.value === value && styles.listItemSelected,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={[
                    styles.listItemText,
                    item.value === value && styles.listItemTextSelected,
                  ]}>
                    {item.label}
                  </Text>
                  {item.value === value && (
                    <Ionicons
                      name="checkmark"
                      size={theme.components.icon.md}
                      color={theme.colors.primary[600]}
                    />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons
                    name="search-outline"
                    size={theme.components.icon.xl}
                    color={theme.colors.text.disabled}
                  />
                  <Text style={styles.emptyText}>Aucun résultat</Text>
                </View>
              }
              showsVerticalScrollIndicator={false}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing[4],
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  },
  pickerButton: {
    backgroundColor: theme.colors.background.tertiary,
    paddingVertical: theme.spacing[3] + 2, // 14px
    paddingHorizontal: theme.spacing[4],
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pickerError: {
    borderColor: theme.colors.error.main,
  },
  pickerDisabled: {
    backgroundColor: theme.colors.gray[100],
    opacity: 0.6,
  },
  pickerText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.regular,
  },
  placeholderText: {
    color: theme.colors.text.disabled,
  },
  disabledText: {
    color: theme.colors.text.disabled,
  },
  errorText: {
    ...theme.typography.styles.caption,
    color: theme.colors.error.main,
    marginTop: theme.spacing[1],
    marginLeft: theme.spacing[1],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: theme.borderRadius['2xl'],
    borderTopRightRadius: theme.borderRadius['2xl'],
    maxHeight: '50%',
    paddingBottom: theme.spacing[5],
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.main,
  },
  modalTitle: {
    ...theme.typography.styles.h4,
  },
  closeButton: {
    padding: theme.spacing[1],
    minWidth: theme.components.touchTarget.minWidth,
    minHeight: theme.components.touchTarget.minHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    marginHorizontal: theme.spacing[5],
    marginTop: theme.spacing[4],
    marginBottom: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
    borderRadius: theme.borderRadius.md,
    minHeight: 44,
  },
  searchIcon: {
    marginRight: theme.spacing[2],
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    paddingVertical: theme.spacing[2],
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing[3] + 2, // 14px
    paddingHorizontal: theme.spacing[5],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    minHeight: theme.components.touchTarget.minHeight,
  },
  listItemSelected: {
    backgroundColor: theme.colors.primary[50],
  },
  listItemText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.regular,
  },
  listItemTextSelected: {
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary[700],
  },
  emptyContainer: {
    paddingVertical: theme.spacing[12],
    alignItems: 'center',
  },
  emptyText: {
    ...theme.typography.styles.body,
    color: theme.colors.text.disabled,
    marginTop: theme.spacing[3],
  },
});
