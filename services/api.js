import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSearchSettings } from '../utils/settings';

// Backend réel - remplacer par l'IP du Mac si test sur mobile
const API_BASE = 'http://192.168.1.13:3001/api';

// Configuration axios avec timeout plus long
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000, // 30 secondes (recherche Leboncoin peut être longue)
});

export const searchVehicleByPlate = async (plate) => {
  try {
    const settings = await getSearchSettings();
    const response = await axiosInstance.post('/search/plate', { plate, settings });
    const result = response.data;

    // Sauvegarder dans l'historique
    await saveToHistory(result);

    return result;
  } catch (error) {
    console.error('Error searching vehicle:', error);
    if (error.code === 'ECONNABORTED') {
      throw new Error('La recherche a pris trop de temps. Réessayez.');
    }
    throw new Error('Impossible de trouver le véhicule. Vérifiez la plaque.');
  }
};

export const searchVehicleManual = async (data) => {
  try {
    const settings = await getSearchSettings();
    const response = await axiosInstance.post('/search/manual', { ...data, settings });
    const result = response.data;

    // Sauvegarder dans l'historique
    await saveToHistory(result);

    return result;
  } catch (error) {
    console.error('Error searching vehicle:', error);
    if (error.code === 'ECONNABORTED') {
      throw new Error('La recherche a pris trop de temps. Réessayez.');
    }
    throw new Error('Impossible de trouver le véhicule.');
  }
};

const saveToHistory = async (result) => {
  try {
    const stored = await AsyncStorage.getItem('search_history');
    const history = stored ? JSON.parse(stored) : [];

    const newItem = {
      id: Date.now().toString(),
      plate: result.vehicle.plate || '',
      brand: result.vehicle.brand,
      model: result.vehicle.model,
      year: result.vehicle.year,
      fuelType: result.vehicle.fuelType,
      gearboxType: result.vehicle.gearboxType,
      mileage: result.vehicle.mileage,
      image: result.pricing.topListings[0]?.image,
      pricing: result.pricing,  // Stocker pricing complet
      timestamp: Date.now(),
      timeAgo: 'quelques secondes',
    };

    history.unshift(newItem);

    // Limiter à 100 entrées
    if (history.length > 100) {
      history.pop();
    }

    await AsyncStorage.setItem('search_history', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
};

export default {
  searchVehicleByPlate,
  searchVehicleManual,
};
