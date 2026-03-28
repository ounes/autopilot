# 🎨 Audit UX/UI — Immat Scanner Plus

## 📸 Analyse des screenshots actuels

### **Screenshot 1 : HomeScreen (Accueil)**

#### ❌ **Problèmes identifiés :**

1. **Header (barre du haut)**
   - Icône voiture + "Immat Scanner" : espacement trop serré (8px?)
   - Icône hamburger trop petite et mal alignée
   - Hauteur header inadaptée (trop compressée)

2. **Subtitle**
   - Texte trop petit (13-14px?)
   - Line-height insuffisant → lignes collées
   - Manque d'air autour (padding top/bottom trop faible)

3. **Card principale (plaque + boutons)**
   - Border-radius trop grand (24px?) → perd l'espace utile
   - Padding intérieur excessif (24px?) → gaspille l'écran
   - Bouton "Scanner une plaque" : icône caméra trop grande vs texte
   - Texte "OU ENTREZ LA PLAQUE" : trop petit et peu lisible

4. **Plaque d'immatriculation**
   - Bande bleue gauche/droite : largeur inconsistante (50px?)
   - Étoiles européennes : taille trop petite, mal espacées
   - Input plaque : police trop grande (32px?) vs placeholder
   - Hauteur plaque (70px) disproportionnée

5. **Bouton "Rechercher"**
   - Padding vertical insuffisant (18px?) → paraît écrasé
   - Icône loupe mal alignée avec le texte
   - Border-radius trop grand (16px?)

6. **Lien "Ou saisir les infos manuellement"**
   - Texte trop petit (14px?)
   - Underline trop appuyée
   - Manque de padding top (16px?)

7. **InfoBox (pseudo attribué)**
   - Icône information trop petite (20px?)
   - Texte trop petit (13px?)
   - Line-height insuffisant
   - Padding intérieur mal équilibré

8. **Bottom navigation**
   - Icônes trop petites
   - Labels trop petits (10px?)
   - Espacement vertical insuffisant

---

### **Screenshot 2 : ManualScreen (Saisie manuelle)**

#### ❌ **Problèmes identifiés :**

1. **Header**
   - Flèche retour trop petite (24px?)
   - Titre "Saisie manuelle" pas centré
   - Hauteur header inadaptée

2. **Formulaire (card blanche)**
   - Border-radius excessif (24px?) → coins arrondis coupent le contenu
   - Padding intérieur trop grand (24px?) → gaspille l'espace vertical
   - Marges entre champs incohérentes (16px partout?)

