import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSearchSettings, REGION_CODES, REGION_NAMES } from '../utils/settings';

export default function ResultsScreen({ route, navigation }) {
  const { data } = route.params;
  const { vehicle, pricing } = data;
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const searchSettings = await getSearchSettings();
    setSettings(searchSettings);
  };

  // Calculer la fourchette de reprise pro (décote -20% à -10%)
  const calculateRepriseRange = () => {
    const priceMin = pricing.priceRange.min;
    const priceMax = pricing.priceRange.max;
    
    // Décote professionnelle optimiste : -20% (min) à -10% (max)
    const repriseMin = Math.round(priceMin * 0.80);
    const repriseMax = Math.round(priceMax * 0.90);
    
    return { min: repriseMin, max: repriseMax };
  };

  const openVendezVotreVoiture = () => {
    // Lien vers vendezvotrevoiture.fr
    // Note: Leur formulaire ne supporte pas de pré-remplissage par URL
    // L'utilisateur devra saisir sa plaque sur leur site
    const url = 'https://www.vendezvotrevoiture.fr';
    Linking.openURL(url);
  };

  const openListing = (url) => {
    Linking.openURL(url);
  };

  // Construire l'URL Leboncoin avec les filtres
  const buildLeboncoinUrl = () => {
    if (!settings) return 'https://www.leboncoin.fr/recherche?category=2';
    
    const baseUrl = 'https://www.leboncoin.fr/recherche';
    const params = new URLSearchParams();
    
    // Catégorie voitures
    params.append('category', '2');
    
    // Région (codes numériques pour l'URL Leboncoin)
    const REGION_URL_CODES = {
      all: null,
      auvergne_rhone_alpes: 'r_30',
      bourgogne_franche_comte: 'r_31',
      bretagne: 'r_6',
      centre_val_de_loire: 'r_37',
      corse: 'r_9',
      grand_est: 'r_33',
      hauts_de_france: 'r_32',
      ile_de_france: 'r_12',
      normandie: 'r_34',
      nouvelle_aquitaine: 'r_35',
      occitanie: 'r_36',
      pays_de_la_loire: 'r_18',
      provence_alpes_cote_azur: 'r_21',
    };
    
    const regionUrlCode = REGION_URL_CODES[settings.region];
    if (regionUrlCode) {
      params.append('locations', regionUrlCode);
    }
    
    // Marque (paramètre dédié u_car_brand)
    if (vehicle.brand) {
      params.append('u_car_brand', vehicle.brand.toUpperCase());
    }
    
    // Modèle (sans préfixe marque si déjà présent)
    if (vehicle.brand && vehicle.model) {
      let modelFormatted = vehicle.model.toUpperCase();
      
      // Retirer le préfixe marque si présent (ex: "RENAULT_Clio" → "Clio")
      const brandPrefix = vehicle.brand.toUpperCase() + '_';
      if (modelFormatted.startsWith(brandPrefix)) {
        modelFormatted = modelFormatted.substring(brandPrefix.length);
      }
      
      // Remplacer uniquement les espaces par des underscores
      // Garder les tirets (-) et points (.) tels quels
      modelFormatted = modelFormatted.replace(/\s+/g, '_');
      
      // Format final : MARQUE_MODELE
      const fullModel = `${vehicle.brand.toUpperCase()}_${modelFormatted}`;
      params.append('u_car_model', fullModel);
    }
    
    // Année (format compact YYYY-YYYY) - utilise paramètres
    if (vehicle.year && vehicle.year !== '') {
      const yearMin = parseInt(vehicle.year) - settings.yearMargin;
      const yearMax = parseInt(vehicle.year) + settings.yearMargin;
      params.append('regdate', `${yearMin}-${yearMax}`);
    }
    
    // Kilométrage (format compact min-max) - utilise paramètres
    if (vehicle.mileage && vehicle.mileage !== '') {
      const mileageMin = Math.max(0, parseInt(vehicle.mileage) - settings.mileageMargin);
      const mileageMax = parseInt(vehicle.mileage) + settings.mileageMargin;
      params.append('mileage', `${mileageMin}-${mileageMax}`);
    }
    
    // Carburant (code numérique)
    if (vehicle.fuelType && vehicle.fuelType !== '') {
      const fuelMap = {
        'ESSENCE': '1',
        'DIESEL': '2',
        'GPL': '3',
        'ÉLECTRIQUE': '4',
        'HYBRIDE': '5',
        'AUTRE': '6'
      };
      const fuelCode = fuelMap[vehicle.fuelType.toUpperCase()];
      if (fuelCode) {
        params.append('fuel', fuelCode);
      }
    }
    
    // Boîte de vitesse (code numérique)
    if (vehicle.gearboxType && vehicle.gearboxType !== '') {
      const gearboxMap = {
        'MANUELLE': '1',
        'AUTOMATIQUE': '2',
        'SEMI-AUTOMATIQUE': '3'
      };
      const gearboxCode = gearboxMap[vehicle.gearboxType.toUpperCase()];
      if (gearboxCode) {
        params.append('gearbox', gearboxCode);
      }
    }
    
    return `${baseUrl}?${params.toString()}`;
  };

  const openLeboncoinFiltered = () => {
    const url = buildLeboncoinUrl();
    Linking.openURL(url);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (km) => {
    return new Intl.NumberFormat('fr-FR').format(km) + ' km';
  };

  const handleShare = async () => {
    try {
      const message = `${vehicle.brand} ${vehicle.model}${vehicle.year ? ` (${vehicle.year})` : ''}

📊 Prix Leboncoin (±2 ans, ±20k km):
• Moyenne basse: ${formatPrice(pricing.priceRange.min)}
• Prix médian: ${formatPrice(pricing.priceRange.median)}
• Moyenne haute: ${formatPrice(pricing.priceRange.max)}

${vehicle.mileage ? `🚗 Kilométrage: ${parseInt(vehicle.mileage).toLocaleString('fr-FR')} km\n` : ''}${vehicle.fuelType ? `⚡ Carburant: ${vehicle.fuelType}\n` : ''}${vehicle.gearboxType ? `⚙️  Boîte: ${vehicle.gearboxType}\n` : ''}
🔗 Voir sur Leboncoin: ${buildLeboncoinUrl()}`;

      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Partagé via:', result.activityType);
        } else {
          console.log('Partagé');
        }
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{vehicle.brand} {vehicle.model}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={24} color="#1E293B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Carte véhicule */}
      <View style={styles.vehicleCard}>
        {vehicle.plate && vehicle.plate !== '' ? (
          <View style={styles.plate}>
            <View style={styles.plateLeft}>
              <Text style={styles.plateCountry}>F</Text>
            </View>
            <Text style={styles.plateText}>{vehicle.plate}</Text>
            <View style={styles.plateRight} />
          </View>
        ) : (
          <View style={styles.plate}>
            <View style={styles.plateLeft}>
              <Text style={styles.plateCountry}>F</Text>
            </View>
            <Text style={[styles.plateText, styles.plateNotProvided]}>Non renseigné</Text>
            <View style={styles.plateRight} />
          </View>
        )}

        {vehicle.version && (
          <Text style={styles.vehicleVersion}>{vehicle.version}</Text>
        )}

        <View style={styles.specs}>
          {vehicle.year && (
            <View style={styles.spec}>
              <Ionicons name="calendar-outline" size={20} color="#64748B" />
              <Text style={styles.specText}>{vehicle.year}</Text>
            </View>
          )}
          {vehicle.fuelType && (
            <View style={styles.spec}>
              <Ionicons name="flash-outline" size={20} color="#64748B" />
              <Text style={styles.specText}>{vehicle.fuelType}</Text>
            </View>
          )}
          {vehicle.gearboxType && (
            <View style={styles.spec}>
              <Ionicons name="settings-outline" size={20} color="#64748B" />
              <Text style={styles.specText}>{vehicle.gearboxType}</Text>
            </View>
          )}
        </View>
        
        {vehicle.mileage && (
          <View style={[styles.spec, styles.mileageRow]}>
            <Ionicons name="speedometer-outline" size={20} color="#64748B" />
            <Text style={styles.specText}>{parseInt(vehicle.mileage).toLocaleString('fr-FR')} km</Text>
          </View>
        )}
      </View>

      {/* Estimation reprise professionnelle */}
      <View style={styles.repriseCard}>
        <View style={styles.repriseHeader}>
          <Ionicons name="briefcase" size={24} color="#2563EB" />
          <Text style={styles.repriseTitle}>Estimation reprise pro</Text>
        </View>
        
        <View style={styles.reprisePrice}>
          <Text style={styles.reprisePriceLabel}>Fourchette estimée :</Text>
          <Text style={styles.reprisePriceAmount}>
            {formatPrice(calculateRepriseRange().min)} - {formatPrice(calculateRepriseRange().max)}
          </Text>
        </View>

        <Text style={styles.repriseDisclaimer}>
          💡 Estimation basée sur les prix du marché actuel
        </Text>

        <View style={styles.repriseDivider} />

        <View style={styles.repriseFeatures}>
          <View style={styles.repriseFeature}>
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text style={styles.repriseFeatureText}>Offre ferme sous 24h</Text>
          </View>
          <View style={styles.repriseFeature}>
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text style={styles.repriseFeatureText}>Paiement immédiat</Text>
          </View>
          <View style={styles.repriseFeature}>
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text style={styles.repriseFeatureText}>+60 agences en France</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.repriseButton}
          onPress={openVendezVotreVoiture}
        >
          <Text style={styles.repriseButtonText}>Obtenir une offre ferme</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.reprisePartner}>
          Propulsé par <Text style={styles.reprisePartnerBold}>vendezvotrevoiture.fr</Text>
        </Text>
      </View>

      {/* Fourchette de prix */}
      <View style={styles.priceCard}>
        <Text style={styles.priceTitle}>💰 Prix Leboncoin</Text>
        <Text style={styles.priceSubtitle}>
          Prix moyens observés sur Leboncoin {settings && `(±${settings.yearMargin} ans, ±${(settings.mileageMargin / 1000).toFixed(0)} 000 km, ${REGION_NAMES[settings.region] || 'toute la France'})`}, hors annonces exceptionnelles.
        </Text>
        
        <View style={styles.priceColumns}>
          <View style={styles.priceColumn}>
            <Text style={[styles.priceAmount, styles.priceLeft]}>{formatPrice(pricing.priceRange.min)}</Text>
            <View style={styles.priceSeparator} />
            <Text style={[styles.priceLabel, styles.priceLeft]}>Moyenne basse</Text>
          </View>
          
          <View style={styles.priceColumn}>
            <Text style={[styles.priceAmount, styles.priceMedian]}>{formatPrice(pricing.priceRange.median)}</Text>
            <View style={styles.priceSeparator} />
            <Text style={[styles.priceLabel, styles.priceMedian]}>Prix médian</Text>
          </View>
          
          <View style={styles.priceColumn}>
            <Text style={[styles.priceAmount, styles.priceRight]}>{formatPrice(pricing.priceRange.max)}</Text>
            <View style={styles.priceSeparator} />
            <Text style={[styles.priceLabel, styles.priceRight]}>Moyenne haute</Text>
          </View>
        </View>
      </View>

      {/* Bouton Leboncoin */}
      <TouchableOpacity 
        style={styles.leboncoinButton}
        onPress={openLeboncoinFiltered}
      >
        <Ionicons name="search" size={20} color="#fff" />
        <Text style={styles.leboncoinText}>
          Voir sur Leboncoin
        </Text>
      </TouchableOpacity>

      {/* Top 10 annonces */}
      <View style={styles.listingsCard}>
        <Text style={styles.sectionTitle}>🔗 Top 10 annonces similaires</Text>
        
        {pricing.topListings.map((listing, index) => (
          <TouchableOpacity
            key={listing.id}
            style={styles.listing}
            onPress={() => openListing(listing.url)}
          >
            <Image source={{ uri: listing.image }} style={styles.listingImage} />
            
            <View style={styles.listingInfo}>
              <Text style={styles.listingTitle}>{listing.title}</Text>
              <Text style={styles.listingDetails}>
                {listing.year} • {formatMileage(listing.mileage)}
              </Text>
              <Text style={styles.listingLocation}>{listing.location}</Text>
            </View>
            
            <View style={styles.listingRight}>
              <Text style={styles.listingPrice}>{formatPrice(listing.price)}</Text>
              <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="#EF4444" />
          <Text style={styles.favoriteText}>Ajouter aux favoris</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  vehicleCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  plate: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    marginBottom: 20,
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
  plateNotProvided: {
    fontStyle: 'italic',
    color: '#94A3B8',
    letterSpacing: 0,
  },
  plateRight: {
    backgroundColor: '#2563EB',
    width: 12,
  },
  vehicleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  vehicleVersion: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 16,
  },
  specs: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mileageRow: {
    width: '100%',
    marginTop: 8,
    justifyContent: 'center',
  },
  specText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  repriseCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  repriseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  repriseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  reprisePrice: {
    backgroundColor: '#EFF6FF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#BFDBFE',
  },
  reprisePriceLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  reprisePriceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  repriseDisclaimer: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
    marginBottom: 20,
    lineHeight: 18,
  },
  repriseDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 20,
  },
  repriseFeatures: {
    gap: 12,
    marginBottom: 24,
  },
  repriseFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  repriseFeatureText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  repriseButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  repriseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  reprisePartner: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  reprisePartnerBold: {
    fontWeight: '600',
    color: '#64748B',
  },
  priceCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  priceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  priceSubtitle: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 32,
  },
  priceColumns: {
    flexDirection: 'row',
    gap: 20,
  },
  priceColumn: {
    flex: 1,
  },
  priceAmount: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  priceMedian: {
    color: '#2563EB',
    textAlign: 'center',
  },
  priceLeft: {
    textAlign: 'left',
  },
  priceRight: {
    textAlign: 'right',
  },
  priceSeparator: {
    width: '100%',
    height: 2,
    backgroundColor: '#E2E8F0',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },
  leboncoinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6E14',
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leboncoinText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  listingsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  listing: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  listingImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  listingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  listingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  listingDetails: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  listingLocation: {
    fontSize: 12,
    color: '#94A3B8',
  },
  listingRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  listingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 8,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#EF4444',
    gap: 12,
  },
  favoriteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});
