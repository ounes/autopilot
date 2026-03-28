# Guide : Build Manuel iOS + Upload TestFlight (Xcode GUI)

## Pourquoi manuel ?

GitHub Actions ne peut pas faire du signing automatique sans compte Apple connecté.
Le signing manuel avec certificats dans secrets est complexe (fastlane match, etc.).

**Solution la plus simple** : Builder localement avec Xcode, uploader avec Transporter.

## Prérequis

1. ✅ Xcode 15+ installé
2. ✅ Compte Apple Developer (Team ID : `2T2SB8U85C`)
3. ✅ App créée dans App Store Connect (Bundle ID : `com.ouneschadli.autopilot`)

## Étapes

### 1. Ouvrir le projet dans Xcode

```bash
cd ~/.openclaw/workspace/immat-scanner-plus
open ios/AutoPilot.xcworkspace
```

**⚠️ Important** : Ouvrir `.xcworkspace`, PAS `.xcodeproj` !

### 2. Configurer le signing

1. Sélectionner le projet **AutoPilot** dans le navigateur (panneau gauche)
2. Sélectionner la cible **AutoPilot** (sous TARGETS)
3. Onglet **Signing & Capabilities**
4. Cocher **Automatically manage signing**
5. Sélectionner ton **Team** (Ounes Chadli - 2T2SB8U85C)
6. Vérifier que **Bundle Identifier** = `com.ouneschadli.autopilot`

Xcode va automatiquement :
- Créer un certificat de distribution (si besoin)
- Générer un provisioning profile
- Tout configurer pour toi

### 3. Archiver l'app

1. Menu **Product** → **Destination** → **Any iOS Device (arm64)**
2. Menu **Product** → **Archive** (ou Cmd+Shift+B)
3. Attendre la compilation (~5-10 min)
4. Une fois terminé, l'Organizer s'ouvre automatiquement

### 4. Exporter l'archive

Dans l'Organizer :

1. Sélectionner l'archive que tu viens de créer
2. Clic **Distribute App**
3. Choisir **App Store Connect**
4. Clic **Next**
5. Choisir **Upload**
6. Clic **Next**
7. Laisser les options par défaut (Automatically manage signing)
8. Clic **Upload**
9. Attendre l'upload (~2-5 min)

### 5. Créer l'app dans App Store Connect (si première fois)

1. Aller sur https://appstoreconnect.apple.com
2. **Apps** → **+** → **Nouvelle app**
3. Remplir :
   - **Nom** : AutoPilot (ou "Immat Scanner Plus")
   - **Langue principale** : Français
   - **Bundle ID** : `com.ouneschadli.autopilot`
   - **SKU** : `autopilot-001` (n'importe quoi, unique)
   - **Accès complet** : oui
4. Cliquer **Créer**

### 6. Inviter des testeurs TestFlight

1. Dans App Store Connect → **AutoPilot** → **TestFlight**
2. Attendre que le build apparaisse (~10-20 min après upload)
3. Ajouter des **testeurs internes** :
   - Onglet **Testeurs internes**
   - **+** → Ajouter ton email
4. Ou ajouter des **testeurs externes** :
   - Onglet **Testeurs externes**
   - Créer un groupe
   - Ajouter des testeurs par email
   - Apple review requis (1-2 jours)

### 7. Télécharger TestFlight sur iPhone

1. Installer **TestFlight** depuis l'App Store
2. Se connecter avec le même Apple ID
3. L'app **AutoPilot** apparaît automatiquement
4. Clic **Installer**

## Prochains builds

Pour les mises à jour :

1. Incrémenter la version dans `app.json` :
   ```json
   "version": "1.0.1",  // ou "1.0.2", etc.
   ```
2. Régénérer le projet iOS :
   ```bash
   npx expo prebuild --platform ios --clean
   ```
3. Répéter les étapes 1-4 ci-dessus

## Automatisation future (optionnel)

Si tu veux automatiser via GitHub Actions après :

1. Créer un certificat Apple Distribution (Keychain Access)
2. Créer un provisioning profile App Store
3. Les exporter en base64 et ajouter dans secrets GitHub
4. Configurer le workflow pour signing manuel

**Mais honnêtement** : build manuel Xcode = 5 min, setup GitHub Actions signing = 2-3 heures. 
À toi de voir si ça vaut le coup !

## Dépannage

### Erreur "No signing certificate"

1. Menu **Xcode** → **Settings...** (ou Cmd+,)
2. Onglet **Accounts**
3. Vérifier que ton Apple ID est connecté
4. Clic sur ton compte → **Manage Certificates...**
5. **+** → **Apple Distribution** (si absent)

### Erreur "Provisioning profile expired"

1. Retour à **Signing & Capabilities**
2. Décocher **Automatically manage signing**
3. Recocher **Automatically manage signing**
4. Xcode va régénérer le profil

### Build réussit mais upload échoue

Utiliser **Transporter.app** (installé avec Xcode) :

1. Ouvrir **Transporter** (Spotlight → "Transporter")
2. Se connecter avec Apple ID
3. Glisser-déposer le fichier `.ipa` (dans `~/Library/Developer/Xcode/Archives/...`)
4. Clic **Deliver**

---

**Temps total estimé** : 15-20 minutes (première fois), 5 minutes (mises à jour)
