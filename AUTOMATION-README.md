# 🚀 Automatisation Complète iOS TestFlight

## TL;DR — Démarrage Rapide

**Tu dois faire ça UNE SEULE FOIS** (15-20 min sur ton Mac) :

```bash
cd ~/.openclaw/workspace/immat-scanner-plus
./setup-signing.sh
```

Le script va te guider pour :
1. Créer le certificat Apple Distribution
2. Créer le provisioning profile App Store  
3. Générer les secrets GitHub en base64
4. Te dire où les coller sur GitHub

**Ensuite, TOUS les builds seront 100% automatiques** via GitHub Actions.

---

## 📋 Prérequis (une seule fois)

- ✅ Mac avec Xcode installé
- ✅ Compte Apple Developer actif  
- ✅ Accès admin au repo GitHub

---

## 🔄 Workflow Automatisé (après setup)

### Déployer une nouvelle version

1. **Modifier la version** dans `app.json` :
   ```json
   "version": "1.0.1"  // Incrémenter
   ```

2. **Commit + Push** :
   ```bash
   git add .
   git commit -m "feat: nouvelle feature XYZ"
   git push origin main
   ```

3. **GitHub Actions build automatiquement** 🎉
   - Compile l'app iOS
   - Signe avec le certificat
   - Upload sur TestFlight
   - Temps total : ~10-15 min

4. **Ou lancer manuellement** :
   https://github.com/ounes/autopilot/actions/workflows/testflight.yml
   → Clic **Run workflow**

---

## ✅ Après le premier setup

**Plus AUCUNE action manuelle nécessaire !**

- Chaque push sur `main` → Build + TestFlight automatique
- Les testeurs reçoivent la notif TestFlight
- Workflow réutilisable pour tous tes projets iOS

---

## 🛠️ Setup Initial (UNE SEULE FOIS)

### Étape 1 : Créer les certificats

```bash
cd ~/.openclaw/workspace/immat-scanner-plus
./setup-signing.sh
```

Suis les instructions du script.

### Étape 2 : Ajouter les secrets GitHub

Le script génère un fichier `github-secrets.txt` avec tous les secrets à copier.

Va sur https://github.com/ounes/autopilot/settings/secrets/actions et ajoute :

| Secret | Où le trouver |
|--------|---------------|
| `CERTIFICATE_BASE64` | Dans `github-secrets.txt` |
| `CERTIFICATE_PASSWORD` | Dans `github-secrets.txt` |
| `PROVISIONING_PROFILE_BASE64` | Dans `github-secrets.txt` |
| `APPLE_TEAM_ID` | Déjà configuré (`2T2SB8U85C`) |
| `FASTLANE_USER` | Déjà configuré (`ounes.chadli@gmail.com`) |
| `FASTLANE_PASSWORD` | Déjà configuré (app-specific password) |

### Étape 3 : Commit + Push

```bash
git add .github/workflows/testflight.yml
git commit -m "chore: configure manual signing for GitHub Actions"
git push origin main
```

### Étape 4 : Premier build

https://github.com/ounes/autopilot/actions/workflows/testflight.yml

Clic **Run workflow** → Attends 10-15 min → ✅ App sur TestFlight !

---

## 🔒 Sécurité

- **NE JAMAIS committer** les fichiers `.p12` ou `.mobileprovision`
- **Supprimer** `github-secrets.txt` après config :
  ```bash
  rm ~/.autopilot-signing-setup/github-secrets.txt
  rm -rf ~/.autopilot-signing-setup
  ```
- Les secrets GitHub sont chiffrés et inaccessibles aux workflows externes

---

## 🐛 Dépannage

### Build échoue avec "No signing identity"

→ Vérifier que `CERTIFICATE_BASE64` et `CERTIFICATE_PASSWORD` sont bien dans GitHub Secrets.

### Build échoue avec "No provisioning profile"

→ Vérifier que `PROVISIONING_PROFILE_BASE64` est bien dans GitHub Secrets.

### Certificat expiré (après 1 an)

1. Télécharger le nouveau certificat depuis https://developer.apple.com/account
2. Exporter + convertir en base64
3. Mettre à jour `CERTIFICATE_BASE64` dans GitHub Secrets

---

## 🎯 Alternative : Xcode Cloud

Si tu veux **zéro config manuelle** (mais payant après quota gratuit) :

1. Aller dans Xcode → Product → Xcode Cloud → Create Workflow
2. Choisir "App Store" distribution
3. Xcode Cloud gère tout le signing automatiquement
4. Gratuit jusqu'à 25h/mois, puis 15€/mois

**GitHub Actions** = gratuit illimité pour repos publics, certificat à configurer une fois.

**Xcode Cloud** = setup en 2 clics, mais payant après quota.

---

## 📚 Docs

- Guide complet : `SETUP-SIGNING.md`
- Build manuel (fallback) : `BUILD-MANUAL-XCODE.md`
- Déploiement technique : `DEPLOYMENT.md`
