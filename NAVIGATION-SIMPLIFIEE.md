# ✅ Navigation simplifiée + Clavier standard

## Changements appliqués

### **1. Page ManualSearchScreen créée** ✅

**Avant** :
```
HomeScreen (toggle manualMode)
├── Mode scan (default)
└── Mode formulaire (animation slide)
```
❌ Animation slide peu fluide (2 vues dans le même screen)
❌ Code complexe (toggle states + animations)

**Après** :
```
HomeScreen (simple)
├── Scanner
├── Recherche plaque
└── Bouton "Saisie manuelle" → ManualSearchScreen

ManualSearchScreen (page séparée)
├── Header avec retour
└── Formulaire complet
```
✅ Navigation Stack native (fluide)
✅ Code simplifié (2 écrans distincts)
✅ Transition iOS/Android standard

**Navigation** :
```javascript
// HomeScreen
<TouchableOpacity onPress={() => navigation.navigate('ManualSearch')}>
  <Text>Saisie manuelle</Text>
</TouchableOpacity>

// ManualSearchScreen
<TouchableOpacity onPress={() => navigation.goBack()}>
  <Ionicons name="arrow-back" />
</TouchableOpacity>
```

---

### **2. HomeScreen simplifié** ✅

**Supprimé** :
- ❌ `manualMode` state
- ❌ `manualData` state
- ❌ `slideAnim` ref
- ❌ `handleManualSearch()` fonction
- ❌ `availableModels` calcul
- ❌ Toute la logique formulaire
- ❌ Animated.View + animations slide
- ❌ KeyboardAvoidingView + ScrollView

**Conservé** :
- ✅ Scanner caméra (ImagePicker)
- ✅ Input plaque (avec formatage AA-123-AA)
- ✅ Recherche par plaque
- ✅ Bouton "Saisie manuelle" (navigation)

**Résultat** :
```
6706 octets (vs ~20 KB avant)
~170 lignes (vs ~500 avant)
```
✅ Code 3× plus court et lisible

---

### **3. ManualSearchScreen (nouveau)** ✅

**Contenu** :
- Header avec bouton retour aligné
- Titre : "Renseigner les informations"
- Formulaire complet (6 champs) :
  - Marque * (picker)
  - Modèle * (picker dynamique)
  - Année * (picker)
  - Kilométrage (input)
  - Carburant (picker)
  - Boîte vitesse (picker)
- Bouton "Rechercher" (validation)

**Logique** :
```javascript
const handleManualSearch = async () => {
  if (!manualData.brand || !manualData.model || !manualData.year) {
    Alert.alert('Erreur', 'Veuillez renseigner au moins la marque, le modèle et l\'année.');
    return;
  }

  const result = await searchVehicleManual(manualData);
  navigation.navigate('Results', { data: result });
};
```

**Style** :
- Header iOS/Android compliant (60px top)
- Card elevation "md"
- Padding 100px bottom (bottom nav)
- KeyboardAvoidingView (iOS/Android)

**Fichier** : `screens/ManualSearchScreen.js` (5.5 KB)

---

### **4. Clavier standard (pas de "search")** ✅

**Problème** :
```javascript
<Input
  returnKeyType="search"  // ← Bouton "Rechercher" (capture screenshot)
  onSubmitEditing={handleManualSearch}
/>
```
❌ Clavier avec bouton bleu "search" (non souhaité)

**Solution** :
```javascript
<Input
  label="Kilométrage (optionnel)"
  keyboardType="numeric"
  // ← PAS de returnKeyType
  // ← PAS de onSubmitEditing
/>
```
✅ Clavier standard AZERTY (comme capture)

**Validation** :
- Utilisateur remplit tous les champs
- Clique bouton "Rechercher" en bas de page (pas via clavier)

---

### **5. App.js mis à jour** ✅

**Stack Navigator** :
```javascript
<Stack.Navigator>
  <Stack.Screen name="Tabs" component={TabNavigator} />
  <Stack.Screen name="Results" component={ResultsScreen} />
  <Stack.Screen name="ManualSearch" component={ManualSearchScreen} />  // ← Nouveau
  <Stack.Screen name="Settings" component={SettingsScreen} />
</Stack.Navigator>
```

**Import** :
```javascript
import ManualSearchScreen from './screens/ManualSearchScreen';
```

---

## Architecture finale

```
App.js
├── TabNavigator (3 tabs)
│   ├── Accueil (HomeScreen)
│   ├── Historique (HistoryScreen)
│   └── Profil (ProfileScreen)
│
└── Stack Navigator
    ├── Results (ResultsScreen)
    ├── ManualSearch (ManualSearchScreen) ← Nouveau
    └── Settings (SettingsScreen)
```

**Flux utilisateur** :
```
Accueil
  ↓ Clic "Saisie manuelle"
ManualSearchScreen
  ↓ Remplir formulaire + Rechercher
ResultsScreen
  ↓ Bouton retour
ManualSearchScreen
  ↓ Bouton retour
Accueil
```

---

## Test des corrections

**Recharge Expo Go** (secoue → Reload)

### **1. HomeScreen simplifié**
- [ ] Écran accueil : Scanner + Input plaque + Bouton "Saisie manuelle"
- [ ] Pas d'animation slide
- [ ] Bouton "Saisie manuelle" → Navigation vers nouvelle page

### **2. ManualSearchScreen**
- [ ] Clic "Saisie manuelle" → Page formulaire s'ouvre
- [ ] Transition fluide (Stack navigation iOS/Android)
- [ ] Header avec bouton retour aligné
- [ ] Titre "Renseigner les informations"
- [ ] 6 champs formulaire visibles

### **3. Clavier standard**
- [ ] Clic champ kilométrage → Clavier AZERTY normal
- [ ] PAS de bouton bleu "Rechercher" sur clavier
- [ ] Validation via bouton en bas de page

### **4. Navigation retour**
- [ ] Formulaire → Bouton retour → Accueil
- [ ] Formulaire → Rechercher → Résultats → Retour → Formulaire

---

**Recharge et teste ! Navigation fluide et clavier standard !** 🚀📱
