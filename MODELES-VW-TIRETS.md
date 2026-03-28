# ✅ Modèles Volkswagen mis à jour + Gestion tirets/points

## 📋 Corrections appliquées

### 1️⃣ **Liste modèles VW enrichie** ✅

**Avant :**
```javascript
VOLKSWAGEN: [
  { label: 'T-Roc', value: 'T_ROC' },  // ❌ Underscore
  // Manque T-Cross, ID.3, ID.4, etc.
]
```

**Après :**
```javascript
VOLKSWAGEN: [
  { label: 'Polo', value: 'POLO' },
  { label: 'Golf', value: 'GOLF' },
  { label: 'Passat', value: 'PASSAT' },
  { label: 'Tiguan', value: 'TIGUAN' },
  { label: 'T-Roc', value: 'T-ROC' },          // ✅ Tiret conservé
  { label: 'T-Cross', value: 'T-CROSS' },      // ✅ Nouveau
  { label: 'Touran', value: 'TOURAN' },
  { label: 'Touareg', value: 'TOUAREG' },      // ✅ Nouveau
  { label: 'Caddy', value: 'CADDY' },
  { label: 'Transporter', value: 'TRANSPORTER' },
  { label: 'ID.3', value: 'ID.3' },            // ✅ Nouveau (point conservé)
  { label: 'ID.4', value: 'ID.4' },            // ✅ Nouveau
  { label: 'ID.5', value: 'ID.5' },            // ✅ Nouveau
  { label: 'ID.Buzz', value: 'ID.BUZZ' },      // ✅ Nouveau
  { label: 'Arteon', value: 'ARTEON' },        // ✅ Nouveau
  { label: 'Up!', value: 'UP!' },              // ✅ Nouveau (exclamation conservée)
]
```

**Nouveaux modèles ajoutés :**
- T-Cross
- Touareg
- ID.3, ID.4, ID.5, ID.Buzz (gamme électrique)
- Arteon
- Up!

---

### 2️⃣ **Gestion tirets et points dans URL** ✅

**Problème :**
- Leboncoin attend `VOLKSWAGEN_T-Roc` (avec tiret)
- Ancien code convertissait en `VOLKSWAGEN_T_ROC` (underscore)

**Solution :**
```javascript
// Remplacer uniquement les espaces par des underscores
// Garder les tirets (-) et points (.) tels quels
let modelFormatted = vehicle.model.toUpperCase();
modelFormatted = modelFormatted.replace(/\s+/g, '_');

const fullModel = `${vehicle.brand.toUpperCase()}_${modelFormatted}`;
```

**Exemples de transformation :**
- `T-Roc` → `VOLKSWAGEN_T-ROC` ✅
- `T-Cross` → `VOLKSWAGEN_T-CROSS` ✅
- `ID.3` → `VOLKSWAGEN_ID.3` ✅
- `ID.Buzz` → `VOLKSWAGEN_ID.BUZZ` ✅
- `Up!` → `VOLKSWAGEN_UP!` ✅
- `Golf GTI` → `VOLKSWAGEN_GOLF_GTI` ✅ (espace → underscore)

---

### 3️⃣ **Recherche lib Leboncoin** ✅

**Lib trouvée :** `leboncoin-api-search`
- Repo : https://github.com/thomasync/leboncoin-api-search
- NPM : `npm install leboncoin-api-search`
- Fonctionnalités :
  - Recherche simple/avancée
  - Gestion catégories (voitures, immobilier, etc.)
  - Gestion filtres (prix, localisation, features)
  - Récupération des features par catégorie
  - Pagination / offset

**Exemple d'utilisation :**
```javascript
import { search, CATEGORY } from 'leboncoin-api-search';

const results = await search({
  category: CATEGORY.VEHICULES,
  keywords: 'Volkswagen T-Roc',
  price_min: 15000,
  price_max: 25000,
  enums: {
    regdate: ['2020', '2021', '2022'],
  },
});
```

**Note :** Cette lib pourrait être utilisée pour :
- Scraping direct (au lieu de construire l'URL)
- Récupération des codes marque/modèle officiels
- Gestion des filtres complexes

**Pour l'instant :** On garde la construction d'URL manuelle (plus simple, pas de dépendance supplémentaire).

---

## 🧪 Test des corrections

### **Recharge Expo Go** (secoue → Reload)

**Puis vérifie :**

#### **1. Liste modèles VW**
- [ ] Va dans "Saisie manuelle"
- [ ] Sélectionne "Volkswagen"
- [ ] Vérifie que les nouveaux modèles apparaissent :
  - T-Roc
  - T-Cross
  - Touareg
  - ID.3, ID.4, ID.5, ID.Buzz
  - Arteon
  - Up!

#### **2. URL Leboncoin avec tirets**
- [ ] Recherche : Volkswagen T-Roc 2020
- [ ] Clique sur bouton Leboncoin
- [ ] Vérifie URL contient : `u_car_model=VOLKSWAGEN_T-ROC`
- [ ] Vérifie que le tiret est conservé (pas `T_ROC`)

#### **3. Test ID.3**
- [ ] Recherche : Volkswagen ID.3 2022
- [ ] Clique sur bouton Leboncoin
- [ ] Vérifie URL contient : `u_car_model=VOLKSWAGEN_ID.3`
- [ ] Vérifie que le point est conservé

---

## 📁 Fichiers modifiés

### **data/vehicleData.js** (1 changement)
- Liste modèles VW enrichie (8 → 16 modèles)
- Values avec tirets/points conservés (`T-ROC`, `ID.3`, etc.)

### **screens/ResultsScreen.js** (1 changement)
- Fonction `buildLeboncoinUrl()` : conservation tirets et points
- Seuls les espaces sont remplacés par underscores

---

**Recharge et teste ! Les modèles VW avec tirets sont maintenant gérés correctement !** 🚀

---

## 💡 Note lib Leboncoin

Si tu veux utiliser `leboncoin-api-search` plus tard pour du scraping direct :

```bash
cd backend
npm install leboncoin-api-search
```

**Avantages :**
- Pas besoin de construire l'URL manuellement
- Codes marque/modèle officiels
- Gestion automatique des filtres
- Pagination intégrée

**Inconvénient :**
- Dépendance supplémentaire
- Scraping direct (peut être bloqué par Leboncoin)
