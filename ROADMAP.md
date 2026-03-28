# 🚀 Roadmap - Immat Scanner Plus

## ✅ Phase 1 : MVP (TERMINÉ)
- [x] Structure projet React Native (Expo)
- [x] Écran Accueil avec saisie plaque + mode manuel
- [x] Écran Résultats avec cote Leboncoin
- [x] Écran Historique des recherches
- [x] Écran Profil utilisateur
- [x] Navigation bottom tabs + stack
- [x] Design fidèle à Immat Scanner
- [x] Données mock pour test

---

## 🔧 Phase 2 : Backend & API (EN COURS)

### 2.1 Backend Node.js
- [ ] Setup serveur Express.js
- [ ] Endpoint `/api/search/plate`
- [ ] Endpoint `/api/search/manual`
- [ ] Endpoint `/api/ocr` (photo → plaque)
- [ ] Rate limiting (eviter abuse)
- [ ] Cache Redis (véhicules populaires)
- [ ] Logging (Winston ou Pino)
- [ ] Health check endpoint

**Fichier fourni** : `backend-example.js` (à adapter)

### 2.2 Identification véhicule
**Option A (gratuit démarrage) :**
- [ ] Télécharger base ADEME (50k+ véhicules)
- [ ] Importer dans PostgreSQL
- [ ] Recherche par marque/modèle/année

**Option B (production) :**
- [ ] Inscription SIV-Auto freemium (100 req/mois gratuit)
- [ ] Intégration API SIV-Auto
- [ ] Fallback base ADEME si quota dépassé

### 2.3 OCR plaque
- [ ] Intégrer skill `vehicle-valuation`
- [ ] Script Python `extract_plate.py`
- [ ] Gestion erreurs (plaque illisible)
- [ ] Support formats : JPEG, PNG, HEIC

### 2.4 Scraping Leboncoin
- [ ] Utiliser skill `vehicle-valuation`
- [ ] Script Python `search_leboncoin.py`
- [ ] Filtres : année ±2 ans, km ±20k
- [ ] Parsing : prix, km, localisation, URL
- [ ] Rate limiting (max 2-3 req/jour par véhicule)

### 2.5 Frontend → Backend
- [ ] Remplacer `services/api.js` mock par vrais appels
- [ ] Axios config (base URL, timeout)
- [ ] Gestion erreurs (network, 404, 500)
- [ ] Loading states
- [ ] Retry logic (connexion instable)

**Temps estimé Phase 2** : 1-2 semaines

---

## 📱 Phase 3 : Features avancées

### 3.1 OCR caméra (temps réel)
- [ ] Scan plaque via caméra (expo-camera)
- [ ] Preview temps réel avec overlay
- [ ] Auto-détection plaque (bounding box)
- [ ] Vibration + son quand plaque détectée
- [ ] Galerie photos (expo-image-picker)

### 3.2 Historique amélioré
- [ ] Pull to refresh
- [ ] Swipe to delete
- [ ] Filtres (marque, prix, date)
- [ ] Export CSV
- [ ] Synchronisation cloud (optionnel)

### 3.3 Favoris & Garage
- [ ] Ajouter aux favoris depuis résultats
- [ ] Liste favoris dédiée
- [ ] Mon garage (véhicules possédés)
- [ ] Suivi valeur (graphique évolution prix)

### 3.4 Alertes prix
- [ ] Surveiller un véhicule
- [ ] Push notification si prix baisse
- [ ] Cron job backend (check 1x/jour)
- [ ] Seuil personnalisable (ex: alerte si -5%)

### 3.5 Comparaison véhicules
- [ ] Sélectionner 2-3 véhicules
- [ ] Vue comparée (specs + prix)
- [ ] Graphique prix vs km
- [ ] Recommandation (meilleur rapport qualité/prix)

**Temps estimé Phase 3** : 2-3 semaines

---

## 💰 Phase 4 : Monétisation

### 4.1 Système de crédits
- [ ] Table users (UUID, credits, tier)
- [ ] Endpoint `/api/credits/balance`
- [ ] Endpoint `/api/credits/use` (déduire 1 crédit)
- [ ] Endpoint `/api/credits/purchase`

### 4.2 Paiement in-app
- [ ] Intégration Stripe (React Native)
- [ ] Packs de crédits :
  - 5 crédits offerts (gratuit)
  - 10 crédits : 4.99€
  - 50 crédits : 19.99€
  - 200 crédits : 59.99€
