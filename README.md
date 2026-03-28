# 🚗 AutoPilot

**Évaluez le prix de votre voiture rapidement via scan de plaque d'immatriculation**

<div align="center">

[![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-52-000020?logo=expo)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-25-339933?logo=node.js)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📱 Fonctionnalités

- 🔍 **Scan de plaque** : Reconnaissance automatique via OCR (à venir)
- ⌨️ **Saisie manuelle** : Recherche par plaque d'immatriculation française
- 🚙 **Recherche détaillée** : Marque, modèle, année, kilométrage, carburant, boîte
- 💰 **Fourchette de prix** : Moyenne basse, médiane, moyenne haute (données Leboncoin)
- 💼 **Estimation reprise pro** : Calcul automatique avec lien vers vendezvotrevoiture.fr
- 📊 **Top 10 annonces** : Comparaison avec annonces similaires
- 📍 **Filtrage par région** : Recherche nationale ou locale (13 régions)
- 🔗 **Lien Leboncoin** : Redirection vers annonces filtrées
- 📜 **Historique** : Sauvegarde des recherches récentes

---

## 🏗️ Architecture

### **Frontend**
- **React Native** + **Expo** (SDK 52)
- **React Navigation** (tab + stack)
- **Axios** (requêtes HTTP)
- **AsyncStorage** (persistance locale)

### **Backend**
- **Node.js** (Express server)
- **Python 3.13** (scraping Leboncoin)
- **lbc** library (unofficial Leboncoin API)

### **Services externes**
- **Leboncoin** : scraping des annonces VO
- **vendezvotrevoiture.fr** : estimation reprise professionnelle (affiliation Awin)

---

## 🚀 Installation

### **Prérequis**
- Node.js ≥ 25
- Python ≥ 3.13
- Expo Go (app mobile)

### **1. Cloner le repo**
```bash
git clone https://github.com/ounes/autopilot.git
cd autopilot
```

### **2. Installer les dépendances**

#### **Frontend**
```bash
npm install
```

#### **Backend**
```bash
cd backend
npm install

# Créer venv Python et installer dépendances
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### **3. Configuration**

Éditer `services/api.js` avec l'IP de votre machine :
```javascript
const API_BASE = 'http://VOTRE_IP:3001/api';  // Ex: http://192.168.1.13:3001/api
```

### **4. Lancer le backend**
```bash
cd backend
node server.js
```

Le serveur démarre sur `http://localhost:3001`

### **5. Lancer l'app**
```bash
npx expo start
```

Scanner le QR code avec **Expo Go** (iOS/Android)

---

## 📸 Screenshots

_(À venir)_

---

## 🗺️ Roadmap

### **✅ Version 1.0 (actuelle)**
- Recherche par plaque (API SIV)
- Recherche manuelle complète
- Scraping Leboncoin en temps réel
- Fourchette de prix (percentiles 5-50-95)
- Filtrage IQR des outliers
- Estimation reprise pro
- Historique local
- Paramètres (région, marges année/km)

### **🚧 Version 1.1 (en cours)**
- OCR plaque (scan photo)
- Amélioration UI/UX
- Mode hors ligne
- Partage de résultats

### **🔮 Version 2.0 (prévu)**
- Favoris
- Comparaison multi-véhicules
- Historique de prix (évolution)
- Alertes baisse de prix
- Export PDF

---

## 🛠️ Stack technique

| Composant | Technologie | Version |
|-----------|------------|---------|
| Runtime mobile | React Native | 0.76.6 |
| Framework | Expo | 52.0.11 |
| UI Components | Custom | - |
| Navigation | React Navigation | 7 |
| HTTP Client | Axios | 1.7.9 |
| Backend | Express | 4.21.2 |
| Scraping | Python lbc | latest |
| Storage | AsyncStorage | 2.1.0 |

---

## 📊 Données

### **Source : Leboncoin**
- Recherche en temps réel via scraping Python
- Filtres : marque, modèle, année (±2 ans), kilométrage (±30k km), région
- Limitation : 50 annonces par recherche
- Traitement : filtrage IQR, calcul percentiles

### **API SIV (plaques)**
- Reconnaissance plaque française (format AA-123-BB)
- Récupération : marque, modèle, année, motorisation, puissance
- Limitation : API non officielle (peut changer)

---

## ⚙️ Configuration

### **Paramètres de recherche**
- **Région** : 13 régions + France entière
- **Marge année** : ±2 ans (par défaut)
- **Marge kilométrage** : ±30 000 km (par défaut)

Modifiable dans **Profil → Paramètres**

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'feat: Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 License

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- [Leboncoin](https://www.leboncoin.fr) pour les données de marché
- [vendezvotrevoiture.fr](https://www.vendezvotrevoiture.fr) pour l'estimation reprise
- [Expo](https://expo.dev) pour le framework mobile
- Communauté React Native

---

## 📧 Contact

**Ounes Chadli**
- GitHub: [@ounes](https://github.com/ounes)
- Email: ounes@example.com

---

<div align="center">

**⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !**

</div>
