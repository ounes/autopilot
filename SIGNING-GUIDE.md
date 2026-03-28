# Guide Signing Manuel - AutoPilot iOS

## ✅ Certificat Apple Distribution

### 1. Créer le certificat (si pas déjà fait)
1. https://developer.apple.com/account/resources/certificates/add
2. Sélectionner **Apple Distribution**
3. Uploader le CSR : `~/Documents/certificats/CertificateSigningRequest.certSigningRequest`
4. Télécharger le `.cer`
5. Double-clic pour installer dans Keychain Access

### 2. Exporter en .p12
1. Ouvrir **Keychain Access**
2. Catégorie **Mes certificats**
3. Chercher **Apple Distribution: Ounes Chadli (2T2SB8U85C)**
4. Clic droit → **Exporter "Apple Distribution..."**
5. Format : **Personal Information Exchange (.p12)**
6. Sauvegarder avec un **mot de passe fort** (le noter !)
7. Confirmer avec le mot de passe admin du Mac

### 3. Convertir en base64
```bash
base64 -i /path/to/certificate.p12 | pbcopy
# Copié dans le presse-papier → prêt pour GitHub Secret CERTIFICATE_BASE64
```

---

## 🔑 Provisioning Profile App Store

### 1. Créer le profile
1. https://developer.apple.com/account/resources/profiles/add
2. Sélectionner **App Store Connect**
3. App ID : `com.ouneschadli.autopilot` (AutoPilot)
4. Certificat : **Apple Distribution: Ounes Chadli**
5. Profile Name : `AutoPilot App Store`
6. Télécharger le `.mobileprovision`

### 2. Convertir en base64
```bash
base64 -i ~/Downloads/AutoPilot_App_Store.mobileprovision | pbcopy
# Copié dans le presse-papier → prêt pour GitHub Secret PROVISIONING_PROFILE_BASE64
```

---

## 🔐 Secrets GitHub à configurer

**Repo** : https://github.com/ounes/autopilot/settings/secrets/actions

| Secret Name | Valeur | Source |
|------------|--------|--------|
| `CERTIFICATE_BASE64` | Base64 du .p12 | Étape 2 ci-dessus |
| `CERTIFICATE_PASSWORD` | Mot de passe du .p12 | Celui choisi à l'export |
| `PROVISIONING_PROFILE_BASE64` | Base64 du .mobileprovision | Étape provisioning profile |
| `APPLE_TEAM_ID` | `2T2SB8U85C` | Déjà configuré ✅ |
| `FASTLANE_USER` | `ounes.chadli@gmail.com` | Déjà configuré ✅ |
| `FASTLANE_PASSWORD` | App-specific password | Déjà configuré ✅ |

---

## 🚀 Workflow GitHub Actions

Le workflow `.github/workflows/testflight.yml` va :
1. Décoder le certificat base64 → .p12
2. Décoder le provisioning profile base64 → .mobileprovision
3. Créer un keychain temporaire
4. Importer le certificat
5. Installer le provisioning profile
6. Builder l'app avec signing manuel
7. Uploader sur TestFlight

**Déclenchement** : Push sur `main` ou manuel via Actions tab.

---

## 📝 Commandes utiles

Vérifier les certificats installés :
```bash
security find-identity -v -p codesigning
```

Lister les provisioning profiles :
```bash
ls -la ~/Library/MobileDevice/Provisioning\ Profiles/
```

Inspecter un provisioning profile :
```bash
security cms -D -i ~/Downloads/AutoPilot_App_Store.mobileprovision
```
