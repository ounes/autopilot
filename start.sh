#!/bin/bash

# Script de lancement rapide Immat Scanner Plus

echo "🚗 Immat Scanner Plus - Démarrage"
echo "=================================="
echo ""

cd ~/.openclaw/workspace/immat-scanner-plus

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

echo ""
echo "Choisissez une plateforme:"
echo "1) Web (navigateur)"
echo "2) iOS (simulateur)"
echo "3) Android (émulateur)"
echo ""
read -p "Votre choix (1-3): " choice

case $choice in
    1)
        echo "🌐 Lancement version web..."
        npm run web
        ;;
    2)
        echo "📱 Lancement iOS..."
        npm run ios
        ;;
    3)
        echo "🤖 Lancement Android..."
        npm run android
        ;;
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac
