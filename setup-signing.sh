#!/bin/bash
set -e

echo "=================================================="
echo "🔐 Configuration Signing Manuel iOS - GitHub Actions"
echo "=================================================="
echo ""
echo "Ce script va te guider pour créer et configurer"
echo "le certificat + provisioning profile pour CI/CD."
echo ""
echo "⚠️  Prérequis:"
echo "  - Mac avec Xcode installé"
echo "  - Compte Apple Developer actif"
echo "  - Accès admin au repo GitHub"
echo ""
read -p "Appuyer sur Entrée pour continuer..."

# Créer un dossier temporaire
TEMP_DIR="$HOME/.autopilot-signing-setup"
mkdir -p "$TEMP_DIR"
cd "$TEMP_DIR"

echo ""
echo "=================================================="
echo "📝 ÉTAPE 1 : Créer le Certificate Signing Request (CSR)"
echo "=================================================="
echo ""
echo "1. Ouvre Keychain Access (Cmd+Space → 'Keychain Access')"
echo "2. Menu Keychain Access → Certificate Assistant → Request a Certificate from a Certificate Authority..."
echo "3. Remplis:"
echo "   - User Email: ounes.chadli@gmail.com"
echo "   - Common Name: Ounes Chadli iOS Distribution"
echo "   - CA Email: (laisser vide)"
echo "   - Request is: ✅ Saved to disk"
echo "4. Sauvegarde le fichier CSR"
echo ""
read -p "Appuyer sur Entrée quand c'est fait..."

echo ""
read -p "📂 Chemin complet du fichier CSR téléchargé: " CSR_PATH
CSR_PATH="${CSR_PATH/#\~/$HOME}"  # Expand ~

if [ ! -f "$CSR_PATH" ]; then
    echo "❌ Fichier non trouvé: $CSR_PATH"
    exit 1
fi

echo "✅ CSR trouvé: $CSR_PATH"

echo ""
echo "=================================================="
echo "🍎 ÉTAPE 2 : Créer le certificat sur Apple Developer"
echo "=================================================="
echo ""
echo "1. Ouvre https://developer.apple.com/account/resources/certificates/list"
echo "2. Clique '+' (Add)"
echo "3. Choisis 'Apple Distribution' (sous Software)"
echo "4. Continue → Upload le fichier CSR"
echo "5. Télécharge le certificat .cer"
echo "6. Double-clique pour l'installer dans Keychain"
echo ""
read -p "Appuyer sur Entrée quand c'est fait..."

echo ""
echo "=================================================="
echo "🔑 ÉTAPE 3 : Exporter le certificat + clé privée"
echo "=================================================="
echo ""
echo "1. Dans Keychain Access → My Certificates"
echo "2. Trouve 'Apple Distribution: Ounes Chadli (2T2SB8U85C)'"
echo "3. Clic droit → Export 'Apple Distribution...'"
echo "4. Format: Personal Information Exchange (.p12)"
echo "5. Sauvegarde comme 'ios_distribution.p12'"
echo ""
read -p "Appuyer sur Entrée quand c'est fait..."

echo ""
read -p "📂 Chemin complet du fichier .p12 exporté: " P12_PATH
P12_PATH="${P12_PATH/#\~/$HOME}"

if [ ! -f "$P12_PATH" ]; then
    echo "❌ Fichier non trouvé: $P12_PATH"
    exit 1
fi

echo "✅ Certificat trouvé: $P12_PATH"

echo ""
read -sp "🔒 Mot de passe du certificat .p12 (choisi lors de l'export): " P12_PASSWORD
echo ""

# Tester le mot de passe
if ! openssl pkcs12 -in "$P12_PATH" -noout -passin pass:"$P12_PASSWORD" 2>/dev/null; then
    echo "❌ Mot de passe incorrect ou certificat invalide"
    exit 1
fi

echo "✅ Mot de passe vérifié"

# Convertir en base64
echo ""
echo "🔄 Conversion du certificat en base64..."
CERT_BASE64=$(base64 -i "$P12_PATH")
echo "✅ Certificat converti"

