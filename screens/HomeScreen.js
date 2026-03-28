import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';
import Card from '../components/Card';
import { searchVehicleByPlate } from '../services/api';
import theme from '../theme';

export default function HomeScreen() {
  const [plate, setPlate] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation();

  const handleScan = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Nous avons besoin de la caméra pour scanner la plaque');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setLoading(true);
      try {
        Alert.alert('Scan', 'OCR non encore implémenté. Utilisez la saisie manuelle.');
      } catch (error) {
        Alert.alert('Erreur', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = async () => {
    if (!plate.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir une plaque d\'immatriculation');
      return;
    }

    setLoading(true);
    try {
      const result = await searchVehicleByPlate(plate);
      
      // Rediriger vers ManualSearchScreen avec les données pré-remplies
      navigation.navigate('ManualSearch', {
        vehicleData: {
          brand: result.vehicle.brand,
          model: result.vehicle.model,
          year: result.vehicle.year,
          plate: plate,
          mileage: result.vehicle.mileage || '',
          fuelType: result.vehicle.fuelType || '',
          gearboxType: result.vehicle.gearboxType || '',
        }
      });
    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de formatage automatique de la plaque AA-123-AA
  const formatPlate = (text) => {
    // Supprimer tout sauf lettres et chiffres
    const cleaned = text.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Formater selon AA-123-AA
    let formatted = '';
    if (cleaned.length > 0) {
      formatted += cleaned.substring(0, 2); // AA
    }
    if (cleaned.length > 2) {
      formatted += '-' + cleaned.substring(2, 5); // 123
    }
    if (cleaned.length > 5) {
      formatted += '-' + cleaned.substring(5, 7); // AA
    }
    
    return formatted;
  };

  const handlePlateChange = (text) => {
    const formatted = formatPlate(text);
    setPlate(formatted);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <Ionicons name="car-sport" size={64} color="#fff" />
            <Text style={styles.title}>AutoPilot</Text>
          </View>

          <Text style={styles.subtitle}>
            Évaluez le prix de votre voiture rapidement
          </Text>

          <Card variant="base" elevation="lg" style={styles.mainCard}>
            <Button
              variant="primary"
              size="large"
              icon="camera"
              onPress={handleScan}
              fullWidth
            >
              Scanner une plaque
            </Button>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.inputRow}>
              <Ionicons name="car-outline" size={24} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="AA-123-AA"
                placeholderTextColor="#94A3B8"
                value={plate}
                onChangeText={handlePlateChange}
                autoCapitalize="characters"
                maxLength={10}
              />
            </View>

            <Button
              variant="secondary"
              size="large"
              icon="search"
              onPress={handleSearch}
              loading={loading}
              disabled={loading || !plate.trim()}
              fullWidth
            >
              {loading ? 'Recherche...' : 'Rechercher'}
            </Button>
          </Card>

          <TouchableOpacity
            style={styles.manualButton}
            onPress={() => navigation.navigate('ManualSearch')}
          >
            <Ionicons name="create-outline" size={20} color="#2563EB" />
            <Text style={styles.manualButtonText}>Saisie manuelle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },
  content: {
    flex: 1,
    padding: theme.spacing[5],
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: theme.spacing[3],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    textAlign: 'center',
    marginBottom: theme.spacing[6],
    paddingHorizontal: theme.spacing[4],
    lineHeight: 24,
  },
  mainCard: {
    padding: theme.spacing[5],
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing[4],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.light,
  },
  dividerText: {
    marginHorizontal: theme.spacing[3],
    color: theme.colors.text.secondary,
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: 12,
    paddingHorizontal: theme.spacing[4],
    marginBottom: theme.spacing[4],
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputIcon: {
    marginRight: theme.spacing[3],
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    letterSpacing: 2,
  },
  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
    borderRadius: 12,
    marginTop: theme.spacing[4],
    gap: 8,
  },
  manualButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#60A5FA',
  },
});
