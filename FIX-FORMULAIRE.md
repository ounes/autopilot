# 🔧 Corrections formulaire Manuel

## ❌ Problème identifié
- Labels invisibles (blancs sur fond blanc)
- Pas de padding dans la card du formulaire
- Formulaire illisible

## ✅ Corrections appliquées

### **1. Labels PickerV2 — Visibles**
- Couleur forcée : `theme.colors.text.primary` (#0F172A)
- Font-size : `theme.typography.fontSize.sm` (14px)
- Font-weight : `semibold`
- Margin-bottom : `theme.spacing[2]` (8px)

### **2. Labels Input — Visibles**
- Même correction que PickerV2
- Label "Kilométrage (optionnel)" maintenant visible

### **3. Card formulaire — Padding ajouté**
- `padding: theme.spacing[5]` (20px)
- Espace autour de tous les champs du formulaire

---

## 🧪 Teste maintenant

**Recharge Expo Go** (secoue → Reload)

**Puis vérifie :**
1. ✅ Clique "Saisie manuelle"
2. ✅ Les labels "Marque *", "Modèle *", "Année *" sont VISIBLES en noir
3. ✅ Le formulaire a un padding blanc autour
4. ✅ Tous les champs sont espacés correctement

---

## 📁 Fichiers modifiés

### **PickerV2.js**
```javascript
label: {
  fontSize: theme.typography.fontSize.sm,  // 14px
  fontWeight: theme.typography.fontWeight.semibold,
  color: theme.colors.text.primary,  // #0F172A (noir)
  marginBottom: theme.spacing[2],
}
```

### **Input.js**
```javascript
label: {
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.semibold,
  color: theme.colors.text.primary,
  marginBottom: theme.spacing[2],
}
```

### **HomeScreen.js**
```javascript
formCard: {
  marginTop: theme.spacing[5],
  padding: theme.spacing[5],  // 20px (NOUVEAU)
}
```

---

**Recharge l'app ! Le formulaire devrait maintenant être lisible !** 🚀
