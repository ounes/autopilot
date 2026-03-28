# 🚀 Plan de Migration UI/UX — Immat Scanner Plus

## ✅ Composants créés (Design System)

### Fichiers prêts :
1. ✅ `theme.js` — Design System complet (couleurs, typo, espacements, composants)
2. ✅ `components/Button.js` — Bouton moderne (4 variants, 3 sizes)
3. ✅ `components/Input.js` — Input avec label, icône, erreur
4. ✅ `components/PickerV2.js` — Picker modal bottom sheet amélioré
5. ✅ `components/Card.js` — Card avec variants et elevation

---

## 📱 Migration écran par écran

### 🏠 **ÉCRAN 1 : HomeScreen**

#### **Changements à appliquer :**

1. **Importer le nouveau Design System**
```javascript
import theme from '../theme';
import Button from '../components/Button';
import Card from '../components/Card';
```

2. **Header (barre du haut)**
```javascript
// AVANT
<View style={styles.header}>
  <Ionicons name="car-sport" size={40} color="#fff" />
  <Text style={styles.title}>Immat Scanner</Text>
  <TouchableOpacity style={styles.menuButton}>
    <Ionicons name="menu" size={28} color="#fff" />
  </TouchableOpacity>
</View>

// APRÈS
<View style={styles.header}>
  <Ionicons name="car-sport" size={theme.components.icon.lg} color="#fff" />
  <Text style={styles.title}>Immat Scanner</Text>
  <TouchableOpacity style={styles.menuButton}>
    <Ionicons name="menu" size={theme.components.icon.lg} color="#fff" />
  </TouchableOpacity>
</View>

// Styles
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: theme.components.header.height,
  paddingHorizontal: theme.spacing[5],
  marginBottom: theme.spacing[6],
},
title: {
  ...theme.typography.styles.h2,
  color: '#fff',
  flex: 1,
  marginLeft: theme.spacing[3],
},
menuButton: {
  ...theme.components.touchTarget,
  alignItems: 'center',
  justifyContent: 'center',
},
```

3. **Subtitle**
```javascript
// AVANT
<Text style={styles.subtitle}>
  Scannez et découvrez les caractéristiques{'\n'}des véhicules autour de vous
</Text>

// APRÈS
<Text style={styles.subtitle}>
  Scannez et découvrez les caractéristiques des véhicules autour de vous
</Text>

// Styles
subtitle: {
  ...theme.typography.styles.bodyLarge,
  color: '#fff',
  textAlign: 'center',
  marginBottom: theme.spacing[8],
  lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.lg,
  paddingHorizontal: theme.spacing[4],
},
```

4. **Card principale**
```javascript
// AVANT
<View style={styles.card}>

// APRÈS
<Card variant="base" elevation="lg">

// Pas besoin de styles.card, le composant Card gère tout
```

5. **Bouton "Scanner une plaque"**
```javascript
// AVANT
<TouchableOpacity style={styles.scanButton} onPress={handleScan}>
  <Ionicons name="camera" size={24} color="#fff" />
  <Text style={styles.scanButtonText}>Scanner une plaque</Text>
</TouchableOpacity>

// APRÈS
<Button
  variant="primary"
  size="large"
  icon="camera"
  onPress={handleScan}
  fullWidth
>
  Scanner une plaque
</Button>
```

6. **Texte "OU ENTREZ LA PLAQUE"**
```javascript
// AVANT
<Text style={styles.orText}>OU ENTREZ LA PLAQUE</Text>

// APRÈS
<Text style={styles.orText}>OU SAISISSEZ LA PLAQUE</Text>

// Styles
orText: {
  textAlign: 'center',
  color: theme.colors.text.tertiary,
  fontSize: theme.typography.fontSize.xs,
  marginVertical: theme.spacing[5],
  fontWeight: theme.typography.fontWeight.semibold,
  letterSpacing: 1,
},
```

7. **Plaque d'immatriculation**
```javascript
// Styles améliorés
plateContainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderRadius: theme.borderRadius.md,
  borderWidth: 2,
  borderColor: theme.colors.border.dark,
  overflow: 'hidden',
  height: 64, // Réduit de 70 à 64px
  marginBottom: theme.spacing[5],
},
plateLeft: {
  width: 44, // Réduit de 50 à 44px
  backgroundColor: theme.colors.primary[600],
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.spacing[2],
},
euStars: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: 28, // Réduit de 30 à 28px
  marginBottom: theme.spacing[1],
},
star: {
  width: 3, // Réduit de 4 à 3px
  height: 3,
  backgroundColor: '#FCD34D',
  margin: 1,
},
plateCountry: {
  color: '#fff',
  fontSize: theme.typography.fontSize.base,
  fontWeight: theme.typography.fontWeight.bold,
},
plateInput: {
  flex: 1,
  fontSize: theme.typography.fontSize['3xl'], // 28px
  fontWeight: theme.typography.fontWeight.bold,
  color: theme.colors.text.primary,
  textAlign: 'center',
  letterSpacing: 4,
  paddingHorizontal: theme.spacing[2],
},
plateRight: {
  width: 44, // Réduit de 50 à 44px
  backgroundColor: theme.colors.primary[600],
},
```

8. **Bouton "Rechercher"**
```javascript
// AVANT
<TouchableOpacity
  style={styles.searchButton}
  onPress={handleSearch}
  disabled={loading}
>
  {loading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <>
      <Ionicons name="search" size={20} color="#fff" />
      <Text style={styles.searchButtonText}>Rechercher</Text>
    </>
  )}
</TouchableOpacity>

// APRÈS
<Button
  variant="primary"
  size="large"
  icon="search"
  onPress={handleSearch}
  loading={loading}
  fullWidth
>
  Rechercher
</Button>
```

9. **Lien "Ou saisir les infos manuellement"**
```javascript
// AVANT
<TouchableOpacity
  style={styles.manualButton}
  onPress={() => setManualMode(true)}
>
  <Text style={styles.manualButtonText}>Ou saisir les infos manuellement</Text>
</TouchableOpacity>

// APRÈS
<Button
  variant="ghost"
  size="small"
  onPress={() => setManualMode(true)}
  fullWidth
>
  Saisie manuelle
</Button>
```

10. **InfoBox**
```javascript
// Styles améliorés
infoBox: {
  flexDirection: 'row',
  backgroundColor: theme.colors.info.light,
  padding: theme.spacing[4],
  borderRadius: theme.borderRadius.md,
  marginTop: theme.spacing[6],
  gap: theme.spacing[3],
},
infoText: {
  flex: 1,
  ...theme.typography.styles.bodySmall,
  color: theme.colors.primary[800],
  lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
},
```

11. **Bottom Navigation**
```javascript
// Styles améliorés
bottomNav: {
  height: theme.components.bottomNav.height,
  backgroundColor: theme.components.bottomNav.backgroundColor,
  borderTopWidth: theme.components.bottomNav.borderTopWidth,
  borderTopColor: theme.components.bottomNav.borderTopColor,
  flexDirection: 'row',
  paddingBottom: theme.spacing[2],
},
navItem: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  ...theme.components.touchTarget,
},
navIcon: {
  marginBottom: theme.spacing[1],
},
navLabel: {
  ...theme.typography.styles.caption,
  fontSize: 11, // Augmenté de 10 à 11px
},
```

---

### 📝 **ÉCRAN 2 : ManualScreen (Saisie manuelle)**

#### **Changements à appliquer :**

1. **Importer les nouveaux composants**
```javascript
import theme from '../theme';
import Button from '../components/Button';
import Input from '../components/Input';
import PickerV2 from '../components/PickerV2'; // Remplacer Picker
import Card from '../components/Card';
```

2. **Header**
```javascript
// AVANT
<View style={styles.header}>
  <TouchableOpacity onPress={() => setManualMode(false)}>
    <Ionicons name="arrow-back" size={28} color="#fff" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Saisie manuelle</Text>
</View>

// APRÈS
<View style={styles.header}>
  <TouchableOpacity
    onPress={() => setManualMode(false)}
    style={styles.backButton}
  >
    <Ionicons name="arrow-back" size={theme.components.icon.lg} color="#fff" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Saisie manuelle</Text>
  <View style={{ width: theme.components.icon.lg }} /> {/* Spacer pour centrer le titre */}
</View>

// Styles
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: theme.components.header.height,
  paddingHorizontal: theme.spacing[5],
  marginBottom: theme.spacing[6],
},
backButton: {
  ...theme.components.touchTarget,
  alignItems: 'center',
  justifyContent: 'center',
},
headerTitle: {
  ...theme.typography.styles.h3,
  color: '#fff',
  textAlign: 'center',
  flex: 1,
},
```

3. **Formulaire (remplacer tous les champs)**
```javascript
// AVANT
<View style={styles.manualCard}>
  <Text style={styles.inputLabel}>Marque *</Text>
  <TextInput
    style={styles.input}
    ...
  />
</View>

// APRÈS
<Card variant="base" elevation="lg">
  <PickerV2
    label="Marque *"
    value={manualData.brand}
    items={VEHICLE_BRANDS}
    onValueChange={(value) => {
      setManualData({ ...manualData, brand: value, model: '' });
    }}
    placeholder="Sélectionner une marque"
    searchable
  />

  <PickerV2
    label="Modèle *"
    value={manualData.model}
    items={availableModels}
    onValueChange={(value) => setManualData({ ...manualData, model: value })}
    placeholder={manualData.brand ? "Sélectionner un modèle" : "Sélectionnez d'abord une marque"}
    searchable
  />

  <PickerV2
    label="Année *"
    value={manualData.year}
    items={YEARS}
    onValueChange={(value) => setManualData({ ...manualData, year: value })}
    placeholder="Sélectionner une année"
  />

  <PickerV2
    label="Carburant"
    value={manualData.fuelType}
    items={FUEL_TYPES}
    onValueChange={(value) => setManualData({ ...manualData, fuelType: value })}
    placeholder="Sélectionner un carburant"
  />

  <PickerV2
    label="Boîte de vitesse"
    value={manualData.gearboxType}
    items={GEARBOX_TYPES}
    onValueChange={(value) => setManualData({ ...manualData, gearboxType: value })}
    placeholder="Sélectionner une boîte"
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

  <Button
    variant="primary"
    size="large"
    icon="search"
    onPress={handleManualSearch}
    loading={loading}
    fullWidth
  >
    Rechercher
  </Button>
</Card>
```

4. **Supprimer les anciens styles input/picker**
```javascript
// SUPPRIMER :
inputLabel: { ... }
input: { ... }
manualCard: { ... }

// Le composant Card gère déjà le padding/radius/shadow
```

---

## 📊 Résumé des améliorations

### **Typographie**
- ✅ Tailles augmentées : 12→13, 14→15, 16→17 (body)
- ✅ Line-height améliorés : 1.2→1.5 (normal), 1.5→1.6 (relaxed)
- ✅ Poids harmonisés : 600 (semibold) pour labels

### **Espacements**
- ✅ Padding cards : 24px → 20px (moins d'espace gaspillé)
- ✅ Marges verticales : 16px → 24px (plus d'air entre sections)
- ✅ Touch targets : 44×44px minimum (WCAG compliant)

### **Couleurs**
- ✅ Bleu primaire : #2563EB → #3B82F6 (meilleur contraste)
- ✅ Gris fond inputs : #F1F5F9 (conservé mais avec border au focus)
- ✅ Texte labels : #475569 → #334155 (plus foncé, meilleur contraste)

### **Border-radius**
- ✅ Boutons : 16px → 12px (moins arrondis)
- ✅ Inputs/Pickers : 12px (uniforme)
- ✅ Cards : 24px → 16px (moins excessifs)
- ✅ Modal : 24px (conservé pour effet bottom sheet)

### **Composants**
- ✅ Icônes : 20px → 24px (mieux visibles)
- ✅ Boutons : height 48px minimum (au lieu de padding variable)
- ✅ Inputs : height 48px minimum (uniformes avec boutons)
- ✅ Bottom nav : height 64px + labels 11px (lisibles)

---

## 🎯 Validation avant implémentation

**Prochaines étapes :**
1. ✅ **Valide l'audit** : Es-tu d'accord avec les problèmes identifiés ?
2. ✅ **Valide le Design System** : Couleurs, typo, espacements OK ?
3. ⚠️ **Choix final** : Veux-tu :
   - **Option A** : J'implémente tout de suite (changements massifs dans tous les écrans)
   - **Option B** : Je crée d'abord des **maquettes visuelles Stitch** pour valider le design ?
   - **Option C** : Migration progressive (1 écran à la fois) ?

**Mon conseil** : Option B (maquettes Stitch) → validation visuelle → implémentation complète.

Qu'en penses-tu ? 🚀
