import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('search_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const deleteItem = async (id) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    await AsyncStorage.setItem('search_history', JSON.stringify(updated));
  };

  const clearAll = async () => {
    setHistory([]);
    await AsyncStorage.removeItem('search_history');
  };

  const filteredHistory = history.filter(item =>
    item.brand.toLowerCase().includes(search.toLowerCase()) ||
    item.model.toLowerCase().includes(search.toLowerCase()) ||
    item.plate.toLowerCase().includes(search.toLowerCase())
  );

  const handleItemClick = (item) => {
    // Naviguer vers ResultsScreen avec les données du véhicule
    navigation.navigate('Results', { 
      data: {
        vehicle: {
          brand: item.brand,
          model: item.model,
          plate: item.plate,
          year: item.year,
          fuelType: item.fuelType,
          gearboxType: item.gearboxType,
          mileage: item.mileage,
        },
        pricing: item.pricing || {
          priceRange: { min: 0, median: 0, max: 0 },
          total: 0,
          totalFrance: 0,
          regions: {},
          topListings: []
        }
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleItemClick(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/80' }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.brand} {item.model}</Text>
        {item.plate && item.plate !== '' && !item.plate.includes('-') ? (
          <View style={styles.plate}>
            <View style={styles.plateLeft}>
              <Text style={styles.plateCountry}>F</Text>
            </View>
            <Text style={styles.plateText}>{item.plate}</Text>
            <View style={styles.plateRight} />
          </View>
        ) : (
          <Text style={styles.manualBadge}>Saisie manuelle</Text>
        )}
        <Text style={styles.date}>Il y a {item.timeAgo}</Text>
      </View>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => deleteItem(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historique</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher par plaque, modèle ou marque..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.countContainer}>
        <Text style={styles.count}>{history.length} véhicules</Text>
      </View>

      {filteredHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="car-outline" size={64} color="#CBD5E1" />
          <Text style={styles.emptyText}>Aucun véhicule dans l'historique</Text>
          <Text style={styles.emptySubtext}>
            Commencez par scanner une plaque depuis l'accueil
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredHistory}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#1E293B',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  count: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
  clearText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },
  list: {
    padding: 20,
    paddingTop: 0,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
  },
  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  plate: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  plateLeft: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'center',
  },
  plateCountry: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  plateText: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    letterSpacing: 2,
  },
  plateRight: {
    backgroundColor: '#2563EB',
    width: 8,
  },
  manualBadge: {
    fontSize: 13,
    color: '#64748B',
    fontStyle: 'italic',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#94A3B8',
  },
  actionButton: {
    padding: 8,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#475569',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
