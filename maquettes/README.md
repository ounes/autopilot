# 🎨 Maquettes UI/UX — Immat Scanner Plus

## 📂 Fichiers disponibles

1. **`index.html`** - Comparaison côte à côte AVANT vs APRÈS
2. **`homescreen-avant.html`** - Version actuelle (avec problèmes)
3. **`homescreen-apres.html`** - Version refonte (Design System)

---

## 🚀 Comment visualiser

### **Option 1 : Ouvrir directement dans le navigateur**
```bash
# Depuis le dossier du projet
open ~/.openclaw/workspace/immat-scanner-plus/maquettes/index.html
```

### **Option 2 : Serveur local (recommandé)**
```bash
cd ~/.openclaw/workspace/immat-scanner-plus/maquettes
python3 -m http.server 8000
```

Puis ouvre : **http://localhost:8000**

---

## 📊 Comparaison AVANT vs APRÈS

### **Page principale : `index.html`**
- Affiche les 2 versions côte à côte
- Liste des 8 améliorations majeures
- Bouton de validation

### **Changements visibles :**

| Élément | AVANT | APRÈS | Amélioration |
|---------|-------|-------|--------------|
| **Header** | 56px | 64px | +14% |
| **Icônes header** | 28px | 32px | +14% |
| **Subtitle** | 14px | 18px | +29% |
| **Subtitle line-height** | 1.2 | 1.6 | +33% |
| **Plaque hauteur** | 70px | 64px | -9% |
| **Plaque bandes** | 50px | 44px | -12% |
| **Bouton Scanner** | 48px | 56px | +17% |
| **Card border-radius** | 24px | 16px | -33% |
| **Card padding** | 24px | 20px | -17% |
| **InfoBox icône** | 20px | 24px | +20% |
| **InfoBox texte** | 13px | 14px | +8% |
| **Bottom nav** | 56px | 64px | +14% |
| **Nav icônes** | 20px | 24px | +20% |
| **Nav labels** | 10px | 11px | +10% |

---

## ✅ Validation

Une fois les maquettes visualisées, réponds :

### **Si tu valides :**
> "OK, implémente"

→ Je modifie tous les écrans avec le nouveau Design System (2-3h)

### **Si tu veux des ajustements :**
> "Change [élément] : [modification souhaitée]"

Exemple :
- "Change la couleur du bouton principal en plus foncé"
- "Garde le border-radius à 20px au lieu de 16px"
- "Agrandis encore la subtitle à 20px"

### **Si tu veux voir d'autres écrans :**
> "Montre-moi le ManualScreen"

→ Je génère les maquettes du formulaire de saisie manuelle

---

## 🎯 Prochaines étapes

1. ✅ **Validation visuelle** (toi)
2. ⚠️ **Ajustements** si nécessaire (moi)
3. 🚀 **Implémentation complète** (moi, 2-3h)
4. ✅ **Test dans Expo Go** (toi)
5. 🎉 **Livraison finale**

---

## 📝 Notes techniques

### **Design System appliqué :**
- Couleurs : Palette 50-900 (WCAG AA compliant)
- Typographie : Scale 12-36px (mobile-first)
- Espacements : 8pt grid (4, 8, 16, 24, 32px)
- Border-radius : 8, 12, 16, 20px (cohérents)
- Touch targets : Minimum 44×44px (iOS/Android standards)

### **Guidelines respectées :**
- ✅ iOS Human Interface Guidelines (iOS 17)
- ✅ Material Design 3 (Android)
- ✅ WCAG 2.1 AA (accessibilité)

---

**Prêt pour validation !** 🚀

Ouvre `index.html` et dis-moi ce que tu en penses ! 👀
