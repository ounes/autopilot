import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PickerV2 from '../components/PickerV2';
import Button from '../components/Button';
import theme from '../theme';

const REGIONS = [
  { label: 'Toute la France', value: 'all' },
  { label: 'Auvergne-Rhône-Alpes', value: 'auvergne_rhone_alpes' },
  { label: 'Bourgogne-Franche-Comté', value: 'bourgogne_franche_comte' },
  { label: 'Bretagne', value: 'bretagne' },
  { label: 'Centre-Val de Loire', value: 'centre_val_de_loire' },
  { label: 'Corse', value: 'corse' },
  { label: 'Grand Est', value: 'grand_est' },
  { label: 'Hauts-de-France', value: 'hauts_de_france' },
  { label: 'Île-de-France', value: 'ile_de_france' },
  { label: 'Normandie', value: 'normandie' },
  { label: 'Nouvelle-Aquitaine', value: 'nouvelle_aquitaine' },
  { label: 'Occitanie', value: 'occitanie' },
  { label: "Pays de la Loire", value: 'pays_de_la_loire' },
  { label: "Provence-Alpes-Côte d'Azur", value: 'provence_alpes_cote_azur' },
];

const MILEAGE_MARGINS = [
  { label: '± 10 000 km', value: '10000' },
  { label: '± 15 000 km', value: '15000' },
  { label: '± 20 000 km', value: '20000' },
  { label: '± 30 000 km', value: '30000' },
  { label: '± 50 000 km', value: '50000' },
];

const YEAR_MARGINS = [
  { label: '± 1 an', value: '1' },
  { label: '± 2 ans', value: '2' },
  { label: '± 3 ans', value: '3' },
  { label: '± 5 ans', value: '5' },
];

export default function SettingsScreen() {
  const [region, setRegion] = useState('all');
  const [mileageMargin, setMileageMargin] = useState('20000');
  const [yearMargin, setYearMargin] = useState('2');
  const navigation = useNavigation();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedRegion = await AsyncStorage.getItem('search_region');
      const storedMileage = await AsyncStorage.getItem('search_mileage_margin');
      const storedYear = await AsyncStorage.getItem('search_year_margin');

      if (storedRegion) setRegion(storedRegion);
      if (storedMileage) setMileageMargin(storedMileage);
      if (storedYear) setYearMargin(storedYear);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };

  const handleRegionChange = (value) => {
    setRegion(value);
    saveSetting('search_region', value);
  };

  const handleMileageChange = (value) => {
    setMileageMargin(value);
    saveSetting('search_mileage_margin', value);
  };

  const handleYearChange = (value) => {
    setYearMargin(value);
    saveSetting('search_year_margin', value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres de recherche</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerSubtitle}>
          Configurez vos préférences de recherche
        </Text>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={24} color="#2563EB" />
          <Text style={styles.infoText}>
            Ces paramètres influencent les statistiques de prix et la génération du lien Leboncoin.
          </Text>
        </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="location-outline" size={24} color="#64748B" />
          <Text style={styles.sectionTitle}>Localisation</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Zone géographique pour les recherches d'annonces
        </Text>
        <PickerV2
          label="Région"
          value={region}
          items={REGIONS}
          onValueChange={handleRegionChange}
          placeholder="Sélectionner une région"
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="speedometer-outline" size={24} color="#64748B" />
          <Text style={styles.sectionTitle}>Marge kilométrage</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Tolérance sur le kilométrage pour les comparaisons de prix
        </Text>
        <PickerV2
          label="Marge kilométrage"
          value={mileageMargin}
          items={MILEAGE_MARGINS}
          onValueChange={handleMileageChange}
          placeholder="Sélectionner une marge"
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="calendar-outline" size={24} color="#64748B" />
          <Text style={styles.sectionTitle}>Marge année</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Tolérance sur l'année de mise en circulation pour les comparaisons
        </Text>
        <PickerV2
          label="Marge année"
          value={yearMargin}
          items={YEAR_MARGINS}
          onValueChange={handleYearChange}
          placeholder="Sélectionner une marge"
        />
      </View>

      <View style={styles.saveButtonContainer}>
        <Button
          variant="primary"
          size="large"
          icon="checkmark"
          onPress={() => navigation.goBack()}
          fullWidth
        >
          Enregistrer
        </Button>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: theme.spacing[5],
    paddingBottom: theme.spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: theme.colors.background.tertiary,
    marginRight: theme.spacing[3],
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[4],
    backgroundColor: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    padding: theme.spacing[5],
    marginTop: theme.spacing[4],
    marginHorizontal: theme.spacing[4],
    borderRadius: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: theme.spacing[2],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: theme.spacing[4],
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: theme.spacing[4],
    marginHorizontal: theme.spacing[4],
    marginTop: theme.spacing[3],
    marginBottom: theme.spacing[4],
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#1E40AF',
    flex: 1,
    lineHeight: 20,
  },
  saveButtonContainer: {
    padding: theme.spacing[5],
    paddingBottom: theme.spacing[6],
  },
});
