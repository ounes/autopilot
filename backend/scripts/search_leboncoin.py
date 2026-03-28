#!/usr/bin/env python3
"""
Script de recherche Leboncoin via la lib lbc (https://github.com/etienne-hd/lbc)
Usage: python search_leboncoin.py "MARQUE" "MODELE" ANNEE [OPTIONS]
"""

import sys
import json
import argparse
from lbc import Client, Category, Region

# Mapping des types de carburant vers les valeurs Leboncoin
FUEL_TYPE_MAPPING = {
    "ESSENCE": "1",
    "DIESEL": "2",
    "GPL": "3",
    "ELECTRIQUE": "4",
    "HYBRIDE": "6",
    "HYBRIDE_RECHARGEABLE": "6",  # Même code que hybride
    "E85": "5",
}

# Mapping des types de boîte de vitesse vers les valeurs Leboncoin
GEARBOX_TYPE_MAPPING = {
    "MANUELLE": "1",
    "AUTOMATIQUE": "2",
    "ROBOTISEE": "3",
}

# Mapping des noms de régions vers les objets Region
REGION_MAPPING = {
    "auvergne_rhone_alpes": Region.AUVERGNE_RHONE_ALPES,
    "bourgogne_franche_comte": Region.BOURGOGNE_FRANCHE_COMTE,
    "bretagne": Region.BRETAGNE,
    "centre_val_de_loire": Region.CENTRE_VAL_DE_LOIRE,
    "corse": Region.CORSE,
    "grand_est": Region.GRAND_EST,
    "hauts_de_france": Region.HAUTS_DE_FRANCE,
    "ile_de_france": Region.ILE_DE_FRANCE,
    "normandie": Region.NORMANDIE,
    "nouvelle_aquitaine": Region.NOUVELLE_AQUITAINE,
    "occitanie": Region.OCCITANIE,
    "pays_de_la_loire": Region.PAYS_DE_LA_LOIRE,
    "provence_alpes_cote_azur": Region.PROVENCE_ALPES_COTE_DAZUR,
}

