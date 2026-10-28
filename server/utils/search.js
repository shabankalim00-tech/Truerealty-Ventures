import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const propertiesFile = path.resolve(__dirname, '../data/properties.json');

let cachedProperties = null;

function loadProperties() {
  if (cachedProperties) return cachedProperties;
  try {
    const raw = fs.readFileSync(propertiesFile, 'utf-8');
    cachedProperties = JSON.parse(raw);
    return cachedProperties;
  } catch (err) {
    console.error('Failed to load properties.json:', err);
    return [];
  }
}

/**
 * Format currency to Indian standards (Lakhs, Crores, or Monthly Rent)
 */
export function formatIndianPrice(amount, transactionType = 'Buy') {
  if (!amount && amount !== 0) return 'Price on Request';
  if (transactionType === 'Rent' || amount <= 200000) {
    return `₹ ${Number(amount).toLocaleString('en-IN')} / month`;
  }
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹ ${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (amount >= 100000) {
    const lac = amount / 100000;
    return `₹ ${lac.toFixed(2).replace(/\.00$/, '')} Lakhs`;
  }
  return `₹ ${Number(amount).toLocaleString('en-IN')}`;
}

/**
 * Check if property matches the location criteria
 */
function matchesLocation(prop, locKey, locName) {
  if (!locKey && !locName) return true;

  const textToSearch = `${prop.cityName || ''} ${prop.localityName || ''} ${prop.address || ''} ${prop.title || ''}`.toLowerCase();

  if (locKey === 'greater-noida') {
    return textToSearch.includes('greater noida') || textToSearch.includes('pari chowk');
  }

  if (locKey === 'noida') {
    // If user specifically requested Noida, prefer Noida properties; but also allow Greater Noida if needed
    return textToSearch.includes('noida');
  }

  if (locKey === 'gurgaon') {
    return textToSearch.includes('gurgaon') || textToSearch.includes('gurugram') || textToSearch.includes('sector 65') || textToSearch.includes('sector 92');
  }

  if (locKey === 'delhi') {
    return textToSearch.includes('delhi');
  }

  if (locKey === 'mumbai') {
    return textToSearch.includes('mumbai') || textToSearch.includes('bandra');
  }

  if (locKey === 'bangalore') {
    return textToSearch.includes('bangalore') || textToSearch.includes('bengaluru') || textToSearch.includes('whitefield');
  }

  if (locKey === 'goa') {
    return textToSearch.includes('goa') || textToSearch.includes('assagao');
  }

  // Generic name match
  const target = (locName || locKey).toLowerCase();
  return textToSearch.includes(target);
}

/**
 * Filter properties based on extracted entities
 */
export function searchProperties(entities = {}) {
  const properties = loadProperties();

  const {
    location,
    locationKey,
    bedrooms,
    propertyType,
    transactionType,
    minPrice,
    maxPrice,
    amenities = [],
  } = entities;

  // Filter with strict matching
  const exactMatches = properties.filter((p) => {
    // 1. Location match
    if (location || locationKey) {
      if (!matchesLocation(p, locationKey, location)) return false;
    }

    // 2. Transaction Type match (Buy vs Rent)
    if (transactionType) {
      if (p.transactionType && p.transactionType.toLowerCase() !== transactionType.toLowerCase()) {
        return false;
      }
    }

    // 3. Bedrooms / BHK match
    if (bedrooms) {
      if (p.bedrooms !== bedrooms) {
        return false;
      }
    }

    // 4. Property Type match
    if (propertyType) {
      if (p.propertyType && p.propertyType.toLowerCase() !== propertyType.toLowerCase()) {
        return false;
      }
    }

    // 5. Budget constraints
    if (maxPrice && p.price > maxPrice) {
      return false;
    }
    if (minPrice && p.price < minPrice) {
      return false;
    }

    return true;
  });

  // Score and enrich properties with formatted price and client URL
  const enrichedResults = exactMatches.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    propertyType: p.propertyType,
    transactionType: p.transactionType,
    price: p.price,
    formattedPrice: formatIndianPrice(p.price, p.transactionType),
    pricePerSqFt: p.pricePerSqFt ? `₹ ${p.pricePerSqFt.toLocaleString('en-IN')}/sq.ft` : null,
    area: p.area ? `${p.area} sq.ft` : null,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    cityName: p.cityName,
    localityName: p.localityName,
    address: p.address,
    possession: p.possession,
    developerName: p.developerName,
    reraNumber: p.reraNumber,
    isDemo: !!p.isDemo,
    image: (p.images && p.images[0]) || '/listings/wal-serenia92/image_1.png',
    detailUrl: `/properties/${p.slug}`,
  }));

  return {
    exactMatches: enrichedResults,
    totalFound: enrichedResults.length,
    criteria: entities,
  };
}

/**
 * Relaxed search when exact match returns 0 properties
 */
export function getAlternativeRecommendations(entities = {}) {
  const properties = loadProperties();
  const { locationKey, location, propertyType, transactionType } = entities;

  // Try matching just location or property type
  const alternatives = properties.filter((p) => {
    if (transactionType && p.transactionType !== transactionType) return false;
    if (location || locationKey) {
      return matchesLocation(p, locationKey, location);
    }
    if (propertyType) {
      return p.propertyType.toLowerCase() === propertyType.toLowerCase();
    }
    return true;
  }).slice(0, 3);

  return alternatives.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    propertyType: p.propertyType,
    transactionType: p.transactionType,
    price: p.price,
    formattedPrice: formatIndianPrice(p.price, p.transactionType),
    bedrooms: p.bedrooms,
    cityName: p.cityName,
    localityName: p.localityName,
    isDemo: !!p.isDemo,
    image: (p.images && p.images[0]) || '/listings/wal-serenia92/image_1.png',
    detailUrl: `/properties/${p.slug}`,
  }));
}