- [ ] Abonnements :
  - Pro : 4.99€/mois (20 scans/mois)
  - Garage : 14.99€/mois (100 scans/mois)
- [ ] Gestion renouvellement auto

### 4.3 Tier gratuit vs premium
**Gratuit (5 crédits/mois) :**
- ✅ Saisie manuelle illimitée
- ✅ Recherche plaque : 5 crédits
- ✅ Cote Leboncoin basique
- ❌ Pas d'OCR caméra
- ❌ Pas d'alertes prix

**Premium (abonnement) :**
- ✅ Tout du gratuit
- ✅ OCR caméra illimité
- ✅ Alertes prix (5 véhicules)
- ✅ Historique illimité (vs 10 gratuit)
- ✅ Export CSV
- ✅ Support prioritaire

### 4.4 Dashboard admin
- [ ] Page analytics (React Admin)
- [ ] Métriques :
  - Utilisateurs actifs
  - Recherches/jour
  - Taux conversion gratuit → payant
  - Revenu mensuel
- [ ] Gestion utilisateurs (bloquer, rembourser)

**Temps estimé Phase 4** : 1-2 semaines

---

## 🚀 Phase 5 : Production & déploiement

### 5.1 Backend production
- [ ] Hébergement : VPS (Hetzner/OVH) ou Heroku
- [ ] PostgreSQL (base données)
- [ ] Redis (cache + queues)
- [ ] HTTPS (Let's Encrypt)
- [ ] Backup automatique (BDD)
- [ ] Monitoring (UptimeRobot, Sentry)

### 5.2 App mobile
- [ ] Build iOS (TestFlight)
- [ ] Build Android (Google Play Internal)
- [ ] Beta testeurs (10-20 personnes)
- [ ] Corrections bugs
- [ ] Soumission App Store (Apple)
- [ ] Soumission Play Store (Google)

### 5.3 Legal & compliance
- [ ] Politique de confidentialité
- [ ] CGU (Conditions générales d'utilisation)
- [ ] Mentions légales
- [ ] RGPD (droit à l'oubli, export données)
- [ ] Scraping Leboncoin (vérifier légalité)

### 5.4 Marketing
- [ ] Page web (présentation app)
- [ ] Screenshots App Store/Play Store
- [ ] Vidéo démo (30s)
- [ ] Réseaux sociaux (Twitter, Instagram)
- [ ] SEO (mots-clés : cote auto, argus gratuit, etc.)

**Temps estimé Phase 5** : 2-3 semaines

---

## 📊 Métriques de succès

**Court terme (3 mois) :**
- 500 téléchargements
- 50 utilisateurs actifs/semaine
- 1000 recherches/mois

**Moyen terme (6 mois) :**
- 2000 téléchargements
- 200 utilisateurs actifs/semaine
- 5000 recherches/mois
- 20 abonnés premium

**Long terme (1 an) :**
- 10 000 téléchargements
- 1000 utilisateurs actifs/semaine
- 30 000 recherches/mois
- 100 abonnés premium
- Rentabilité (revenu > coûts serveur)

---

## 🔧 Stack technique finale

**Frontend :**
- React Native (Expo)
- React Navigation
- AsyncStorage (local)
- Axios (API calls)
- Expo Camera & Image Picker

**Backend :**
- Node.js + Express
- PostgreSQL (véhicules, users, credits)
- Redis (cache, rate limiting)
- Python (OCR + scraping)
- Bull (job queues pour alertes)

**Infra :**
- VPS (4GB RAM, 2 vCPU)
- Docker (conteneurs)
- Nginx (reverse proxy)
- Let's Encrypt (SSL)
- GitHub Actions (CI/CD)

**Services tiers :**
- Stripe (paiement)
- SIV-Auto (identification véhicule)
- Sentry (error tracking)
- PostHog (analytics)
- Firebase (push notifications)

---

## 💡 Idées futures (v2)

- [ ] Multi-langues (EN, ES, IT, DE)
- [ ] Multi-pays (UK, ES, IT, DE)
- [ ] Scraping autres sources (AutoScout24, Mobile.de)
- [ ] Historique entretien (si données ANTS)
- [ ] Rappels constructeur (campagnes de rappel)
- [ ] Assurance auto (comparateur)
- [ ] Simulation crédit auto
- [ ] Chatbot IA (conseil achat)
- [ ] AR (voir infos véhicule en réalité augmentée)

---

## 🤝 Contribution

Pour contribuer au développement :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

---

**Développé pour Ounes** - Let's build something amazing! 🚗🚀