def search_leboncoin(brand, model, year, mileage=None, fuel_type=None, gearbox_type=None, year_margin=2, mileage_margin=20000, region=None, limit=50):
    """
    Recherche des annonces de véhicules sur Leboncoin
    
    Args:
        brand: Marque du véhicule (ex: "Peugeot")
        model: Modèle du véhicule (ex: "308")
        year: Année du véhicule (ex: 2018)
        mileage: Kilométrage approximatif (optionnel)
        fuel_type: Type de carburant (optionnel)
        gearbox_type: Type de boîte de vitesse (optionnel)
        year_margin: Marge sur l'année (défaut: 2)
        mileage_margin: Marge sur le kilométrage (défaut: 20000)
        region: Code région (optionnel)
        limit: Nombre maximum de résultats
    
    Returns:
        JSON avec les résultats
    """
    
    try:
        # Créer le client
        client = Client()
        
        # Construire la requête de recherche
        query = f"{brand} {model}"
        
        # Paramètres de recherche
        kwargs = {}
        
        # Filtres optionnels sur l'année (marge configurable)
        if year:
            year_min = year - year_margin
            year_max = year + year_margin
            kwargs["regdate"] = (year_min, year_max)
        
        # Filtres optionnels sur le kilométrage (marge configurable)
        if mileage:
            mileage_min = max(0, mileage - mileage_margin)
            mileage_max = mileage + mileage_margin
            kwargs["mileage"] = (mileage_min, mileage_max)
        
        # Filtre région (utiliser locations avec objets Region)
        if region and region != "all":
            region_obj = REGION_MAPPING.get(region)
            if region_obj:
                kwargs["locations"] = [region_obj]
        
        # Filtre carburant
        if fuel_type and fuel_type in FUEL_TYPE_MAPPING:
            kwargs["fuel"] = [FUEL_TYPE_MAPPING[fuel_type]]
        
        # Filtre boîte de vitesse
        if gearbox_type and gearbox_type in GEARBOX_TYPE_MAPPING:
            kwargs["gearbox"] = [GEARBOX_TYPE_MAPPING[gearbox_type]]
        
        # Effectuer la recherche
        search_result = client.search(
            text=query,
            category=Category.VEHICULES_VOITURES,
            limit=limit,
            **kwargs
        )
        
        # Parser les résultats
        listings = []
        regions = {}
        
        for ad in search_result.ads:
            # Extraire les données pertinentes
            listing = {
                "id": ad.id,
                "title": ad.subject,
                "price": int(ad.price) if ad.price else 0,
                "year": extract_attribute(ad, "regdate"),
                "mileage": extract_attribute(ad, "mileage"),
                "fuel": extract_fuel_label(extract_attribute(ad, "fuel")),
                "gearbox": extract_gearbox_label(extract_attribute(ad, "gearbox")),
                "location": ad.location.city if ad.location else "Inconnu",
                "zipcode": ad.location.zipcode if ad.location else "",
                "url": ad.url,
                "image": ad.images[0] if ad.images else None,
                "date": ad.first_publication_date if hasattr(ad, 'first_publication_date') else None,
            }
            
            # Compter par région (département)
            dept = listing["zipcode"][:2] if listing["zipcode"] else "Inconnu"
            regions[dept] = regions.get(dept, 0) + 1
            
            listings.append(listing)
        
        # Filtrer les résultats invalides (pas de prix)
        listings = [l for l in listings if l["price"] > 0]
        
        # Calculer les statistiques de prix AVEC filtrage des outliers
        prices = sorted([l["price"] for l in listings])
        
        if len(prices) > 0:
            # Calculer Q1, Q3 et IQR pour détecter les outliers
            q1_index = int(len(prices) * 0.25)
            q3_index = int(len(prices) * 0.75)
            q1 = prices[q1_index]
            q3 = prices[q3_index]
            iqr = q3 - q1
            
            # Filtrer les outliers (valeurs > Q3 + 1.5*IQR ou < Q1 - 1.5*IQR)
            lower_bound = max(0, q1 - 1.5 * iqr)
            upper_bound = q3 + 1.5 * iqr
            
            filtered_prices = [p for p in prices if lower_bound <= p <= upper_bound]
            
            # Si trop de filtrage, garder au moins les percentiles 5-95
            if len(filtered_prices) < len(prices) * 0.5:
                # Fallback : garder percentiles 5-95 sans filtrage IQR
                filtered_prices = prices[int(len(prices) * 0.05):int(len(prices) * 0.95)+1]
            
            if len(filtered_prices) > 0:
                median = filtered_prices[len(filtered_prices) // 2]
                min_price = filtered_prices[0]
            else:
                median = min_price = 0
            
            # Moyenne haute = 95e percentile de TOUS les prix (pas filtrés)
            # Cela reflète mieux la réalité du marché
            p95_index = min(int(len(prices) * 0.95), len(prices) - 1)
            max_price = prices[p95_index]
        else:
            median = min_price = max_price = 0
        
        # Trier par pertinence (prix proche de la médiane)
        if median > 0:
            listings.sort(key=lambda x: abs(x["price"] - median))
        
        # Construire le résultat
        result = {
            "success": True,
            "total": len(listings),
            "filters": {
                "brand": brand,
                "model": model,
                "year_range": f"{year-2} - {year+2}" if year else None,
                "mileage_range": f"{max(0, mileage-20000)} - {mileage+20000} km" if mileage else None,
                "fuel_type": fuel_type,
                "gearbox_type": gearbox_type,
            },
            "priceRange": {
                "min": int(min_price),
                "median": int(median),
                "max": int(max_price),
            },
            "regions": regions,
            "listings": listings[:limit],  # Top résultats
        }
        
        return result
        
    except Exception as e:
        import traceback
        return {
            "success": False,
            "error": str(e),
            "traceback": traceback.format_exc(),
        }

def extract_attribute(ad, key):
    """Extraire un attribut depuis l'objet Ad"""
    try:
        if hasattr(ad, 'attributes') and ad.attributes:
            for attr in ad.attributes:
                if hasattr(attr, 'key') and attr.key == key:
                    return int(attr.value) if attr.value else None
        return None
    except:
        return None

def extract_fuel_label(fuel_code):
    """Convertir le code carburant en label"""
    fuel_labels = {
        1: "Essence",
        2: "Diesel",
        3: "GPL",
        4: "Électrique",
        5: "E85",
        6: "Hybride",
    }
    return fuel_labels.get(fuel_code, "Inconnu")

def extract_gearbox_label(gearbox_code):
    """Convertir le code boîte en label"""
    gearbox_labels = {
        1: "Manuelle",
        2: "Automatique",
        3: "Robotisée",
    }
    return gearbox_labels.get(gearbox_code, "Inconnu")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Recherche Leboncoin via lib lbc")
    parser.add_argument("brand", help="Marque du véhicule")
    parser.add_argument("model", help="Modèle du véhicule")
    parser.add_argument("year", type=int, help="Année du véhicule")
    parser.add_argument("--mileage", type=int, help="Kilométrage approximatif")
    parser.add_argument("--fuel-type", help="Type de carburant (ESSENCE, DIESEL, ELECTRIQUE, etc.)")
    parser.add_argument("--gearbox-type", help="Type de boîte (MANUELLE, AUTOMATIQUE, ROBOTISEE)")
    parser.add_argument("--year-margin", type=int, default=2, help="Marge sur l'année (défaut: 2)")
    parser.add_argument("--mileage-margin", type=int, default=20000, help="Marge sur le kilométrage (défaut: 20000)")
    parser.add_argument("--region", help="Code région (ex: 1, 8, 13, etc.)")
    parser.add_argument("--limit", type=int, default=50, help="Nombre de résultats max")
    
    args = parser.parse_args()
    
    result = search_leboncoin(
        args.brand,
        args.model,
        args.year,
        args.mileage,
        args.fuel_type,
        args.gearbox_type,
        args.year_margin,
        args.mileage_margin,
        args.region,
        args.limit
    )
    
    # Afficher le résultat en JSON
    print(json.dumps(result, ensure_ascii=False, indent=2))
