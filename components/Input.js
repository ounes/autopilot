import React, { useState } from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

/**
 * Input Component — Design System compliant
 * Support: icon, label, error, disabled states
 */
export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  iconPosition = 'left',
  error,
  helperText,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'none',
  secureTextEntry = false,
  style,
  inputStyle,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyle = () => {
    const baseStyle = theme.components.input.base;
    let finalStyle = { ...baseStyle };

    if (isFocused) {
      finalStyle = { ...finalStyle, ...theme.components.input.focused };
    }
    if (error) {
      finalStyle = { ...finalStyle, ...theme.components.input.error };
    }
    if (disabled) {
      finalStyle = { ...finalStyle, ...theme.components.input.disabled };
    }

    return finalStyle;
  };

  const inputStyleObj = getInputStyle();

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: inputStyleObj.backgroundColor,
            borderRadius: inputStyleObj.borderRadius,
            borderWidth: inputStyleObj.borderWidth,
            borderColor: inputStyleObj.borderColor,
            minHeight: multiline ? undefined : inputStyleObj.minHeight,
          },
        ]}
      >
        {icon && iconPosition === 'left' && (
          <Ionicons
            name={icon}
            size={theme.components.icon.md}
            color={error ? theme.colors.error.main : theme.colors.text.tertiary}
            style={styles.iconLeft}
          />
        )}

        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          style={[
            styles.input,
            {
              color: inputStyleObj.color,
              fontSize: inputStyleObj.fontSize,
              paddingVertical: inputStyleObj.paddingVertical,
              paddingHorizontal: icon ? 0 : inputStyleObj.paddingHorizontal,
              minHeight: multiline ? 100 : undefined,
              textAlignVertical: multiline ? 'top' : 'center',
            },
            inputStyle,
          ]}
          {...props}
        />

        {icon && iconPosition === 'right' && (
          <Ionicons
            name={icon}
            size={theme.components.icon.md}
            color={error ? theme.colors.error.main : theme.colors.text.tertiary}
            style={styles.iconRight}
          />
        )}
      </View>

      {(error || helperText) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[4],
  },
  input: {
    flex: 1,
  },
  iconLeft: {
    marginRight: theme.spacing[2],
  },
  iconRight: {
    marginLeft: theme.spacing[2],
  },
  helperText: {
    ...theme.typography.styles.caption,
    marginTop: theme.spacing[1],
    marginLeft: theme.spacing[1],
  },
  errorText: {
    color: theme.colors.error.main,
  },
});
