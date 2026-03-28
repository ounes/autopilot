# 🎨 Guide d'interface - Immat Scanner Plus

## 📱 Écrans principaux

### 1️⃣ Accueil (HomeScreen)
**Inspiré de la capture 1 (Immat Scanner original)**

**Éléments :**
- **Header** : Logo + titre "Immat Scanner" + menu burger
- **Hero** : Fond voiture floue avec overlay bleu foncé semi-transparent
- **Tagline** : "Scannez et découvrez les caractéristiques des véhicules autour de vous"
- **Bouton principal** : "Scanner une plaque" (bleu foncé, icône caméra)
- **Séparateur** : "OU ENTREZ LA PLAQUE" (gris clair)
- **Plaque interactive** :
  - Bande bleue gauche avec étoiles UE + "F"
  - Champ de saisie central (police grasse, lettres espacées)
  - Bande bleue droite
- **Bouton recherche** : Bleu vif avec icône loupe
- **Lien alternatif** : "Ou saisir les infos manuellement" (souligné)
- **Info box** : Fond bleu clair avec icône ℹ️ et texte explicatif

**Modes :**
- **Mode plaque** (par défaut) : Saisie plaque + scanner
- **Mode manuel** (bascule) : Formulaire marque/modèle/année/km

---

### 2️⃣ Historique (HistoryScreen)
**Inspiré de la capture 2 (Historique Immat Scanner)**

**Éléments :**
- **Header** : Fond bleu foncé, titre "Historique"
- **Barre de recherche** : Blanc avec icône loupe + placeholder
- **Compteur** : "42 véhicules" + bouton "Effacer tout" (rouge)
- **Liste scrollable** :
  - Photo miniature (80x80, arrondie)
  - Marque/modèle (gras)
  - Plaque format français (bandes bleues)
  - Date relative ("Il y a 15 heures", "Il y a 1 jour")
  - Icône poubelle (rouge, à droite)
- **État vide** : Icône voiture + message "Aucun véhicule"

---

### 3️⃣ Profil (ProfileScreen)
**Inspiré de la capture 3 (Profil Immat Scanner)**

**Éléments :**
- **Header** : Fond voiture avec overlay + icône paramètres
- **Avatar** : Cercle blanc avec icône voiture bleue
- **Username** : "CapotMaladroit12" (générateur aléatoire)
- **Badge** : "Explorateur Auto" avec bouclier vérifié
- **Stats grid** (2x2) :
  - 🔥 Jours consécutifs
  - 🔍 Recherches classiques
  - 📱 Recherches scanner
  - 👥 Contributions
- **Carte Garage** : Grande card avec icône voiture + compteur
- **Carte Favoris** : Card avec cœur rouge + compteur
- **Menu** : Liste d'actions (Notifications, Aide, À propos)

---

### 4️⃣ Résultats (ResultsScreen) ⭐ NOUVEAU
**Design personnalisé pour la cote Leboncoin**

**Éléments :**
- **Header** : Retour + titre + partage
- **Carte véhicule** :
  - Plaque format français
  - Marque + modèle (gros titre)
  - Version (sous-titre gris)
  - Specs en ligne (📅 année, ⚡ carburant, ⏱️ puissance)
- **Estimation de prix** :
  - 3 colonnes : Min / **Médiane** / Max
  - Médiane en surbrillance (fond bleu clair)
  - Stats : nombre région + France
- **Répartition régions** :
  - Liste top 5 avec barres de progression bleues
  - Nom région + compteur
- **Top 10 annonces** :
  - Photo miniature + infos (année, km, localisation)
  - Prix en gras bleu + flèche
  - Lien cliquable vers Leboncoin
- **Footer** : Bouton "Ajouter aux favoris" (bordure rouge)

---

## 🎨 Palette de couleurs

```javascript
const colors = {
  // Primaires
  primary: '#2563EB',      // Bleu principal
  primaryDark: '#1E293B',  // Bleu foncé (header, textes)
  primaryLight: '#DBEAFE', // Bleu clair (backgrounds)
  
  // Secondaires
  danger: '#EF4444',       // Rouge (alertes, suppression)
  success: '#10B981',      // Vert (succès)
  warning: '#F59E0B',      // Orange (attention)
  
  // Neutres
  white: '#FFFFFF',
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',
};
```

---

## 📐 Composants réutilisables

### Plaque d'immatriculation
```jsx
<View style={styles.plate}>
  <View style={styles.plateLeft}>
    {/* Étoiles UE */}
    <Text style={styles.plateCountry}>F</Text>
  </View>
  <Text style={styles.plateText}>FA 235 LB</Text>
  <View style={styles.plateRight} />
</View>
```

**Style :**
- Border radius: 6-12px
- Bandes bleues: `#2563EB`
- Texte: Font bold, letterspacing 2-4
- Hauteur: 60-70px (pleine page) ou 40-50px (mini)

### Card standard
```jsx
<View style={styles.card}>
  {/* Contenu */}
</View>
```

**Style :**
- Background: `#FFFFFF`
- Border radius: 16px
- Padding: 20-24px
- Shadow: `rgba(0, 0, 0, 0.05)`, offset (0, 2), radius 8

### Bouton primaire
```jsx
<TouchableOpacity style={styles.button}>
  <Ionicons name="icon" size={20} color="#fff" />
  <Text style={styles.buttonText}>Action</Text>
</TouchableOpacity>
```

**Style :**
- Background: `#2563EB`
- Border radius: 16px
- Padding: 18px
- Texte: font 16px, bold, blanc

---

## 🔤 Typographie

```javascript
const typography = {
  // Titres
  h1: { fontSize: 28, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 18, fontWeight: '600' },
  
  // Corps
  body: { fontSize: 16, fontWeight: 'normal' },
  bodySmall: { fontSize: 14, fontWeight: 'normal' },
  caption: { fontSize: 12, fontWeight: 'normal' },
  
  // Spéciaux
  plate: { fontSize: 32, fontWeight: 'bold', letterSpacing: 4 },
  price: { fontSize: 20, fontWeight: 'bold' },
};
```

---

## 📱 Navigation

**Bottom Tabs :**
- **Accueil** : `home` / `home-outline`
- **Historique** : `car` / `car-outline`
- **Profil** : `person` / `person-outline`

**Couleurs :**
- Active: `#2563EB`
- Inactive: `#94A3B8`

**Stack Navigation :**
- Tabs → Results (modal-like, header avec retour)

---

## 💡 Animations recommandées

1. **Scan plaque** : Shimmer effect pendant OCR
2. **Résultats** : Fade in + slide up
3. **Prix** : Count up animation (0 → valeur finale)
4. **Listes** : Stagger animation (apparition décalée)

---

## ✅ Checklist UX

- [ ] Loading states partout (spinners, skeletons)
- [ ] Messages d'erreur clairs
- [ ] Feedback tactile (haptic sur boutons)
- [ ] Pull to refresh sur historique
- [ ] Swipe to delete sur historique
- [ ] Empty states avec illustrations
- [ ] Offline mode (données en cache)
- [ ] Dark mode (optionnel)

---

**Interface 100% fidèle à Immat Scanner avec les fonctionnalités Leboncoin en plus !** 🚗💰
