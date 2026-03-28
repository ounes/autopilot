# Guide de déploiement TestFlight automatisé

## ⚡ Déploiement rapide (1 commande)

### Option 1 : Déploiement automatique via GitHub Actions (RECOMMANDÉ)

**Prérequis** : Rien ! Tout est déjà configuré.

**Commande unique** :
```bash
cd ~/.openclaw/workspace/immat-scanner-plus && \
npm version patch && \
git push origin main --follow-tags
```

✅ **C'est tout !** GitHub Actions va :
1. Builder l'app iOS
2. Signer avec le certificat Distribution
3. Uploader sur TestFlight
4. ~12 minutes plus tard → App disponible dans TestFlight

---

### Option 2 : Déploiement local (si GitHub Actions indisponible)

```bash
cd ~/.openclaw/workspace/immat-scanner-plus && \
npm version patch && \
fastlane beta
```

⚠️ Nécessite que le Mac soit allumé et connecté.

---

## 🔄 Workflow complet automatisé

### 1️⃣ Incrémenter la version (automatique)

```bash
cd ~/.openclaw/workspace/immat-scanner-plus
npm version patch  # 1.0.0 → 1.0.1
# ou
npm version minor  # 1.0.1 → 1.1.0
# ou
npm version major  # 1.1.0 → 2.0.0
```

Cette commande :
- Met à jour `package.json`
- Met à jour `app.json` (via script npm)
- Crée un commit git automatique
- Crée un tag git (ex: `v1.0.1`)

### 2️⃣ Déclencher le build (automatique)

```bash
git push origin main --follow-tags
```

GitHub Actions détecte le push et lance le workflow TestFlight automatiquement.

### 3️⃣ Monitoring du build (optionnel)

```bash
# Voir le statut du dernier build
gh run list --repo ounes/autopilot --limit 1

# Suivre les logs en temps réel
gh run watch --repo ounes/autopilot
```

### 4️⃣ Vérifier sur TestFlight (après ~12-15 min)

```bash
# Ouvrir App Store Connect directement
open "https://appstoreconnect.apple.com/apps/$(gh api repos/ounes/autopilot/contents/app.json --jq '.content | @base64d | fromjson | .ios.bundleIdentifier')/testflight"
```

Ou via CLI (si `fastlane` installé localement) :
```bash
fastlane pilot list
```

---

## 📦 Script tout-en-un

Créer un script `deploy-testflight.sh` :

```bash
#!/bin/bash
set -e

cd ~/.openclaw/workspace/immat-scanner-plus

echo "📦 Incrémentation de la version..."
npm version patch

echo "🚀 Push vers GitHub (déclenche le build automatique)..."
git push origin main --follow-tags

echo "⏳ Build en cours sur GitHub Actions..."
echo "🔗 URL: https://github.com/ounes/autopilot/actions"

echo ""
echo "✅ Déploiement lancé !"
echo "📱 L'app sera disponible sur TestFlight dans ~12-15 minutes."
echo ""
echo "💡 Suivi en temps réel : gh run watch --repo ounes/autopilot"
```

**Usage** :
```bash
bash ~/.openclaw/workspace/immat-scanner-plus/deploy-testflight.sh
```

---

## 🤖 Automatisation complète (0 interaction)

### Via Telegram/WhatsApp

**Commande** : `/deploy testflight immat-scanner-plus`

**Action automatique** :
1. Incrémente la version
2. Commit + push
3. Déclenche GitHub Actions
4. Te notifie quand c'est prêt sur TestFlight

### Via cron (déploiement hebdomadaire automatique)

Ajouter dans `~/.openclaw/workspace/HEARTBEAT.md` :

```markdown
## Déploiement TestFlight hebdomadaire

**Fréquence** : Tous les lundis à 9h
**Action** : Déployer immat-scanner-plus sur TestFlight si commits depuis dernier déploiement

```bash
cd ~/.openclaw/workspace/immat-scanner-plus
if [[ $(git log --since="7 days ago" --oneline | wc -l) -gt 0 ]]; then
  npm version patch
  git push origin main --follow-tags
  echo "✅ Déploiement TestFlight lancé (nouveaux commits détectés)"
else
  echo "⏭️ Aucun nouveau commit, déploiement sauté"
fi
```
```

---

## 🔐 Credentials persistés

**Localisation** : `~/.openclaw/workspace/memory/credentials.md` (chiffré)