3. **Labels des champs**
   - Taille trop petite (14px?)
   - Poids trop léger (600?) → manque d'autorité
   - Couleur grise trop claire (#475569) → faible contraste

4. **Champs de saisie (Picker + Input)**
   - Background gris trop clair (#F1F5F9) → manque de contraste
   - Padding intérieur insuffisant (16px?) → texte collé aux bords
   - Border-radius trop grand (12px?)
   - Chevron dropdown trop petit (20px?)
   - Texte placeholder vs valeur sélectionnée : même couleur?

5. **Champ kilométrage**
   - Taille de police trop petite (16px?)
   - Même problème de padding/background que les pickers

6. **Bouton "Rechercher"**
   - Même problème qu'écran 1 : padding vertical insuffisant
   - Trop près du dernier champ (20px?)
   - Largeur pleine écran mais semble écrasé

7. **Espacement global**
   - Pas de respiration entre les sections
   - Formulaire trop rempli verticalement → scroll pénible
   - Manque de hiérarchie visuelle

8. **Bottom navigation**
   - Mêmes problèmes qu'écran 1

---

## 🎯 Problèmes récurrents (toute l'app)

### **1. Typographie**
- ❌ Tailles incohérentes (trop petites en général)
- ❌ Line-height insuffisants (texte compressé)
- ❌ Poids de police inadaptés (manque de hiérarchie)
- ❌ Contrastes faibles (gris trop clairs)

### **2. Espacements**
- ❌ Padding intérieur trop grands (cards) ou trop petits (champs)
- ❌ Marges entre éléments incohérentes
- ❌ Manque d'air vertical entre sections
- ❌ Touch targets trop petits (<44px)

### **3. Border-radius**
- ❌ Trop grands partout (12px, 16px, 24px)
- ❌ Inconsistants entre composants

### **4. Couleurs**
- ❌ Gris de fond trop clair (#F1F5F9) → manque de contraste
- ❌ Bleu primaire OK (#2563EB) mais mal utilisé
- ❌ Gris texte labels trop clair (#475569)

### **5. Composants**
- ❌ Icônes trop petites (20px) vs recommandé 24px minimum
- ❌ Boutons écrasés verticalement
- ❌ Cards surdimensionnées (border-radius + padding excessifs)

---

## ✅ Guidelines modernes à appliquer

### **Typographie (iOS/Android 2026)**

| Élément | iOS (pt) | Android (sp) | React Native (px) |
|---------|----------|--------------|-------------------|
| Hero Title | 34 | 28 | 32 |
| Screen Title | 28 | 24 | 26 |
| Section Header | 20 | 18 | 20 |
| Body Large | 17 | 16 | 17 |
| Body | 15 | 14 | 15 |
| Caption | 13 | 12 | 13 |
| Button Text | 16 | 14 | 16 |

**Line-height recommandé : 1.4-1.6 pour body text**

### **Espacements (8pt grid system)**

| Usage | Value |
|-------|-------|
| Micro spacing | 4px |
| Tight spacing | 8px |
| Default spacing | 16px |
| Section spacing | 24px |
| Large spacing | 32px |
| Screen padding | 20px (mobile), 24px (tablet) |

### **Touch targets (WCAG 2.1)**

| Position | Minimum Size |
|----------|-------------|
| Top screen | 44×44px (iOS), 48×48px (Android) |
| Middle screen | 44×44px (iOS), 48×48px (Android) |
| Bottom screen | 48×48px (iOS), 56×56px (Android) |

### **Border-radius moderne**

| Composant | Radius |
|-----------|--------|
| Small (chips, pills) | 8px |
| Medium (buttons, inputs) | 12px |
| Large (cards) | 16px |
| Extra-large (modals) | 20px |

### **Contrastes (WCAG AA)**

| Usage | Ratio |
|-------|-------|
| Normal text | 4.5:1 minimum |
| Large text (18pt+) | 3:1 minimum |
| UI components | 3:1 minimum |

---

## 🎨 Design System proposé

### **Palette couleurs (moderne, accessible)**

```javascript
const colors = {
  // Primaires
  primary: '#1D4ED8',        // Bleu plus foncé (contraste amélioré)
  primaryLight: '#3B82F6',   // Bleu clair
  primaryDark: '#1E40AF',    // Bleu très foncé
  
  // Neutrals (échelle plus contrastée)
  gray900: '#0F172A',        // Texte principal
  gray800: '#1E293B',        // Texte secondaire
  gray700: '#334155',        // Labels
  gray600: '#475569',        // Disabled text
  gray500: '#64748B',        // Placeholders
  gray400: '#94A3B8',        // Borders light
  gray300: '#CBD5E1',        // Borders
  gray200: '#E2E8F0',        // Backgrounds light
  gray100: '#F1F5F9',        // Backgrounds
  gray50: '#F8FAFC',         // Backgrounds extra light
  
  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Backgrounds
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F8FAFC',
  bgDark: '#0F172A',
}
```

### **Typographie scale**

```javascript
const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
}
```

### **Spacing scale (8pt grid)**

```javascript
const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
}
```

### **Components sizes**

```javascript
const components = {
  button: {
    padding: { vertical: 14, horizontal: 24 },
    borderRadius: 12,
    minHeight: 48,
  },
  input: {
    padding: { vertical: 14, horizontal: 16 },
    borderRadius: 12,
    minHeight: 48,
  },
  card: {
    padding: 20,
    borderRadius: 16,
  },
  icon: {
    sm: 20,
    md: 24,
    lg: 32,
  },
}
```

---

## 🚀 Prochaines étapes

1. **Créer le Design System complet** (fichier theme.js)
2. **Refaire les composants** avec les nouvelles guidelines
3. **Audit écran par écran** avec corrections
4. **Créer des maquettes Stitch** pour validation visuelle
5. **Implémenter les changements** dans le code

Veux-tu que je génère :
1. Le fichier `theme.js` complet ?
2. Les composants refaits (Button, Input, Card, Picker) ?
3. Les maquettes visuelles avec Google Stitch ?

Dis-moi par où commencer ! 🎯
