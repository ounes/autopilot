#!/bin/bash
# Script de déploiement TestFlight automatisé
# Usage: ./deploy-testflight.sh [patch|minor|major]

set -e

VERSION_TYPE="${1:-patch}"  # patch par défaut (1.0.0 → 1.0.1)
PROJECT_DIR="$HOME/.openclaw/workspace/immat-scanner-plus"

cd "$PROJECT_DIR"

echo "🚀 Déploiement TestFlight - AutoPilot (ScanPilot)"
echo "=================================================="
echo ""

# Vérifier que le repo est propre
if [[ -n $(git status --porcelain) ]]; then
  echo "⚠️  Changements non committés détectés."
  echo "   Voulez-vous les committer avant de déployer ? (y/n)"
  read -r response
  if [[ "$response" == "y" ]]; then
    git add .
    echo "   Message du commit :"
    read -r commit_msg
    git commit -m "$commit_msg"
  else
    echo "❌ Déploiement annulé. Committez vos changements manuellement."
    exit 1
  fi
fi

echo "📦 Incrémentation de la version ($VERSION_TYPE)..."
npm version "$VERSION_TYPE" --no-git-tag-version

NEW_VERSION=$(node -p "require('./package.json').version")
echo "   Nouvelle version : $NEW_VERSION"

# Commit + tag
git add package.json app.json
git commit -m "chore: bump version to $NEW_VERSION"
git tag "v$NEW_VERSION"

echo ""
echo "🚀 Push vers GitHub (déclenche le build automatique)..."
git push origin main --follow-tags

echo ""
echo "⏳ Build en cours sur GitHub Actions..."
echo "🔗 Suivi en temps réel : https://github.com/ounes/autopilot/actions"

# Attendre que le run démarre (max 10 secondes)
sleep 3

RUN_URL=$(gh run list --repo ounes/autopilot --limit 1 --json url --jq '.[0].url')

echo ""
echo "✅ Déploiement lancé !"
echo "🔗 URL du build : $RUN_URL"
echo ""
echo "📱 L'app sera disponible sur TestFlight dans ~12-15 minutes."
echo ""
echo "💡 Commandes utiles :"
echo "   - Suivre les logs : gh run watch --repo ounes/autopilot"
echo "   - Vérifier le statut : gh run list --repo ounes/autopilot --limit 1"
echo ""
