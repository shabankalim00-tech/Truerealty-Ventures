import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to mockData.js in src/data
const mockDataPath = path.resolve(__dirname, '../../src/data/mockData.js');
const outputPath = path.resolve(__dirname, '../data/properties.json');
const leadsPath = path.resolve(__dirname, '../data/leads.json');

async function sync() {
  console.log('Loading mockData from:', mockDataPath);
  const mockData = await import(`file://${mockDataPath.replace(/\\/g, '/')}`);

  const { CITIES, LOCALITIES, DEVELOPERS, PROPERTIES } = mockData;

  const cityMap = new Map(CITIES.map(c => [c._id, c]));
  const localityMap = new Map(LOCALITIES.map(l => [l._id, l]));
  const devMap = new Map(DEVELOPERS.map(d => [d._id, d]));

  const enrichedProperties = PROPERTIES.map(p => {
    const city = cityMap.get(p.city) || CITIES.find(c => c.slug === p.city) || { name: 'Unknown', slug: '' };
    const locality = localityMap.get(p.locality) || LOCALITIES.find(l => l.slug === p.locality) || { name: 'Unknown', slug: '' };
    const dev = devMap.get(p.developer) || DEVELOPERS.find(d => d.slug === p.developer) || { name: 'Unknown', slug: '' };

    return {
      _id: p._id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      propertyType: p.propertyType,
      transactionType: p.transactionType || 'Buy',
      price: p.price,
      pricePerSqFt: p.pricePerSqFt,
      area: p.area,
      carpetArea: p.carpetArea,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      balconies: p.balconies,
      floor: p.floor,
      totalFloors: p.totalFloors,
      furnishing: p.furnishing,
      facing: p.facing,
      possession: p.possession,
      reraNumber: p.reraNumber,
      address: p.address,
      featured: !!p.featured,
      verified: !!p.verified,
      isDemo: !!p.isDemo,
      status: p.status || 'PUBLISHED',
      images: p.images || [],
      amenities: p.amenities || [],
      cityId: p.city,
      cityName: city.name,
      citySlug: city.slug,
      localityId: p.locality,
      localityName: locality.name,
      localitySlug: locality.slug,
      developerName: dev.name,
    };
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(enrichedProperties, null, 2), 'utf-8');
  console.log(`Successfully synced ${enrichedProperties.length} properties to ${outputPath}`);

  if (!fs.existsSync(leadsPath)) {
    fs.writeFileSync(leadsPath, JSON.stringify([], null, 2), 'utf-8');
    console.log(`Initialized empty leads file at ${leadsPath}`);
  }
}

sync().catch(err => {
  console.error('Error syncing properties:', err);
  process.exit(1);
});
