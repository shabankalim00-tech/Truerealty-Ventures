// ============================================================================
// LISTING API (Dedicated API for all Property & Real Estate Listings)
// ============================================================================

import {
  CITIES,
  LOCALITIES,
  DEVELOPERS,
  PROJECTS,
  PROPERTIES,
} from '../data/mockData';

// Local storage helper
function getStored(key, defaultVal) {
  try {
    const val = localStorage.getItem(`truerealty_v2_${key}`);
    if (!val) return defaultVal;
    const parsed = JSON.parse(val);
    if (Array.isArray(defaultVal) && Array.isArray(parsed)) {
      // Merge any new default items that don't exist in parsed localStorage yet
      const parsedIds = new Set(parsed.map((item) => item._id || item.slug));
      const newItems = defaultVal.filter((item) => !parsedIds.has(item._id) && !parsedIds.has(item.slug));
      return [...parsed, ...newItems];
    }
    return parsed;
  } catch (e) {
    return defaultVal;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(`truerealty_v2_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

// Master lists
let propertiesList = getStored('properties', PROPERTIES);
let projectsList = getStored('projects', PROJECTS);
let developersList = DEVELOPERS;
let citiesList = CITIES;
let localitiesList = LOCALITIES;
let favoritesList = getStored('favorites', [PROPERTIES[0]?._id, PROPERTIES[1]?._id].filter(Boolean));

// Helper: Populate Property Relations
export function populateProperty(p) {
  if (!p) return null;
  const cityObj = citiesList.find((c) => c._id === p.city || c.slug === p.city) || { name: 'Gurgaon', slug: 'gurgaon', state: 'Haryana' };
  const localityObj = localitiesList.find((l) => l._id === p.locality || l.slug === p.locality) || { name: 'Sector 65', slug: 'sector-65' };
  const developerObj = developersList.find((d) => d._id === p.developer || d.slug === p.developer) || { name: 'M3M India', slug: 'm3m-india', rating: 4.9 };
  const projectObj = projectsList.find((prj) => prj._id === p.project || prj.slug === p.project) || null;

  return {
    ...p,
    city: cityObj,
    locality: localityObj,
    developer: developerObj,
    project: projectObj,
  };
}

// Helper: Populate Project Relations
export function populateProject(prj) {
  if (!prj) return null;
  const cityObj = citiesList.find((c) => c._id === prj.city || c.slug === prj.city) || { name: 'Gurgaon', slug: 'gurgaon' };
  const localityObj = localitiesList.find((l) => l._id === prj.locality || l.slug === prj.locality) || { name: 'Sector 65', slug: 'sector-65' };
  const developerObj = developersList.find((d) => d._id === prj.developer || d.slug === prj.developer) || { name: 'M3M India', slug: 'm3m-india' };

  return {
    ...prj,
    city: cityObj,
    locality: localityObj,
    developer: developerObj,
  };
}

// ==========================================
// LISTING API METHODS
// ==========================================
export const listingApi = {
  // 1. Get all properties with filtering, search, sorting & pagination
  async getProperties(params = {}) {
    await new Promise((r) => setTimeout(r, 60));
    let filtered = [...propertiesList];

    const {
      featured,
      search,
      city,
      locality,
      propertyType,
      transactionType,
      minPrice,
      maxPrice,
      bedrooms,
      sort = 'relevance',
      page = 1,
      limit = 12,
    } = params;

    if (featured === 'true' || featured === true) {
      filtered = filtered.filter((p) => p.featured);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.address?.toLowerCase().includes(q)
      );
    }
    if (city) {
      const cDoc = citiesList.find((c) => c.slug === city.toLowerCase() || c.name.toLowerCase() === city.toLowerCase() || c._id === city);
      if (cDoc) {
        filtered = filtered.filter((p) => p.city === cDoc._id || p.city === cDoc.slug);
      }
    }
    if (locality) {
      const lDoc = localitiesList.find((l) => l.slug === locality.toLowerCase() || l.name.toLowerCase() === locality.toLowerCase() || l._id === locality);
      if (lDoc) {
        filtered = filtered.filter((p) => p.locality === lDoc._id || p.locality === lDoc.slug);
      }
    }
    if (propertyType) {
      const types = Array.isArray(propertyType) ? propertyType : propertyType.split(',').map((t) => t.trim());
      filtered = filtered.filter((p) => types.includes(p.propertyType));
    }
    if (transactionType) {
      filtered = filtered.filter((p) => p.transactionType?.toLowerCase() === transactionType.toLowerCase());
    }
    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }
    if (bedrooms) {
      filtered = filtered.filter((p) => p.bedrooms === Number(bedrooms));
    }

    // Sort
    if (sort === 'price_asc' || sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc' || sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'area' || sort === 'area-high') {
      filtered.sort((a, b) => b.area - a.area);
    } else if (sort === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    const total = filtered.length;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const totalPages = Math.ceil(total / limitNum) || 1;
    const paginated = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum).map(populateProperty);

    return {
      success: true,
      data: { properties: paginated },
      pagination: { page: pageNum, limit: limitNum, total, totalPages },
    };
  },

  // 2. Get Single Property by Slug or ID
  async getPropertyBySlug(slug) {
    await new Promise((r) => setTimeout(r, 60));
    const prop = propertiesList.find((p) => p.slug === slug || p._id === slug);
    if (!prop) {
      throw { statusCode: 404, message: 'Property not found' };
    }
    const populated = populateProperty(prop);
    const similar = propertiesList
      .filter((p) => p._id !== prop._id)
      .slice(0, 4)
      .map(populateProperty);

    return {
      success: true,
      data: { property: populated, similarProperties: similar },
    };
  },

  // 3. Create Property
  async createProperty(propertyData) {
    await new Promise((r) => setTimeout(r, 60));
    const newProp = {
      _id: `prop-${Date.now()}`,
      ...propertyData,
      slug: propertyData.slug || propertyData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    propertiesList = [newProp, ...propertiesList];
    setStored('properties', propertiesList);
    return { success: true, data: { property: newProp } };
  },

  // 4. Update Property
  async updateProperty(id, propertyData) {
    await new Promise((r) => setTimeout(r, 60));
    propertiesList = propertiesList.map((p) => (p._id === id ? { ...p, ...propertyData } : p));
    setStored('properties', propertiesList);
    return { success: true, data: { property: propertyData } };
  },

  // 5. Delete Property
  async deleteProperty(id) {
    await new Promise((r) => setTimeout(r, 60));
    propertiesList = propertiesList.filter((p) => p._id !== id);
    setStored('properties', propertiesList);
    return { success: true };
  },

  // 6. Favorites
  async getFavorites() {
    await new Promise((r) => setTimeout(r, 60));
    const favProps = propertiesList.filter((p) => favoritesList.includes(p._id)).map(populateProperty);
    return { success: true, data: { favorites: favProps } };
  },

  async addFavorite(propertyId) {
    if (propertyId && !favoritesList.includes(propertyId)) {
      favoritesList = [...favoritesList, propertyId];
      setStored('favorites', favoritesList);
    }
    return { success: true, message: 'Added to favorites' };
  },

  async removeFavorite(propertyId) {
    favoritesList = favoritesList.filter((id) => id !== propertyId);
    setStored('favorites', favoritesList);
    return { success: true, message: 'Removed from favorites' };
  },

  // 7. Projects
  async getProjects(params = {}) {
    await new Promise((r) => setTimeout(r, 60));
    let filtered = [...projectsList];
    if (params.featured === 'true' || params.featured === true) filtered = filtered.filter((p) => p.featured);
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((p) => p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    const limit = parseInt(params.limit || '50', 10);
    return {
      success: true,
      data: { projects: filtered.slice(0, limit).map(populateProject) },
    };
  },

  async getProjectBySlug(slug) {
    await new Promise((r) => setTimeout(r, 60));
    const prj = projectsList.find((p) => p.slug === slug || p._id === slug);
    if (!prj) throw { statusCode: 404, message: 'Project not found' };
    const populated = populateProject(prj);
    const units = propertiesList.filter((p) => p.project === prj._id || p.project === prj.slug).map(populateProperty);
    const similar = projectsList.filter((p) => p._id !== prj._id).slice(0, 3).map(populateProject);
    return {
      success: true,
      data: { project: populated, units, similarProjects: similar },
    };
  },

  // 8. Cities
  async getCities(params = {}) {
    await new Promise((r) => setTimeout(r, 60));
    let result = [...citiesList];
    if (params.popular === 'true' || params.popular === true) result = result.filter((c) => c.popular);
    return { success: true, data: { cities: result } };
  },

  async getCityBySlug(slug) {
    await new Promise((r) => setTimeout(r, 60));
    const city = citiesList.find((c) => c.slug === slug || c._id === slug);
    if (!city) throw { statusCode: 404, message: 'City not found' };
    const cityLocs = localitiesList.filter((l) => l.city === city._id || l.city === city.slug);
    const cityProps = propertiesList.filter((p) => p.city === city._id || p.city === city.slug).map(populateProperty);
    const cityPrjs = projectsList.filter((p) => p.city === city._id || p.city === city.slug).map(populateProject);
    return {
      success: true,
      data: {
        city,
        localities: cityLocs,
        properties: cityProps,
        projects: cityPrjs,
        developers: developersList.slice(0, 6),
      },
    };
  },

  // 9. Developers
  async getDevelopers(params = {}) {
    await new Promise((r) => setTimeout(r, 60));
    let filtered = [...developersList];
    if (params.featured === 'true' || params.featured === true) filtered = filtered.filter((d) => d.featured);
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter((d) => d.name?.toLowerCase().includes(q) || d.description?.toLowerCase().includes(q));
    }
    const limit = parseInt(params.limit || '50', 10);
    return { success: true, data: { developers: filtered.slice(0, limit) } };
  },

  async getDeveloperBySlug(slug) {
    await new Promise((r) => setTimeout(r, 60));
    const dev = developersList.find((d) => d.slug === slug || d._id === slug);
    if (!dev) throw { statusCode: 404, message: 'Developer not found' };
    const devProjects = projectsList.filter((p) => p.developer === dev._id || p.developer === dev.slug).map(populateProject);
    const devProperties = propertiesList.filter((p) => p.developer === dev._id || p.developer === dev.slug).map(populateProperty);
    return {
      success: true,
      data: { developer: dev, projects: devProjects, properties: devProperties },
    };
  },
};

export default listingApi;
