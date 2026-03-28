# Configuration Signing Manuel iOS pour GitHub Actions

## Objectif
Automatiser le build TestFlight via GitHub Actions avec signing manuel (certificat + provisioning profile).

---

## ⚠️ Prérequis

1. **Mac avec Xcode installé** (pour créer le certificat)
2. **Compte Apple Developer** actif
3. **Accès admin au repo GitHub** (pour ajouter secrets)

---

## 📝 Étape 1 : Créer le certificat Apple Distribution

### 1.1 Créer un Certificate Signing Request (CSR)

Sur ton Mac :

1. Ouvrir **Keychain Access** (Spotlight → "Keychain Access")
2. Menu **Keychain Access** → **Certificate Assistant** → **Request a Certificate from a Certificate Authority...**
3. Remplir :
   - **User Email Address** : `ounes.chadli@gmail.com`
   - **Common Name** : `Ounes Chadli iOS Distribution`
   - **CA Email Address** : Laisser vide
   - **Request is** : ✅ **Saved to disk**
4. Cliquer **Continue** → Sauvegarder `CertificateSigningRequest.certSigningRequest`

### 1.2 Créer le certificat sur Apple Developer

1. Aller sur https://developer.apple.com/account/resources/certificates/list
2. Cliquer **+** (Add)
3. Choisir **Apple Distribution** (sous "Software")
4. Cliquer **Continue**
5. Uploader le fichier `CertificateSigningRequest.certSigningRequest`
6. Cliquer **Continue** → **Download**
7. Double-cliquer le fichier `.cer` téléchargé → S'installe dans Keychain

### 1.3 Exporter le certificat + clé privée

Dans **Keychain Access** :

1. Catégorie **My Certificates** (panneau gauche)
2. Trouver **Apple Distribution: Ounes Chadli (2T2SB8U85C)**
3. **Clic droit** → **Export "Apple Distribution: Ounes Chadli..."**
4. Format : **Personal Information Exchange (.p12)**
5. Sauvegarder comme `ios_distribution.p12`
6. **Mot de passe** : Choisir un mot de passe fort (ex: `AutoPilot2026!`)
   - ⚠️ **Mémoriser ce mot de passe** (sera dans GitHub Secrets)

### 1.4 Convertir le certificat en base64

```bash
base64 -i ~/Downloads/ios_distribution.p12 | pbcopy
```

Le certificat base64 est maintenant dans ton presse-papiers.

**Sauvegarde temporaire** :
```bash
echo "CERTIFICATE_BASE64: (dans presse-papiers)" > ~/cert-secret.txt
echo "CERTIFICATE_PASSWORD: AutoPilot2026!" >> ~/cert-secret.txt
```

---

## 📱 Étape 2 : Créer le Provisioning Profile

### 2.1 Créer l'App ID (si pas déjà fait)

1. Aller sur https://developer.apple.com/account/resources/identifiers/list
2. Si `com.ouneschadli.autopilot` n'existe pas :
   - Cliquer **+** → **App IDs** → **Continue**
   - **Description** : AutoPilot
   - **Bundle ID** : Explicit → `com.ouneschadli.autopilot`
   - **Capabilities** : Laisser par défaut
   - **Continue** → **Register**

### 2.2 Créer le Provisioning Profile App Store

1. Aller sur https://developer.apple.com/account/resources/profiles/list
2. Cliquer **+** (Add)
3. Choisir **App Store** (sous "Distribution")
4. Cliquer **Continue**
5. **App ID** : Choisir `com.ouneschadli.autopilot`
6. Cliquer **Continue**
7. **Certificates** : Cocher le certificat **Apple Distribution: Ounes Chadli**
8. Cliquer **Continue**
9. **Provisioning Profile Name** : `AutoPilot App Store`
10. Cliquer **Generate** → **Download**

### 2.3 Convertir le Provisioning Profile en base64

```bash
base64 -i ~/Downloads/AutoPilot_App_Store.mobileprovision | pbcopy
```

Le profil base64 est maintenant dans ton presse-papiers.

**Sauvegarde temporaire** :
```bash
echo "PROVISIONING_PROFILE_BASE64: (dans presse-papiers)" >> ~/cert-secret.txt
```

---

## 🔑 Étape 3 : Ajouter les secrets GitHub

### 3.1 Aller sur GitHub Secrets

https://github.com/ounes/autopilot/settings/secrets/actions

### 3.2 Ajouter les secrets

| Nom du secret | Valeur | Source |
|---------------|--------|--------|
| `CERTIFICATE_BASE64` | `(base64 du fichier .p12)` | Étape 1.4 |
| `CERTIFICATE_PASSWORD` | `AutoPilot2026!` | Mot de passe choisi à l'étape 1.3 |
| `PROVISIONING_PROFILE_BASE64` | `(base64 du .mobileprovision)` | Étape 2.3 |
| `APPLE_TEAM_ID` | `2T2SB8U85C` | **Déjà configuré** |
| `FASTLANE_USER` | `ounes.chadli@gmail.com` | **Déjà configuré** |
| `FASTLANE_PASSWORD` | `(app-specific password)` | **Déjà configuré** |

**Pour ajouter chaque secret** :
1. Cliquer **New repository secret**
2. **Name** : Nom du secret (ex: `CERTIFICATE_BASE64`)
3. **Secret** : Coller la valeur
4. Cliquer **Add secret**

---

## 🛠️ Étape 4 : Modifier le workflow GitHub Actions

Le workflow sera mis à jour automatiquement pour utiliser le signing manuel.

Changements nécessaires :
1. Installer le certificat + provisioning profile au début du workflow
2. Retirer `-allowProvisioningUpdates` (plus nécessaire)
3. Spécifier explicitement `CODE_SIGN_IDENTITY` et `PROVISIONING_PROFILE_SPECIFIER`
4. Ajouter `CODE_SIGN_STYLE=Manual`

---

## ✅ Vérification finale

Après configuration :

1. Déclencher le workflow manuellement :
   ```
   https://github.com/ounes/autopilot/actions/workflows/testflight.yml
   ```
2. Cliquer **Run workflow** → **Run workflow**
3. Attendre ~10-15 min
4. ✅ Build réussi → App uploadée sur TestFlight
5. ❌ Échec → Analyser les logs et ajuster

---

## 🔒 Sécurité

- **NE JAMAIS committer** les fichiers `.p12` ou `.mobileprovision`
- **NE JAMAIS pusher** le fichier `~/cert-secret.txt` (supprimer après config)
- Les secrets GitHub sont chiffrés et accessibles uniquement aux workflows

---

## 📚 Références

- [Apple Developer Certificates](https://developer.apple.com/account/resources/certificates/list)
- [Apple Developer Profiles](https://developer.apple.com/account/resources/profiles/list)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Xcode Manual Signing](https://developer.apple.com/documentation/xcode/preparing-your-app-for-distribution)
