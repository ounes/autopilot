// Backend Express.js pour Immat Scanner Plus
// Ce fichier montre comment intégrer le scraping Leboncoin

const express = require('express');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const app = express();
app.use(express.json());

const PORT = 3000;

// Endpoint: Recherche par plaque
app.post('/api/search/plate', async (req, res) => {
  try {
    const { plate } = req.body;
    
    if (!plate) {
      return res.status(400).json({ error: 'Plaque requise' });
    }

    // Étape 1: Identifier le véhicule (base ADEME ou SIV-Auto API)
    // Pour l'exemple, simulation
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

    // Étape 2: Scraper Leboncoin avec le script vehicle-valuation
    const leboncoinData = await scrapeLeboncoin(vehicle);

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
    const { brand, model, year, mileage } = req.body;

    if (!brand || !model || !year) {
      return res.status(400).json({ error: 'Marque, modèle et année requis' });
    }

    const vehicle = {
      plate: null,
      brand,
      model,
      year: parseInt(year),
      mileage: mileage ? parseInt(mileage) : null,
    };

    const leboncoinData = await scrapeLeboncoin(vehicle);

    res.json({
      vehicle,
      pricing: leboncoinData,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Fonction: Scraper Leboncoin via le skill vehicle-valuation
async function scrapeLeboncoin(vehicle) {
  try {
    const skillPath = '~/.openclaw/workspace/skills/vehicle-valuation';
    const venvPath = `${skillPath}/venv/bin/activate`;
    const scriptPath = `${skillPath}/scripts/search_leboncoin.py`;

    const yearRange = [vehicle.year - 2, vehicle.year + 2];
    const mileageCenter = vehicle.mileage || 100000;

    // Commande Python avec venv
    const command = `
      source ${venvPath} && 
      python ${scriptPath} "${vehicle.brand}" "${vehicle.model}" ${vehicle.year} --limit 50
    `;

    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
      console.error('Python stderr:', stderr);
    }

    // Parser le JSON retourné par le script Python
    const results = JSON.parse(stdout);

    // Filtrer par kilométrage si fourni
    let filtered = results.listings;
    if (vehicle.mileage) {
      const mileageRange = [mileageCenter - 20000, mileageCenter + 20000];
      filtered = results.listings.filter(l =>
        l.mileage >= mileageRange[0] && l.mileage <= mileageRange[1]
      );
    }

    // Calculer statistiques
    const prices = filtered.map(l => l.price).sort((a, b) => a - b);
    const median = prices[Math.floor(prices.length / 2)];
    const min = prices[Math.floor(prices.length * 0.05)];
    const max = prices[Math.floor(prices.length * 0.95)];

    // Grouper par région
    const regions = {};
    filtered.forEach(l => {
      const region = l.location.split('(')[1]?.replace(')', '') || 'Inconnu';
      regions[region] = (regions[region] || 0) + 1;
    });

    return {
      total: filtered.length,
      totalFrance: results.listings.length,
      priceRange: { min, median, max },
      regions,
      topListings: filtered.slice(0, 10),
    };
  } catch (error) {
    console.error('Error scraping leboncoin:', error);
    throw new Error('Impossible de récupérer les données Leboncoin');
  }
}

// Endpoint: OCR plaque (à partir d'une photo)
app.post('/api/ocr', async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image requise' });
    }

    // Sauvegarder temporairement l'image
    const fs = require('fs');
    const tmpPath = `/tmp/plate_${Date.now()}.jpg`;
    const buffer = Buffer.from(imageBase64, 'base64');
    fs.writeFileSync(tmpPath, buffer);

    // Appeler fast-plate-ocr
    const skillPath = '~/.openclaw/workspace/skills/vehicle-valuation';
    const venvPath = `${skillPath}/venv/bin/activate`;
    const scriptPath = `${skillPath}/scripts/extract_plate.py`;

    const command = `source ${venvPath} && python ${scriptPath} ${tmpPath}`;
    const { stdout } = await execPromise(command);

    // Parser le résultat JSON
    const result = JSON.parse(stdout);

    // Supprimer le fichier temporaire
    fs.unlinkSync(tmpPath);

    if (result.success) {
      res.json({ plate: result.plate, confidence: result.confidence });
    } else {
      res.status(400).json({ error: 'Impossible de lire la plaque' });
    }
  } catch (error) {
    console.error('Error OCR:', error);
    res.status(500).json({ error: error.message });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚗 Backend Immat Scanner Plus running on http://localhost:${PORT}`);
  console.log('');
  console.log('Endpoints disponibles:');
  console.log('  POST /api/search/plate   - Recherche par plaque');
  console.log('  POST /api/search/manual  - Recherche manuelle');
  console.log('  POST /api/ocr            - OCR plaque depuis photo');
});
