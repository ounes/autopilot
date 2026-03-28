# 🚀 Guide Final : Déploiement TestFlight AutoPilot

## ⚠️ Prérequis
- Mac avec Xcode installé
- Compte Apple Developer actif (99$/an)
- Xcode ouvert sur le workspace du projet

---

## 📋 Procédure Complète (15-20 minutes)

### Étape 1 : Ouvrir le projet
```bash
open ~/.openclaw/workspace/immat-scanner-plus/ios/AutoPilot.xcworkspace
```

### Étape 2 : Configuration du signing (première fois uniquement)

1. **Dans Xcode, barre latérale gauche** :
   - Cliquer sur le projet "AutoPilot" (icône bleue en haut)
   
2. **Onglet "Signing & Capabilities"** :
   - Cocher "Automatically manage signing"
   - Choisir ton équipe Apple Developer dans "Team"
   - Si erreur "Bundle Identifier not available", changer :
     - `com.ouneschadli.autopilot` → `com.ouneschadli.autopilot2` (ou autre)

3. **Vérifier que "Release" est aussi configuré** :
   - En haut, sélectionner "Release" dans le menu déroulant
   - Même config de signing

### Étape 3 : Créer l'archive (build)

1. **Sélectionner la destination** :
   - En haut à gauche, menu déroulant : choisir "Any iOS Device (arm64)"
   - Ne PAS choisir un simulateur

2. **Lancer l'archive** :
   - Menu : **Product → Archive** (ou ⌥ ⌘ B)
   - Attendre ~5-10 minutes (barre de progression en haut)

### Étape 4 : Upload vers TestFlight

1. **Quand le build termine** :
   - La fenêtre "Organizer" s'ouvre automatiquement
   - Sinon : **Window → Organizer** (⌘ ⇧ 9)

2. **Dans Organizer** :
   - Sélectionner l'archive la plus récente
   - Cliquer **"Distribute App"**

3. **Assistant de distribution** :
   - Choisir : **"TestFlight & App Store"** → Next
   - Choisir : **"Upload"** → Next
   - Distribution options : laisser par défaut → Next
   - Signing : **"Automatically manage signing"** → Next
   - Review : vérifier les infos → **Upload**

4. **Attendre l'upload** (~2-5 minutes selon connexion)

### Étape 5 : Finaliser dans App Store Connect

1. **Aller sur** [appstoreconnect.apple.com](https://appstoreconnect.apple.com)

2. **Si l'app n'existe pas encore** :
   - Cliquer "+" → "Nouvelle app"
   - Plateformes : iOS
   - Nom : AutoPilot
   - Bundle ID : `com.ouneschadli.autopilot` (celui choisi dans Xcode)
   - SKU : `autopilot-001` (unique)
   - Accès complet

3. **Aller dans "TestFlight"** :
   - Le build apparaît dans "Traitement" (~10-15 minutes)
   - Quand statut = "Prêt à tester" :
     - Onglet "Testeurs externes" → "+" → Ajouter des testeurs
     - Entrer emails → Envoyer invitations
   - Les testeurs reçoivent un email avec lien TestFlight

---

## 🤖 Pour les prochains déploiements (automatisé)

Une fois le premier build manuel fait, utiliser le script :

```bash
cd ~/.openclaw/workspace/immat-scanner-plus

# Configurer les secrets (une seule fois)
cp .env.example .env
nano .env  # Ajouter ton mot de passe d'app Apple

# Déployer automatiquement
./deploy-testflight.sh
```

**Ou manuellement avec Fastlane** :
```bash
/opt/homebrew/opt/ruby@3.3/bin/bundle exec fastlane ios beta
```

---

## 🐛 Problèmes courants

### "No matching provisioning profiles found"
→ Xcode → Settings → Accounts → Download Manual Profiles

### "iOS XX.X is not installed"
→ Xcode → Settings → Components → Télécharger la plateforme iOS

### "Bundle Identifier is not available"
→ Changer le Bundle ID dans Xcode (doit être unique)

### Build échoue avec erreur signing
→ Vérifier que le compte Apple Developer est actif (99$/an payé)

---

## 📱 Tester l'app

1. **Installer TestFlight** depuis l'App Store (sur iPhone)
2. **Ouvrir l'email d'invitation** reçu
3. **Cliquer "View in TestFlight"**
4. **Installer l'app** depuis TestFlight
5. **Tester et envoyer feedback** (optionnel)

---

## ✅ Checklist finale

- [ ] Xcode ouvert sur le workspace
- [ ] "Any iOS Device" sélectionné
- [ ] Signing configuré (Team sélectionnée)
- [ ] Product → Archive lancé
- [ ] Archive uploadée vers App Store Connect
- [ ] App créée dans App Store Connect (si première fois)
- [ ] Testeurs ajoutés dans TestFlight
- [ ] App testée sur un vrai device

---

**Durée totale** : ~20-30 minutes pour le premier déploiement
**Prochains déploiements** : ~5 minutes avec `./deploy-testflight.sh`
