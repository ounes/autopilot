import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import PickerV2 from '../components/PickerV2';
import { searchVehicleManual } from '../services/api';
import theme from '../theme';
import {
  VEHICLE_BRANDS,
  VEHICLE_MODELS,
  FUEL_TYPES,
  GEARBOX_TYPES,
  YEARS,
} from '../data/vehicleData';

export default function ManualSearchScreen({ route }) {
  const { vehicleData } = route.params || {};
  
  const [loading, setLoading] = useState(false);
  const [manualData, setManualData] = useState({
    brand: vehicleData?.brand || '',
    model: vehicleData?.model || '',
    year: vehicleData?.year || '',
    plate: vehicleData?.plate || '',
    mileage: vehicleData?.mileage || '',
    fuelType: vehicleData?.fuelType || '',
    gearboxType: vehicleData?.gearboxType || '',
  });
  
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!manualData.brand || !manualData.model || !manualData.year) {
      Alert.alert('Erreur', 'Veuillez renseigner au moins la marque, le modèle et l\'année.');
      return;
    }

    setLoading(true);
    try {
      const result = await searchVehicleManual({
        brand: manualData.brand,
        model: manualData.model,
        year: manualData.year,
        mileage: manualData.mileage,
        fuelType: manualData.fuelType,
        gearboxType: manualData.gearboxType,
      });

      // Ajouter la plaque aux données résultat
      result.vehicle.plate = manualData.plate;

      navigation.navigate('Results', { data: result });
    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les modèles disponibles pour la marque sélectionnée
  const availableModels = manualData.brand && VEHICLE_MODELS[manualData.brand]
    ? VEHICLE_MODELS[manualData.brand]
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Renseigner les informations</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
        {manualData.plate && (
          <Card variant="base" elevation="sm" style={styles.plateCard}>
            <View style={styles.plate}>
              <View style={styles.plateLeft}>
                <Text style={styles.plateCountry}>F</Text>
              </View>
              <Text style={styles.plateText}>{manualData.plate}</Text>
              <View style={styles.plateRight} />
            </View>
          </Card>
        )}

        {vehicleData && (
          <Card variant="base" elevation="sm" style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle" size={24} color="#2563EB" />
              <Text style={styles.infoTitle}>Vérifiez et complétez</Text>
            </View>
            <Text style={styles.infoText}>
              Les informations ont été récupérées automatiquement. Vous pouvez les modifier avant de continuer.
            </Text>
          </Card>
        )}

        <Card variant="base" elevation="md" style={styles.formCard}>
          <PickerV2
            label="Marque *"
            value={manualData.brand}
            items={VEHICLE_BRANDS}
            onValueChange={(value) => setManualData({ ...manualData, brand: value, model: '' })}
            placeholder="Sélectionner une marque"
          />

          <PickerV2
            label="Modèle *"
            value={manualData.model}
            items={availableModels}
            onValueChange={(value) => setManualData({ ...manualData, model: value })}
            placeholder="Sélectionner un modèle"
            disabled={!manualData.brand}
          />

          <PickerV2
            label="Année *"
            value={manualData.year}
            items={YEARS}
            onValueChange={(value) => setManualData({ ...manualData, year: value })}
            placeholder="Sélectionner une année"
          />

          <Input
            label="Kilométrage (optionnel)"
            value={manualData.mileage}
            onChangeText={(text) => setManualData({ ...manualData, mileage: text })}
            placeholder="Ex: 85000"
            keyboardType="numeric"
            icon="speedometer-outline"
            iconPosition="left"
          />

          <PickerV2
            label="Carburant (optionnel)"
            value={manualData.fuelType}
            items={FUEL_TYPES}
            onValueChange={(value) => setManualData({ ...manualData, fuelType: value })}
            placeholder="Sélectionner un carburant"
          />

          <PickerV2
            label="Boîte de vitesse (optionnel)"
            value={manualData.gearboxType}
            items={GEARBOX_TYPES}
            onValueChange={(value) => setManualData({ ...manualData, gearboxType: value })}
            placeholder="Sélectionner une boîte"
          />

          <Button
            variant="primary"
            size="large"
            icon="search"
            onPress={handleSearch}
            loading={loading}
            disabled={loading || !manualData.brand || !manualData.model || !manualData.year}
            fullWidth
          >
            {loading ? 'Recherche en cours...' : vehicleData ? 'Confirmer et voir les résultats' : 'Rechercher'}
          </Button>
        </Card>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  flex1: {
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
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing[5],
    paddingBottom: 100,
  },
  plateCard: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  plate: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  plateLeft: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  plateCountry: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  plateText: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    letterSpacing: 3,
  },
  plateRight: {
    backgroundColor: '#2563EB',
    width: 12,
  },
  infoCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  infoText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  formCard: {
    padding: theme.spacing[5],
  },
});