echo ""
echo "=================================================="
echo "📱 ÉTAPE 4 : Créer le Provisioning Profile"
echo "=================================================="
echo ""
echo "1. Ouvre https://developer.apple.com/account/resources/profiles/list"
echo "2. Clique '+' (Add)"
echo "3. Choisis 'App Store' (sous Distribution)"
echo "4. App ID: com.ouneschadli.autopilot"
echo "5. Certificates: Coche 'Apple Distribution: Ounes Chadli'"
echo "6. Provisioning Profile Name: 'AutoPilot App Store'"
echo "7. Generate → Download"
echo ""
read -p "Appuyer sur Entrée quand c'est fait..."

echo ""
read -p "📂 Chemin complet du fichier .mobileprovision téléchargé: " PROFILE_PATH
PROFILE_PATH="${PROFILE_PATH/#\~/$HOME}"

if [ ! -f "$PROFILE_PATH" ]; then
    echo "❌ Fichier non trouvé: $PROFILE_PATH"
    exit 1
fi

echo "✅ Provisioning Profile trouvé: $PROFILE_PATH"

# Convertir en base64
echo ""
echo "🔄 Conversion du provisioning profile en base64..."
PROFILE_BASE64=$(base64 -i "$PROFILE_PATH")
echo "✅ Provisioning Profile converti"

# Sauvegarder les secrets
echo ""
echo "💾 Sauvegarde des secrets dans $TEMP_DIR/github-secrets.txt"
cat > "$TEMP_DIR/github-secrets.txt" <<EOF
================================================
🔑 Secrets GitHub à ajouter
================================================

Repo: https://github.com/ounes/autopilot/settings/secrets/actions

CERTIFICATE_BASE64:
$CERT_BASE64

CERTIFICATE_PASSWORD:
$P12_PASSWORD

PROVISIONING_PROFILE_BASE64:
$PROFILE_BASE64

APPLE_TEAM_ID: (déjà configuré)
2T2SB8U85C

FASTLANE_USER: (déjà configuré)
ounes.chadli@gmail.com

FASTLANE_PASSWORD: (déjà configuré)
(app-specific password)

================================================
⚠️  IMPORTANT: Supprimer ce fichier après configuration!
rm "$TEMP_DIR/github-secrets.txt"
================================================
EOF

echo "✅ Secrets sauvegardés dans: $TEMP_DIR/github-secrets.txt"

echo ""
echo "=================================================="
echo "🌐 ÉTAPE 5 : Ajouter les secrets sur GitHub"
echo "=================================================="
echo ""
echo "1. Ouvre https://github.com/ounes/autopilot/settings/secrets/actions"
echo "2. Pour chaque secret dans github-secrets.txt:"
echo "   - Clique 'New repository secret'"
echo "   - Name: CERTIFICATE_BASE64 (etc.)"
echo "   - Secret: (copie la valeur depuis le fichier)"
echo "   - Add secret"
echo ""
echo "📄 Fichier des secrets: $TEMP_DIR/github-secrets.txt"
echo ""
read -p "Appuyer sur Entrée quand tous les secrets sont ajoutés..."

echo ""
echo "=================================================="
echo "✅ CONFIGURATION TERMINÉE"
echo "=================================================="
echo ""
echo "Prochaines étapes:"
echo ""
echo "1. Le workflow GitHub Actions a été mis à jour automatiquement"
echo "2. Déclenche un build sur:"
echo "   https://github.com/ounes/autopilot/actions/workflows/testflight.yml"
echo "3. Clique 'Run workflow' → 'Run workflow'"
echo "4. Attends ~10-15 min → Build réussi ✅"
echo ""
echo "🗑️  N'oublie pas de supprimer les fichiers temporaires:"
echo "   rm -rf $TEMP_DIR"
echo ""
echo "🎉 Setup terminé! L'app sera uploadée automatiquement sur TestFlight."
echo ""
