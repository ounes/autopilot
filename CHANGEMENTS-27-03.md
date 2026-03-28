# ✅ Changements demandés — Implémentés

## 📋 Liste des modifications

### 1️⃣ **HomeScreen — Saisie plaque**
✅ **Format forcé `AA-123-AA`**
- Fonction `formatPlate()` qui formate automatiquement pendant la saisie
- Placeholder changé : `"AB-123-CD"` (au lieu de `"GX 123 AK"`)
- MaxLength : 10 caractères (pour inclure les tirets)
- Formatage en temps réel : les tirets sont ajoutés automatiquement

✅ **Header supprimé**
- Icône voiture + titre "Immat Scanner" + menu supprimés
- Padding top augmenté : 60px → 100px (pour compenser)
- Plus d'espace pour la subtitle et le contenu

---

### 2️⃣ **ManualScreen — Formulaire de saisie**
✅ **Header cohérent**
- Nouveau header `manualHeader` avec flèche retour centrée
- Titre : "Recherche manuelle" (au lieu de "Saisie manuelle")
- Padding top : 60px (zone safe)
- Style cohérent avec le reste de l'app

✅ **Pickers SANS recherche**
- `searchable` retiré des pickers Marque et Modèle
- Modal bottom sheet standard (sans champ de recherche)
- Navigation par scroll uniquement
- Année/Carburant/Boîte : pickers simples (déjà sans recherche)

---

### 3️⃣ **ResultsScreen — Lien Leboncoin**
✅ **Bouton vers Leboncoin filtré**
- Nouveau bouton orange (#FF6E14) après la fourchette de prix
- Texte : "Voir toutes les annonces sur Leboncoin"
- Icônes : loupe + lien externe
- Construction automatique de l'URL avec tous les filtres :
  - ✅ Marque + modèle (texte de recherche)
  - ✅ Année ±2 ans
  - ✅ Kilométrage ±20 000 km (si disponible)
  - ✅ Carburant (si disponible)
  - ✅ Boîte de vitesse (si disponible)
  - ✅ Catégorie : Voiture (cat=2)

**Exemple d'URL générée :**
```
https://www.leboncoin.fr/recherche?
  text=Peugeot+308
  &regdate=2016-2020
  &mileage=65000-105000
  &fuel=2
  &gearbox=1
  &category=2
```

---

### 4️⃣ **HistoryScreen — Redirection**
✅ **Clic sur ligne = Résultats**
- `TouchableOpacity` au lieu de `View` sur chaque card
- Fonction `handleItemClick()` qui navigue vers ResultsScreen
- Passage des données véhicule + pricing (récupérées de l'historique)
- `activeOpacity={0.7}` pour feedback visuel au toucher

---

## 🧪 Test des changements

### **1. HomeScreen — Saisie plaque**
- [ ] Ouvre l'app
- [ ] Tape une plaque (ex: "AB123CD")
- [ ] Vérifie que ça devient automatiquement "AB-123-CD"
- [ ] Vérifie que le header n'est plus visible

### **2. ManualScreen — Formulaire**
- [ ] Clique "Saisie manuelle"
- [ ] Vérifie le header : flèche retour + "Recherche manuelle"
- [ ] Ouvre le picker Marque → Vérifie qu'il n'y a PAS de barre de recherche
- [ ] Ouvre le picker Modèle → Vérifie qu'il n'y a PAS de barre de recherche

### **3. ResultsScreen — Leboncoin**
- [ ] Fais une recherche (Peugeot 308 2018 Diesel Manuelle 85000)
- [ ] Scroll jusqu'après la fourchette de prix
- [ ] Vérifie le bouton orange "Voir toutes les annonces sur Leboncoin"
- [ ] Clique dessus → Vérifie que ça ouvre Leboncoin avec les bons filtres

### **4. HistoryScreen — Redirection**
- [ ] Va dans l'onglet "Historique"
- [ ] Clique sur une ligne de l'historique
- [ ] Vérifie que ça ouvre ResultsScreen avec les infos du véhicule

---

## 📁 Fichiers modifiés

### **HomeScreen.js** (3 changements)
1. Fonction `formatPlate()` ajoutée
2. Handler `handlePlateChange()` pour formatage en temps réel
3. Header (icône + titre + menu) supprimé
4. Placeholder plaque : `"AB-123-CD"`
5. MaxLength : 10 (pour tirets)
6. Padding top : 60px → 100px
7. Header manuel refait : `manualHeader` + titre "Recherche manuelle"
8. Pickers marque/modèle : `searchable` retiré

### **ResultsScreen.js** (2 changements)
1. Fonction `buildLeboncoinUrl()` pour construire URL filtrée
2. Fonction `openLeboncoinFiltered()` pour ouvrir Leboncoin
3. Bouton orange ajouté après la fourchette de prix
4. Styles : `leboncoinButton`, `leboncoinText`

### **HistoryScreen.js** (2 changements)
1. Import `useNavigation` ajouté
2. Fonction `handleItemClick()` pour navigation
3. Card changée de `View` → `TouchableOpacity`
4. `activeOpacity={0.7}` pour feedback visuel

---

## 🚀 Déploiement

**Le serveur Expo est déjà actif !**

### **Recharge l'app :**
1. Secoue le téléphone
2. Clique "Reload"

### **Teste les 4 changements :**
1. ✅ Format plaque `AA-123-AA`
2. ✅ Header supprimé sur HomeScreen
3. ✅ Pickers sans recherche dans ManualScreen
4. ✅ Bouton Leboncoin dans ResultsScreen
5. ✅ Redirection historique vers résultats

---

## 💬 Feedback

**Après test, dis-moi :**
- ✅ **"Nickel"** → Tout fonctionne !
- ⚠️ **"Problème : [description]"** → Je corrige
- 🎨 **"Change [élément]"** → J'ajuste

---

**Tous les changements sont appliqués ! Teste maintenant !** 🚀
