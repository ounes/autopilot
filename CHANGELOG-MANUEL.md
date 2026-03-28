# 🎯 Nouveautés - Recherche manuelle améliorée

## ✅ Ce qui a été ajouté :

### 1. **Sélecteurs intelligents**
- ✅ **Marque** : Sélection dans une liste de 25+ marques (Peugeot, Renault, Citroën, etc.)
- ✅ **Modèle** : Liste dynamique selon la marque sélectionnée
- ✅ **Année** : Sélecteur avec les 20 dernières années
- ✅ **Carburant** : Essence, Diesel, Électrique, Hybride, GPL, E85
- ✅ **Boîte de vitesse** : Manuelle, Automatique, Robotisée
- ✅ **Kilométrage** : Saisie manuelle (optionnel)

### 2. **Recherche avec barre de recherche**
- Les sélecteurs de marque et modèle ont une **barre de recherche intégrée**
- Tape les premières lettres pour filtrer rapidement

### 3. **Backend mis à jour**
- Les filtres carburant et boîte sont envoyés au backend
- Prêt pour filtrage avancé Leboncoin (à implémenter dans le script Python)

---

## 📸 Comment tester :

1. **Lance l'app** (Expo Go déjà ouvert)
2. **Clique sur "Ou saisir les infos manuellement"**
3. **Sélectionne :**
   - Marque : Peugeot
   - Modèle : 308 (la liste se filtre automatiquement)
   - Année : 2018
   - Carburant : Diesel
   - Boîte : Manuelle
   - Kilométrage : 85000 (optionnel)
4. **Clique sur "Rechercher"**

---

## 🔧 Fichiers créés/modifiés :

### Nouveaux fichiers :
1. **`data/vehicleData.js`** : Référentiel de marques/modèles/carburants/boîtes
2. **`components/Picker.js`** : Composant sélecteur personnalisé avec recherche

### Fichiers modifiés :
1. **`screens/HomeScreen.js`** : Formulaire avec sélecteurs au lieu de champs texte
2. **`backend/server.js`** : Endpoint mis à jour pour recevoir les nouveaux champs

---

## 🚀 Prochaines étapes (optionnel) :

### 1. Ajouter plus de marques/modèles
Éditer `data/vehicleData.js` et ajouter des entrées dans `VEHICLE_BRANDS` et `VEHICLE_MODELS`.

### 2. Filtrer Leboncoin par carburant/boîte
Mettre à jour `backend/scripts/search_leboncoin.py` pour utiliser les filtres :
```python
if vehicle.get("fuelType"):
    kwargs["fuel"] = map_fuel_type(vehicle["fuelType"])

if vehicle.get("gearboxType"):
    kwargs["gearbox"] = map_gearbox_type(vehicle["gearboxType"])
```

### 3. Charger les marques/modèles depuis une API
Remplacer le référentiel statique par un appel à une base de données externe (ex: Open Data ADEME).

---

## 📝 Référentiel actuel :

### Marques disponibles (25) :
Alfa Romeo, Audi, BMW, Citroën, Dacia, Fiat, Ford, Honda, Hyundai, Jeep, Kia, Mazda, Mercedes-Benz, Mini, Nissan, Opel, Peugeot, Renault, Seat, Skoda, Tesla, Toyota, Volkswagen, Volvo, Autre

### Modèles par marque (top modèles uniquement) :
- **Peugeot** : 108, 208, 308, 508, 2008, 3008, 5008, Partner, Expert, Boxer
- **Renault** : Clio, Megane, Twingo, Captur, Kadjar, Scenic, Espace, Kangoo, Trafic, Master
- **Citroën** : C1, C3, C4, C5, C3 Aircross, C5 Aircross, Berlingo, Jumpy, Jumper
- **Dacia** : Sandero, Duster, Logan, Spring, Jogger
- **Volkswagen** : Polo, Golf, Passat, Tiguan, T-Roc, Touran, Caddy, Transporter

---

## ✅ Test rapide :

Dans Expo Go, **recharge l'app** :
- Secoue le téléphone → "Reload"
- Ou appuie sur `r` dans le terminal Expo

Puis teste le formulaire amélioré ! 🎉
