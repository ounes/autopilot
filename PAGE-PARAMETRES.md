# ✅ Page Paramètres + Saut ligne kilométrage

## 📋 Corrections appliquées

### **1. Saut de ligne kilométrage** ✅

**Avant :**
```
📅 2012   ⚡ Diesel   ⚙️ Manuelle   🚗 85 000 km
```
❌ Tout sur une ligne (peut déborder sur petits écrans)

**Après :**
```
📅 2012   ⚡ Diesel   ⚙️ Manuelle
🚗 85 000 km
```
✅ Kilométrage sur ligne séparée

**Code :**
```javascript
<View style={styles.specs}>
  {/* year, fuel, gearbox */}
</View>

{vehicle.mileage && (
  <View style={[styles.spec, styles.mileageRow]}>
    <Ionicons name="speedometer-outline" />
    <Text>{parseInt(vehicle.mileage).toLocaleString('fr-FR')} km</Text>
  </View>
)}
```

**Style :**
```javascript
mileageRow: {
  width: '100%',
  marginTop: 8,
}
```

---

### **2. Page Paramètres** ✅

**Nouveau tab "Paramètres"** dans la bottom navigation :
- Icône : engrenage (settings-outline)
- Position : Entre "Historique" et "Profil"

**Écran complet avec 3 sections** :

#### **Section 1 : Localisation** 🗺️
- Picker avec 14 régions françaises + "Toute la France"
- Stocké dans `AsyncStorage` : `search_region`
- Impact : Ajoute paramètre `region` dans URL Leboncoin

**Régions disponibles** :
- Toute la France (all)
- Auvergne-Rhône-Alpes
- Bourgogne-Franche-Comté
- Bretagne
- Centre-Val de Loire
- Corse
- Grand Est
- Hauts-de-France
- Île-de-France
- Normandie
- Nouvelle-Aquitaine
- Occitanie
- Pays de la Loire
- Provence-Alpes-Côte d'Azur

#### **Section 2 : Marge kilométrage** 🚗
- Picker avec 5 choix : ±10k, ±15k, ±20k (défaut), ±30k, ±50k km
- Stocké dans `AsyncStorage` : `search_mileage_margin`
- Impact : Modifie fourchette kilométrage dans recherche backend + URL Leboncoin

#### **Section 3 : Marge année** 📅
- Picker avec 4 choix : ±1, ±2 (défaut), ±3, ±5 ans
- Stocké dans `AsyncStorage` : `search_year_margin`
- Impact : Modifie fourchette année dans recherche backend + URL Leboncoin

**Encart info** :
```
ℹ️ Ces paramètres influencent les statistiques de prix 
   et la génération du lien Leboncoin.
```

---

### **3. Intégration paramètres dans recherche** ✅

#### **Frontend** (`services/api.js`)
```javascript
import { getSearchSettings } from '../utils/settings';

export const searchVehicleManual = async (data) => {
  const settings = await getSearchSettings();
  const response = await axios.post(`${API_BASE}/search/manual`, { 
    ...data, 
    settings  // ← Envoi paramètres au backend
  });
};
```

#### **Backend** (`server.js`)
```javascript
app.post('/api/search/manual', async (req, res) => {
  const { brand, model, year, mileage, fuelType, gearboxType, settings } = req.body;
  
  const leboncoinData = await searchLeboncoinPython(vehicle, settings);
});

async function searchLeboncoinPython(vehicle, settings = {}) {
  const yearMargin = settings.yearMargin || 2;
  const mileageMargin = settings.mileageMargin || 20000;
  const region = settings.region || 'all';
  
  // Ajoute --year-margin, --mileage-margin, --region à la commande Python
}
```

#### **ResultsScreen** (`ResultsScreen.js`)
```javascript
// Charge paramètres au montage
const [settings, setSettings] = useState(null);

useEffect(() => {
  loadSettings();
}, []);

const loadSettings = async () => {
  const searchSettings = await getSearchSettings();
  setSettings(searchSettings);
};

// Utilise paramètres dans URL Leboncoin
const buildLeboncoinUrl = () => {
  if (!settings) return 'https://www.leboncoin.fr/recherche?category=2';
  
  // Région
  const regionCode = REGION_CODES[settings.region];
  if (regionCode) {
    params.append('region', regionCode);
  }
  
  // Année (dynamique)
  const yearMin = parseInt(vehicle.year) - settings.yearMargin;
  const yearMax = parseInt(vehicle.year) + settings.yearMargin;
  
  // Kilométrage (dynamique)
  const mileageMin = Math.max(0, parseInt(vehicle.mileage) - settings.mileageMargin);
  const mileageMax = parseInt(vehicle.mileage) + settings.mileageMargin;
};

// Affiche marges dans description
<Text style={styles.priceSubtitle}>
  Prix moyens observés sur Leboncoin (±{settings.yearMargin} ans, 
  ±{(settings.mileageMargin / 1000).toFixed(0)} 000 km), 
  hors annonces exceptionnelles.
</Text>
```

