import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

export const getFavorites = async () => {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const addFavorite = async (vehicle) => {
  try {
    const favorites = await getFavorites();
    
    // Vérifier si déjà dans les favoris
    const exists = favorites.some(fav => 
      fav.brand === vehicle.brand && 
      fav.model === vehicle.model && 
      fav.year === vehicle.year
    );
    
    if (exists) {
      return false; // Déjà en favoris
    }
    
    const newFavorite = {
      id: Date.now().toString(),
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      plate: vehicle.plate || '',
      fuelType: vehicle.fuelType,
      gearboxType: vehicle.gearboxType,
      mileage: vehicle.mileage,
      pricing: vehicle.pricing,
      image: vehicle.pricing?.topListings?.[0]?.image || null,
      timestamp: Date.now(),
    };
    
    favorites.unshift(newFavorite);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
};

export const removeFavorite = async (vehicleId) => {
  try {
    const favorites = await getFavorites();
    const filtered = favorites.filter(fav => fav.id !== vehicleId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
};

export const isFavorite = async (vehicle) => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => 
      fav.brand === vehicle.brand && 
      fav.model === vehicle.model && 
      fav.year === vehicle.year
    );
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};
