const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const util = require('util');
const path = require('path');

const execPromise = util.promisify(exec);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path vers le venv Python (à créer)
const PYTHON_VENV = path.join(__dirname, 'venv', 'bin', 'python3');
const PYTHON_SCRIPT = path.join(__dirname, 'scripts', 'search_leboncoin.py');

// Endpoint: Recherche par plaque (à implémenter avec OCR)
app.post('/api/search/plate', async (req, res) => {
  try {
    const { plate } = req.body;
    
    if (!plate) {
      return res.status(400).json({ error: 'Plaque requise' });
    }

    // TODO: Étape 1 - Identifier le véhicule via base ADEME ou SIV-Auto
    // Pour l'instant, simulation
    const vehicle = {
      plate: plate.toUpperCase(),
      brand: 'PEUGEOT',
      model: '308',
      version: '1.6 BlueHDi 120ch',
      year: 2018,
      engine: 'Diesel',
      power: 120,
      fiscalPower: 6,
      co2: 95,
      color: 'GRIS',
    };

    // Étape 2 - Scraper Leboncoin avec le vrai script Python
    const leboncoinData = await searchLeboncoinPython(vehicle);

    res.json({
      vehicle,
      pricing: leboncoinData,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: Recherche manuelle
app.post('/api/search/manual', async (req, res) => {
  try {
    const { brand, model, year, mileage, fuelType, gearboxType, settings } = req.body;

    if (!brand || !model || !year) {
      return res.status(400).json({ error: 'Marque, modèle et année requis' });
    }

    const vehicle = {
      plate: null,
      brand: brand.toUpperCase(),
      model: model.toUpperCase(),
      year: parseInt(year),
      mileage: mileage ? parseInt(mileage) : null,
      fuelType: fuelType || null,
      gearboxType: gearboxType || null,
    };

    // Scraper Leboncoin avec le vrai script Python + paramètres
    const leboncoinData = await searchLeboncoinPython(vehicle, settings);

    res.json({
      vehicle,
      pricing: leboncoinData,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Fonction: Scraper Leboncoin via script Python + lib lbc
async function searchLeboncoinPython(vehicle, settings = {}) {
  try {
    // Valeurs par défaut
    const yearMargin = settings.yearMargin || 2;
    const mileageMargin = settings.mileageMargin || 20000;
    const regionName = settings.region || 'all';
    
    // Mapping régions vers noms standardisés (compatibles avec la lib lbc)
    const REGION_MAPPING = {
      all: null,
      auvergne_rhone_alpes: 'auvergne_rhone_alpes',
      bourgogne_franche_comte: 'bourgogne_franche_comte',
      bretagne: 'bretagne',
      centre_val_de_loire: 'centre_val_de_loire',
      corse: 'corse',
      grand_est: 'grand_est',
      hauts_de_france: 'hauts_de_france',
      ile_de_france: 'ile_de_france',
      normandie: 'normandie',
      nouvelle_aquitaine: 'nouvelle_aquitaine',
      occitanie: 'occitanie',
      pays_de_la_loire: 'pays_de_la_loire',
      provence_alpes_cote_azur: 'provence_alpes_cote_azur',
    };
    
    const regionParam = REGION_MAPPING[regionName] || null;
    
    // Construire la commande Python
    let command = `${PYTHON_VENV} ${PYTHON_SCRIPT} "${vehicle.brand}" "${vehicle.model}" ${vehicle.year}`;
    
    // Ajouter marges
    command += ` --year-margin ${yearMargin}`;
    
    if (vehicle.mileage) {
      command += ` --mileage ${vehicle.mileage} --mileage-margin ${mileageMargin}`;
    }
    
    if (regionParam) {
      command += ` --region "${regionParam}"`;
    }
    
    if (vehicle.fuelType) {
      command += ` --fuel-type ${vehicle.fuelType}`;
    }
    
    if (vehicle.gearboxType) {
      command += ` --gearbox-type ${vehicle.gearboxType}`;
    }
    
    command += ` --limit 50`;

    console.log('Executing:', command);

    // Exécuter le script Python
    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
      console.error('Python stderr:', stderr);
    }

    // Parser le JSON retourné par le script Python
    const result = JSON.parse(stdout);

    if (!result.success) {
      throw new Error(result.error || 'Erreur lors du scraping Leboncoin');
    }

    // Formater le résultat pour l'app mobile
    return {
      total: result.total,
      totalFrance: result.total, // Pour l'instant, pas de distinction région/France
      priceRange: result.priceRange,
      regions: result.regions,
      topListings: result.listings.slice(0, 10),
      filters: result.filters, // Inclure les filtres appliqués
    };
  } catch (error) {
    console.error('Error scraping leboncoin:', error);
    throw new Error('Impossible de récupérer les données Leboncoin');
  }
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚗 Backend Immat Scanner Plus`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('');
  console.log('Endpoints disponibles:');
  console.log('  POST /api/search/plate   - Recherche par plaque');
  console.log('  POST /api/search/manual  - Recherche manuelle');
  console.log('  GET  /health             - Health check');
  console.log('');
  console.log('⚠️  Assurez-vous que le venv Python est créé et que la lib lbc est installée:');
  console.log('  cd backend');
  console.log('  python3 -m venv venv');
  console.log('  source venv/bin/activate');
  console.log('  pip install -r requirements.txt');
});
