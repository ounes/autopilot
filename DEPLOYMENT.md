# 📱 Déploiement automatique sur TestFlight

## Configuration initiale (à faire une seule fois)

### 1. Récupérer les IDs Apple
- Va sur [developer.apple.com/account](https://developer.apple.com/account)
- Note ton **Team ID** (Membership)
- Décommente et remplis les Team IDs dans `fastlane/Appfile`

### 2. Créer un mot de passe d'application
- Va sur [appleid.apple.com](https://appleid.apple.com)
- Sécurité → Mots de passe d'app → "Générer un mot de passe"
- Copie `.env.example` vers `.env` et ajoute le mot de passe

```bash
cp .env.example .env
# Édite .env et remplace xxxx-xxxx-xxxx-xxxx par ton mot de passe
```

### 3. Installer les dépendances
```bash
/opt/homebrew/opt/ruby/bin/bundle install
```

---

## 🚀 Déploiement sur TestFlight

### Méthode 1 : Script automatique (recommandé)
```bash
./deploy-testflight.sh
```

### Méthode 2 : Fastlane directement
```bash
bundle exec fastlane ios beta
```

### Méthode 3 : Build seulement (sans upload)
```bash
bundle exec fastlane ios build
```

Puis upload manuel :
```bash
bundle exec fastlane ios upload
```

---

## 📋 Commandes disponibles

| Commande | Description |
|----------|-------------|
| `fastlane ios beta` | Build + Upload TestFlight (auto) |
| `fastlane ios build` | Build uniquement (.ipa créé) |
| `fastlane ios upload` | Upload .ipa existant |
| `fastlane ios release` | Soumission App Store |
| `fastlane ios screenshots` | Génère screenshots automatiques |

---

## ⚙️ Workflow complet

1. **Modifications du code**
2. **Commit Git** (Fastlane vérifie que tout est commit)
3. **Lancer** `./deploy-testflight.sh`
4. **Attendre** ~5-10 min (build + upload)
5. **Vérifier** sur [App Store Connect](https://appstoreconnect.apple.com)
6. **L'app apparaît dans TestFlight** ~10-15 min après upload

---

## 🔧 Troubleshooting

### Erreur : "No such file or directory - xcrun"
```bash
sudo xcode-select --switch /Applications/Xcode.app
```

### Erreur : "Could not find a matching code signing identity"
- Ouvre Xcode
- Va dans Preferences → Accounts
- Télécharge les certificats manuellement

### Erreur : "Specified login does not belong to a team"
- Vérifie que ton Team ID est correct dans `Appfile`
- Ou laisse vide, Fastlane demandera interactivement

---

## 🤖 CI/CD (GitHub Actions)

Pour automatiser à chaque push :

1. Crée `.github/workflows/testflight.yml`
2. Ajoute les secrets GitHub :
   - `FASTLANE_USER`
   - `FASTLANE_PASSWORD`
   - `MATCH_PASSWORD` (si tu utilises Fastlane Match)
3. Push → Build automatique → TestFlight ✨

Exemple workflow fourni dans `.github/workflows/testflight.yml.example`

---

## 📚 Ressources

- [Fastlane Docs](https://docs.fastlane.tools/)
- [Pilot (TestFlight)](https://docs.fastlane.tools/actions/pilot/)
- [App Store Connect](https://appstoreconnect.apple.com)