### Apple Developer
- **Email** : `ounes.chadli@gmail.com`
- **Team ID** : `2T2SB8U85C`
- **Certificat Distribution** :
  - SHA-1 : `F119B06202C267C4F3ED47715FC70CAFBC18ECA6`
  - Expire : 28/03/2027
  - Trousseau : `login.keychain-db`
  - Mot de passe export : `autopilot123`

### App Store Connect
- **Email** : `ounes.chadli@laposte.net` (Titulaire du compte)
- **API Key** :
  - Key ID : `54Z52VRJM9`
  - Issuer ID : `1f606f04-47f9-4dee-852a-379fd399d054`
  - Fichier : `~/Downloads/AuthKey_54Z52VRJM9.p8`
  - Accès : Admin
  - Expire : Jamais (API Key permanente)

### GitHub
- **Repo** : `https://github.com/ounes/autopilot`
- **Secrets configurés** (dans Settings → Secrets → Actions) :
  - `CERTIFICATE_BASE64` — Certificat Distribution .p12 (base64)
  - `CERTIFICATE_PASSWORD` — `autopilot123`
  - `PROVISIONING_PROFILE_BASE64` — Provisioning profile (base64)
  - `APPLE_TEAM_ID` — `2T2SB8U85C`
  - `APP_STORE_CONNECT_API_KEY_ID` — `54Z52VRJM9`
  - `APP_STORE_CONNECT_ISSUER_ID` — `1f606f04-47f9-4dee-852a-379fd399d054`
  - `APP_STORE_CONNECT_API_KEY_CONTENT` — Contenu du .p8 (base64)

---

## 🆘 Troubleshooting rapide

### Build GitHub Actions échoue

**1. Vérifier le statut** :
```bash
gh run list --repo ounes/autopilot --limit 1
```

**2. Voir les logs d'erreur** :
```bash
gh run view $(gh run list --repo ounes/autopilot --limit 1 --json databaseId --jq '.[0].databaseId') --log-failed
```

**3. Erreurs courantes** :

| Erreur | Solution |
|--------|----------|
| `No signing certificate` | Certificat expiré → Recréer sur developer.apple.com |
| `Provisioning profile expired` | Profil expiré → Recréer et mettre à jour `PROVISIONING_PROFILE_BASE64` |
| `Authentication credentials invalid` | Vérifier `APP_STORE_CONNECT_ISSUER_ID` (copier depuis App Store Connect) |
| `Bundle version already exists` | Incrémenter version avec `npm version patch` |

### App bloquée "En traitement" sur TestFlight

**Temps normal** : 10-15 minutes
**Si > 30 minutes** : Vérifier sur App Store Connect → TestFlight → Activité

---

## 📊 Monitoring post-déploiement

### Vérifier que l'app est disponible

```bash
fastlane pilot list
```

Ou via `gh` CLI :
```bash
gh api graphql -f query='
{
  repository(owner:"ounes", name:"autopilot") {
    latestRelease {
      tagName
      createdAt
      url
    }
  }
}' --jq '.data.repository.latestRelease'
```

### Ajouter des testeurs internes

```bash
fastlane pilot add email@example.com
```

Ou via App Store Connect :
```bash
open "https://appstoreconnect.apple.com/apps/$(cat ~/.openclaw/workspace/immat-scanner-plus/app.json | jq -r '.ios.bundleIdentifier')/testflight/testers"
```

---

## 🎯 Résumé : Déploiement en 10 secondes

```bash
cd ~/.openclaw/workspace/immat-scanner-plus && npm version patch && git push origin main --follow-tags
```

**C'est tout !** 🚀

GitHub Actions fait le reste :
1. ✅ Build iOS
2. ✅ Signing
3. ✅ Upload TestFlight
4. ✅ Notification quand prêt (optionnel)

---

## 📝 Checklist première utilisation

- [x] Certificat Distribution créé et installé
- [x] Provisioning Profile créé
- [x] API Key App Store Connect créée
- [x] Secrets GitHub configurés
- [x] App "ScanPilot" créée dans App Store Connect
- [x] Workflow GitHub Actions testé et fonctionnel
- [ ] Testeurs internes ajoutés dans TestFlight
- [ ] Script `deploy-testflight.sh` créé (optionnel)
- [ ] Automatisation Telegram/WhatsApp configurée (optionnel)

---

**Dernière mise à jour** : 28/03/2026 18:22
**Statut** : ✅ Workflow validé et fonctionnel (Build #36 success)
