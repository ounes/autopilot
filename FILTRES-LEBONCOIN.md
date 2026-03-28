# ✅ Filtres Leboncoin complets - Mise à jour

## 🎯 Ce qui a été fait :

### 1. **Script Python mis à jour** (`backend/scripts/search_leboncoin.py`)
✅ **Nouveaux filtres implémentés :**
- **Marque** : Recherche textuelle dans le titre
- **Modèle** : Recherche textuelle dans le titre
- **Année** : ±2 ans (ex: 2016-2020 pour 2018)
- **Kilométrage** : ±20 000 km si renseigné (ex: 65k-105k pour 85k)
- **Carburant** : Essence, Diesel, Électrique, Hybride, GPL, E85
- **Boîte de vitesse** : Manuelle, Automatique, Robotisée

### 2. **Mapping des valeurs Leboncoin**
```python
FUEL_TYPE_MAPPING = {
    "ESSENCE": "1",
    "DIESEL": "2",
    "GPL": "3",
    "ELECTRIQUE": "4",
    "HYBRIDE": "6",
    "E85": "5",
}

GEARBOX_TYPE_MAPPING = {
    "MANUELLE": "1",
    "AUTOMATIQUE": "2",
    "ROBOTISEE": "3",
}
```

### 3. **Backend mis à jour** (`backend/server.js`)
Le serveur Node.js passe maintenant tous les filtres au script Python :
```javascript
command += ` --fuel-type ${vehicle.fuelType}`;
command += ` --gearbox-type ${vehicle.gearboxType}`;
```

### 4. **Résultats enrichis**
Les listings retournés incluent maintenant :
- `fuel`: Label du carburant (ex: "Diesel")
- `gearbox`: Label de la boîte (ex: "Manuelle")
- `filters`: Objet résumant les filtres appliqués

---

## 🧪 Test complet réussi :

**Commande testée :**
```bash
python search_leboncoin.py "PEUGEOT" "308" 2018 \
  --mileage 85000 \
  --fuel-type DIESEL \
  --gearbox-type MANUELLE \
  --limit 10
```

**Résultats :**
- ✅ 10 annonces Peugeot 308
- ✅ Années : 2016-2020 (±2 ans)
- ✅ Kilométrage : 65k-105k (±20k)
- ✅ Carburant : Diesel uniquement
- ✅ Boîte : Manuelle uniquement

---

## 📱 Comment tester dans l'app :

1. **Recharge l'app Expo Go** (secoue → Reload)
2. **Clique sur "Ou saisir les infos manuellement"**
3. **Remplis le formulaire :**
   - Marque : Peugeot
   - Modèle : 308
   - Année : 2018
   - Carburant : Diesel
   - Boîte : Manuelle
   - Kilométrage : 85000
4. **Recherche** → Les résultats seront filtrés !

---

## 🔍 Filtres appliqués automatiquement :

| Champ | Valeur saisie | Filtre appliqué |
|-------|---------------|-----------------|
| Marque | Peugeot | Recherche textuelle "PEUGEOT" |
| Modèle | 308 | Recherche textuelle "308" |
| Année | 2018 | 2016-2020 (±2 ans) |
| Kilométrage | 85000 | 65 000-105 000 km (±20k) |
| Carburant | Diesel | Code "2" (Diesel) |
| Boîte | Manuelle | Code "1" (Manuelle) |

---

## 📊 Résultats attendus :

**Sans filtres (marque/modèle/année uniquement) :**
- ~50-100 annonces Peugeot 308 2016-2020

**Avec filtres complets :**
- ~10-30 annonces (filtrage plus strict)
- Tous Diesel + Manuelle
- Kilométrage dans la fourchette

**Avantage :**
- Prix plus précis (comparables homogènes)
- Top 10 plus pertinent
- Stats régionales plus fiables

---

## ⚡ Optimisations futures possibles :

1. **Cache Redis** : Mémoriser les recherches fréquentes (ex: 308 2018 Diesel)
2. **Multi-threading** : Chercher en parallèle sur plusieurs sites (Argus, La Centrale)
3. **Alertes prix** : Notifier si une annonce matching apparaît sous le prix médian
4. **Favoris intelligents** : Suggérer des annonces selon les recherches précédentes

---

## 🎉 Résultat final :

**L'app fait maintenant des recherches Leboncoin ultra-précises avec :**
- ✅ Filtrage marque/modèle exact
- ✅ Année ±2 ans
- ✅ Kilométrage ±20k km
- ✅ Carburant exact
- ✅ Boîte de vitesse exacte
- ✅ Top 10 annonces triées par pertinence (prix proche médiane)
- ✅ Stats régionales fiables
- ✅ Fourchette de prix 5e-95e percentile

**Prêt pour test en production !** 🚀
