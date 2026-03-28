# 🚀 Guide de test — Nouvelle UI

## 🎯 Changement principal visible

**L'écran d'accueil (HomeScreen) a été complètement refait avec le nouveau Design System.**

---

## 📱 Comment tester

### **1. Recharge l'app dans Expo Go**

**Option A : Depuis le téléphone**
- Secoue le téléphone
- Clique sur "Reload"

**Option B : Depuis le terminal**
- Dans le terminal où Expo tourne
- Tape `r` et Entrée

### **2. Ce que tu vas voir de nouveau**

#### **Écran d'accueil (HomeScreen) :**

**Header :**
- ✅ Plus grand (64px au lieu de 56px)
- ✅ Icônes plus grandes (32px)
- ✅ Mieux espacé

**Subtitle :**
- ✅ Plus grande (18px au lieu de 14px)
- ✅ Plus aérée (line-height 1.6)
- ✅ Meilleure lisibilité

**Boutons :**
- ✅ "Scanner une plaque" : 56px de hauteur (plus imposant)
- ✅ "Rechercher" : 48px (uniforme)
- ✅ "Saisie manuelle" : Style ghost (transparent, bleu)

**Plaque :**
- ✅ Moins haute (64px au lieu de 70px)
- ✅ Bandes bleues réduites (44px)
- ✅ Mieux proportionnée

**Card blanche :**
- ✅ Moins arrondie (16px au lieu de 24px)
- ✅ Padding optimisé (20px)

**InfoBox :**
- ✅ Icône plus grande (24px)
- ✅ Texte plus lisible (14px)

#### **Saisie manuelle (ManualScreen) :**

**Clique sur "Saisie manuelle" pour voir :**
- ✅ Pickers modernes avec modal bottom sheet
- ✅ Barre de recherche dans les pickers (marque/modèle)
- ✅ Icône speedometer dans le champ kilométrage
- ✅ Formulaire mieux espacé
- ✅ Header centré avec flèche retour

---

## 🧪 Checklist de test

### **Écran d'accueil**
- [ ] Le header est plus grand et mieux espacé
- [ ] Le subtitle est bien lisible (18px)
- [ ] Le bouton "Scanner" est imposant (56px)
- [ ] Le bouton "Rechercher" est bien aligné (48px)
- [ ] Le bouton "Saisie manuelle" est transparent/bleu
- [ ] La plaque est bien proportionnée
- [ ] L'InfoBox est lisible (icône 24px)

### **Saisie manuelle**
- [ ] Clique sur "Saisie manuelle"
- [ ] Le header est centré avec flèche retour
- [ ] Les pickers ouvrent un modal bottom sheet
- [ ] La recherche fonctionne dans les pickers
- [ ] Le champ kilométrage a une icône speedometer
- [ ] Le formulaire est aéré
- [ ] Le bouton "Rechercher" est uniforme (48px)

### **Recherche réelle**
- [ ] Clique "Saisie manuelle"
- [ ] Sélectionne : Peugeot > 308 > 2018 > Diesel > Manuelle > 85000 km
- [ ] Clique "Rechercher"
- [ ] Vérifie que les vraies annonces Leboncoin s'affichent
- [ ] Clique sur une annonce pour ouvrir le lien

---

## 🐛 Si problème

### **L'app crash au démarrage**
```bash
# Relance Expo en mode clean
cd ~/.openclaw/workspace/immat-scanner-plus
npx expo start --clear
```

### **Les composants ne s'affichent pas**
Vérifie que ces fichiers existent :
```bash
ls components/Button.js
ls components/Input.js
ls components/PickerV2.js
ls components/Card.js
ls theme.js
```

### **Les pickers ne s'ouvrent pas**
- Vérifie que tu utilises bien `PickerV2` (pas `Picker`)
- Recharge l'app (secoue + Reload)

### **Le backend ne répond pas**
Vérifie que le backend tourne :
```bash
# Dans un nouveau terminal
cd ~/.openclaw/workspace/immat-scanner-plus/backend
PORT=3001 node server.js
```

---

## 📸 Capture d'écran (si besoin)

Si tu veux me montrer un problème ou me faire valider visuellement :
- Prends une capture d'écran dans Expo Go
- Envoie-la moi

---

## ✅ Validation finale

**Une fois testé, dis-moi :**
- ✅ "Nickel, tout fonctionne" → Projet terminé ! 🎉
- ⚠️ "Problème sur [écran] : [description]" → Je corrige
- 🎨 "Change [élément] : [modification]" → J'ajuste le design

---

**Prêt pour le test ! Recharge l'app et explore !** 🚀