---

### **4. Helpers utilitaires** ✅

**Fichier** : `utils/settings.js`

**Fonctions** :
```javascript
// Récupérer paramètres avec valeurs par défaut
export const getSearchSettings = async () => {
  const region = await AsyncStorage.getItem('search_region');
  const mileageMargin = await AsyncStorage.getItem('search_mileage_margin');
  const yearMargin = await AsyncStorage.getItem('search_year_margin');

  return {
    region: region || 'all',
    mileageMargin: mileageMargin ? parseInt(mileageMargin) : 20000,
    yearMargin: yearMargin ? parseInt(yearMargin) : 2,
  };
};

// Mapping régions vers codes Leboncoin
export const REGION_CODES = {
  all: null,
  auvergne_rhone_alpes: '1',
  // ... 14 régions
};
```

---

### **5. Historique enrichi** ✅

**Données supplémentaires stockées** :
```javascript
const newItem = {
  id: Date.now().toString(),
  plate: result.vehicle.plate || '',  // ← Vide si saisie manuelle
  brand: result.vehicle.brand,
  model: result.vehicle.model,
  year: result.vehicle.year,
  fuelType: result.vehicle.fuelType,      // ← Nouveau
  gearboxType: result.vehicle.gearboxType, // ← Nouveau
  mileage: result.vehicle.mileage,         // ← Nouveau
  pricing: result.pricing,                 // ← Nouveau (stats complètes)
  timestamp: Date.now(),
  timeAgo: 'quelques secondes',
};
```

**Permet** :
- Navigation depuis historique vers ResultsScreen avec données complètes
- Affichage correct des specs dans historique
- Réutilisation des stats sans refaire la recherche

---

## 🧪 Test des corrections

### **Recharge Expo Go** (secoue → Reload)

**Puis vérifie :**

#### **1. Kilométrage sur ligne séparée**
- [ ] Fais une recherche
- [ ] Page résultats : Kilométrage affiché seul sur 2e ligne

#### **2. Page Paramètres**
- [ ] Clique sur tab "Paramètres" (icône engrenage)
- [ ] Vérifie 3 sections : Localisation / Marge km / Marge année
- [ ] Change région (ex: Île-de-France)
- [ ] Change marge km (ex: ±30 000 km)
- [ ] Change marge année (ex: ±3 ans)

#### **3. Paramètres appliqués à la recherche**
- [ ] Retourne sur "Accueil"
- [ ] Fais une recherche manuelle (Peugeot 308, 2012, 85000 km)
- [ ] Page résultats : Description affiche `(±3 ans, ±30 000 km)`
- [ ] Clique bouton Leboncoin
- [ ] Vérifie URL contient :
  - `region=8` (Île-de-France)
  - `regdate=2009-2015` (±3 ans)
  - `mileage=55000-115000` (±30k km)

#### **4. Historique complet**
- [ ] Va dans "Historique"
- [ ] Clique sur dernière recherche
- [ ] Page résultats s'ouvre avec données complètes
- [ ] Vérifie année/carburant/boîte/km affichés

---

## 📁 Fichiers créés/modifiés

### **Nouveaux fichiers** :
- `screens/SettingsScreen.js` (6.8 KB) — Page paramètres
- `utils/settings.js` (1.3 KB) — Helpers récupération paramètres

### **Fichiers modifiés** :
- `App.js` — Ajout tab "Paramètres"
- `screens/ResultsScreen.js` — Kilométrage ligne séparée + paramètres dynamiques
- `services/api.js` — Envoi paramètres au backend + historique enrichi
- `backend/server.js` — Accepte paramètres de recherche

---

## 🎯 Impact des paramètres

**Changement de paramètres** :
- ✅ Modifie les stats de prix (backend Python)
- ✅ Modifie l'URL Leboncoin (filtres région/année/km)
- ✅ Affiche dans description ("±X ans, ±Y km")

**Valeurs par défaut** (si paramètres pas configurés) :
- Région : Toute la France
- Marge km : ±20 000 km
- Marge année : ±2 ans

---

**Recharge et teste ! La page Paramètres est fonctionnelle !** 🚀📱
