import AsyncStorage from '@react-native-async-storage/async-storage';

// Valeurs par défaut
const DEFAULT_SETTINGS = {
  region: 'all',
  mileageMargin: 10000,  // Réduit de 20k à 10k pour des résultats plus centrés
  yearMargin: 2,
};

// Récupérer les paramètres de recherche
export const getSearchSettings = async () => {
  try {
    const region = await AsyncStorage.getItem('search_region');
    const mileageMargin = await AsyncStorage.getItem('search_mileage_margin');
    const yearMargin = await AsyncStorage.getItem('search_year_margin');

    return {
      region: region || DEFAULT_SETTINGS.region,
      mileageMargin: mileageMargin ? parseInt(mileageMargin) : DEFAULT_SETTINGS.mileageMargin,
      yearMargin: yearMargin ? parseInt(yearMargin) : DEFAULT_SETTINGS.yearMargin,
    };
  } catch (error) {
    console.error('Error loading search settings:', error);
    return DEFAULT_SETTINGS;
  }
};

// Mapping régions vers noms standardisés (compatibles backend + lbc)
export const REGION_CODES = {
  all: null,
  auvergne_rhone_alpes: 'auvergne_rhone_alpes',
  bourgogne_franche_comte: 'bourgogne_franche_comte',
  bretagne: 'bretagne',
  centre_val_de_loire: 'centre_val_de_loire',
  corse: 'corse',
  grand_est: 'grand_est',
  hauts_de_france: 'hauts_de_france',
  ile_de_france: 'ile_de_france',
  normandie: 'normandie',
  nouvelle_aquitaine: 'nouvelle_aquitaine',
  occitanie: 'occitanie',
  pays_de_la_loire: 'pays_de_la_loire',
  provence_alpes_cote_azur: 'provence_alpes_cote_azur',
};

// Noms lisibles des régions pour affichage
export const REGION_NAMES = {
  all: 'toute la France',
  auvergne_rhone_alpes: 'Auvergne-Rhône-Alpes',
  bourgogne_franche_comte: 'Bourgogne-Franche-Comté',
  bretagne: 'Bretagne',
  centre_val_de_loire: 'Centre-Val de Loire',
  corse: 'Corse',
  grand_est: 'Grand Est',
  hauts_de_france: 'Hauts-de-France',
  ile_de_france: 'Île-de-France',
  normandie: 'Normandie',
  nouvelle_aquitaine: 'Nouvelle-Aquitaine',
  occitanie: 'Occitanie',
  pays_de_la_loire: 'Pays de la Loire',
  provence_alpes_cote_azur: 'Provence-Alpes-Côte d\'Azur',
};
