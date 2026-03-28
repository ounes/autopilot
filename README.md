# Immat Scanner Plus 🚗

Application mobile React Native (Expo) pour scanner des plaques d'immatriculation et obtenir des estimations de prix à partir de Leboncoin.

## 🎯 Fonctionnalités

### ✅ Implémenté
- 📸 Scanner de plaque (UI prête, OCR à intégrer)
- ✍️ Saisie manuelle de plaque
- 📝 Saisie manuelle des infos véhicule (marque, modèle, année, kilométrage)
- 🔍 Recherche de cote Leboncoin avec :
  - Fourchette de prix (5e-95e percentile)
  - Prix médian
  - Nombre de véhicules similaires (région + France)
  - Répartition par région
  - Top 10 annonces les plus pertinentes
- 📊 Critères de recherche intelligents :
  - Année: ±2 ans
  - Kilométrage: ±20 000 km
- 📜 Historique des recherches
- 👤 Profil utilisateur (stats, garage, favoris)
- 🎨 Interface fidèle à Immat Scanner (design bleu/blanc, plaques françaises)

### 🔧 À intégrer (backend)
- OCR plaque avec `fast-plate-ocr` (skill vehicle-valuation)
- Identification véhicule via base ADEME + API SIV-Auto
- Scraping Leboncoin réel (actuellement simulé)

## 📦 Installation

```bash
cd ~/.openclaw/workspace/immat-scanner-plus
npm install
```

## 🚀 Lancement

### Web (développement rapide)
```bash
npm run web
```

### iOS (simulateur)
```bash
npm run ios
```

### Android (émulateur ou appareil)
```bash
npm run android
```

## 🏗️ Architecture

```
immat-scanner-plus/
├── App.js                      # Navigation principale
├── screens/
│   ├── HomeScreen.js          # Accueil (scan/saisie plaque)
│   ├── ResultsScreen.js       # Résultats (cote + annonces)
│   ├── HistoryScreen.js       # Historique recherches
│   └── ProfileScreen.js       # Profil utilisateur
├── services/
│   └── api.js                 # Logique API (simulation pour l'instant)
└── components/                # Composants réutilisables (à créer)
```

## 🔌 Intégration backend (prochaine étape)

### Option 1 : Backend Node.js local

Créer un serveur Express qui :
1. Reçoit photo ou plaque depuis l'app mobile
2. Appelle `fast-plate-ocr` (si photo)
3. Identifie le véhicule (base ADEME + SIV-Auto fallback)
4. Exécute le script `vehicle-valuation` pour scraper Leboncoin
5. Retourne JSON avec véhicule + cote

**Stack recommandée :**
- Express.js
- Python scripts (OCR + scraping)
- PostgreSQL (cache)
- Redis (rate limiting)

### Option 2 : Appels directs depuis l'app

Remplacer le contenu de `services/api.js` pour :
1. Appeler directement SIV-Auto API (freemium 100 req/mois)
2. Scraper Leboncoin via Firecrawl (skill disponible)

## 📱 Utilisation

### Recherche par plaque
1. Saisir la plaque dans le champ (ex: `FA-235-LB`)
2. Cliquer sur "Rechercher"
3. Voir les résultats (fiche véhicule + cote)

### Recherche manuelle
1. Cliquer sur "Ou saisir les infos manuellement"
2. Remplir marque, modèle, année (+ kilométrage optionnel)
3. Cliquer sur "Rechercher"

### Historique
- Toutes les recherches sont sauvegardées automatiquement
- Accessible via l'onglet "Historique"
- Possibilité de supprimer individuellement ou tout effacer

## 🎨 Design

Interface inspirée d'Immat Scanner :
- **Couleurs** : Bleu (#2563EB) + blanc + gris sombre
- **Plaque** : Format français avec bandes bleues EU
- **Cards** : Arrondis 16px, shadows légères
- **Navigation** : Bottom tabs (Accueil, Historique, Profil)

## 📊 Données simulées (pour test)

Actuellement, l'app utilise des données mock pour :
- Identification véhicule (Peugeot 308 par défaut)
- Annonces Leboncoin (50 listings générés)
- Statistiques régionales

Pour passer en production, remplacer par de vrais appels API dans `services/api.js`.

## 🔐 Sécurité

- Historique stocké localement (AsyncStorage)
- Pas de données sensibles transmises
- Rate limiting à implémenter côté backend

## 📈 Prochaines étapes

1. ✅ Créer le backend Express.js
2. ✅ Intégrer fast-plate-ocr (OCR photo → plaque)
3. ✅ Connecter à SIV-Auto API (identification véhicule)
4. ✅ Intégrer skill vehicle-valuation (scraping Leboncoin)
5. ✅ Implémenter système de crédits/abonnement
6. ✅ Ajouter alertes prix (push notifications)
7. ✅ Publier sur App Store / Play Store

## 🛠️ Stack technique

- **Frontend** : React Native (Expo)
- **Navigation** : React Navigation v6
- **UI** : React Native Paper + custom components
- **State** : React Hooks
- **Storage** : AsyncStorage
- **Backend** : À créer (Node.js + Python recommandé)

## 📝 Notes

- L'OCR via caméra nécessite des permissions (demandées automatiquement)
- Le scraping Leboncoin doit respecter les rate limits (max 2-3x/jour)
- SIV-Auto freemium = 100 requêtes/mois gratuit

## 🤝 Contribution

Pour ajouter des fonctionnalités :
1. Créer une nouvelle screen dans `screens/`
2. Ajouter la route dans `App.js`
3. Mettre à jour `services/api.js` si besoin d'appels backend

---

**Développé pour Ounes** - Garage automobile Peyrolles-en-Provence 🚗
