#!/bin/bash
# deploy-testflight.sh - Script de déploiement automatique sur TestFlight

set -e  # Arrêter en cas d'erreur

echo "🚀 Déploiement AutoPilot sur TestFlight"
echo "========================================"

# Vérifier les variables d'environnement
if [ -z "$FASTLANE_USER" ]; then
  echo "⚠️  FASTLANE_USER non défini. Utilise ounes.chadli@gmail.com par défaut"
  export FASTLANE_USER="ounes.chadli@gmail.com"
fi

# Vérifier que Git est propre
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠️  Git contient des modifications non commitées"
  read -p "Continuer quand même ? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Lancer le déploiement Fastlane
echo "📦 Build et upload vers TestFlight..."
cd "$(dirname "$0")"
bundle exec fastlane ios beta

echo ""
echo "✅ Déploiement terminé !"
echo "📱 L'app sera disponible sur TestFlight dans ~10-15 minutes"
echo "🔗 App Store Connect: https://appstoreconnect.apple.com"
