import { listingApi } from './listingApi';
import { blogApi } from './blogApi';
import {
  INITIAL_LEADS,
  INITIAL_ENQUIRIES,
  INITIAL_SITE_VISITS,
  INITIAL_USERS,
} from '../data/mockData';

export { listingApi, blogApi };

// LocalStorage helpers for leads, enquiries, visits & users
function getStored(key, defaultVal) {
  try {
    const val = localStorage.getItem(`truerealty_${key}`);
    return val ? JSON.parse(val) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(`truerealty_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

let leads = getStored('leads', INITIAL_LEADS);
let enquiries = getStored('enquiries', INITIAL_ENQUIRIES);
let siteVisits = getStored('siteVisits', INITIAL_SITE_VISITS);
let users = getStored('users', INITIAL_USERS);
let currentUser = getStored('currentUser', users[0]);

// Central API router linking listingApi and blogApi with universal backwards compatibility
export const api = {
  listing: listingApi,
  blog: blogApi,

  get: async (url) => {
    const [path, queryString] = url.split('?');
    const params = Object.fromEntries(new URLSearchParams(queryString || ''));

    // --- 1. LISTINGS & PROPERTIES ---
    if (path === '/properties') {
      return listingApi.getProperties(params);
    }
    if (path.startsWith('/properties/')) {
      const slug = path.replace('/properties/', '');
      return listingApi.getPropertyBySlug(slug);
    }
    if (path === '/projects') {
      return listingApi.getProjects(params);
    }
    if (path.startsWith('/projects/')) {
      const slug = path.replace('/projects/', '');
      return listingApi.getProjectBySlug(slug);
    }
    if (path === '/cities') {
      return listingApi.getCities(params);
    }
    if (path.startsWith('/cities/')) {
      const slug = path.replace('/cities/', '');
      return listingApi.getCityBySlug(slug);
    }
    if (path.startsWith('/locations/')) {
      const [citySlug, localitySlug] = path.replace('/locations/', '').split('/');
      const cityRes = await listingApi.getCityBySlug(citySlug);
      const locality = cityRes.data.localities?.find((l) => l.slug === localitySlug) || { name: localitySlug };
      const locProps = cityRes.data.properties?.filter((p) => p.locality?.slug === localitySlug || p.locality === locality._id);
      const locPrjs = cityRes.data.projects?.filter((p) => p.locality?.slug === localitySlug || p.locality === locality._id);
      return {
        success: true,
        data: {
          city: cityRes.data.city,
          locality,
          properties: locProps,
          projects: locPrjs,
        },
      };
    }
    if (path === '/developers') {
      return listingApi.getDevelopers(params);
    }
    if (path.startsWith('/developers/')) {
      const slug = path.replace('/developers/', '');
      return listingApi.getDeveloperBySlug(slug);
    }
    if (path === '/favorites') {
      return listingApi.getFavorites();
    }

    // --- 2. BLOGS & ARTICLES ---
    if (path === '/blog') {
      return blogApi.getBlogs(params);
    }
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return blogApi.getBlogBySlug(slug);
    }

    // --- 3. AUTH & USER ---
    if (path === '/auth/me') {
      return { success: true, data: { user: currentUser } };
    }

    // --- 4. CRM & DASHBOARD ---
    if (path === '/admin/dashboard') {
      const propsRes = await listingApi.getProperties({ limit: 1000 });
      const prjsRes = await listingApi.getProjects();
      const devsRes = await listingApi.getDevelopers();
      return {
        success: true,
        data: {
          totalProperties: propsRes.data.properties?.length || 0,
          totalProjects: prjsRes.data.projects?.length || 0,
          totalDevelopers: devsRes.data.developers?.length || 0,
          totalLeads: leads.length,
          totalEnquiries: enquiries.length,
          totalSiteVisits: siteVisits.length,
          totalUsers: users.length,
          recentLeads: leads.slice(0, 5),
          recentEnquiries: enquiries.slice(0, 5),
        },
      };
    }

    if (path === '/leads') {
      const search = params.search || '';
      let list = [...leads];
      if (search) {
        const q = search.toLowerCase();
        list = list.filter((l) => l.name?.toLowerCase().includes(q) || l.phone?.includes(q) || l.email?.toLowerCase().includes(q));
      }
      return { success: true, data: { leads: list } };
    }
    if (path.startsWith('/leads/')) {
      const id = path.replace('/leads/', '');
      const lead = leads.find((l) => l._id === id);
      return { success: true, data: { lead } };
    }
    if (path === '/enquiries') {
      return { success: true, data: { enquiries } };
    }
    if (path === '/site-visits') {
      return { success: true, data: { siteVisits } };
    }
    if (path === '/admin/users') {
      return { success: true, data: { users } };
    }
    if (path === '/agents/dashboard') {
      return {
        success: true,
        data: {
          assignedLeads: leads.length,
          activeSiteVisits: siteVisits.length,
          leads: leads.slice(0, 5),
        },
      };
    }

    return { success: true, data: {} };
  },

  post: async (url, payload = {}) => {
    const [path] = url.split('?');

    // Listing operations
    if (path === '/properties') return listingApi.createProperty(payload);
    if (path === '/favorites') return listingApi.addFavorite(payload.propertyId);

    // Blog operations
    if (path === '/blog') return blogApi.createBlog(payload);

    // Lead / Enquiry / Site Visit submissions
    if (path === '/leads') {
      const newLead = {
        _id: `lead-${Date.now()}`,
        ...payload,
        status: 'NEW',
        createdAt: new Date().toISOString(),
        notes: [],
      };
      leads = [newLead, ...leads];
      setStored('leads', leads);
      return { success: true, message: 'Enquiry submitted successfully!', data: { lead: newLead } };
    }

    if (path === '/enquiries') {
      const newEnq = {
        _id: `enq-${Date.now()}`,
        ...payload,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };
      enquiries = [newEnq, ...enquiries];
      setStored('enquiries', enquiries);
      return { success: true, message: 'Enquiry submitted!', data: { enquiry: newEnq } };
    }

    if (path === '/site-visits') {
      const newVisit = {
        _id: `sv-${Date.now()}`,
        ...payload,
        status: 'REQUESTED',
        createdAt: new Date().toISOString(),
      };
      siteVisits = [newVisit, ...siteVisits];
      setStored('siteVisits', siteVisits);
      return { success: true, message: 'Site visit booked!', data: { siteVisit: newVisit } };
    }

    // Lead notes
    if (path.includes('/leads/') && path.endsWith('/notes')) {
      const leadId = path.split('/')[2];
      const lead = leads.find((l) => l._id === leadId);
      if (lead) {
        lead.notes = lead.notes || [];
        lead.notes.push({ text: payload.text, createdAt: new Date().toISOString() });
        setStored('leads', leads);
      }
      return { success: true, message: 'Note added' };
    }

    if (path === '/auth/logout') {
      currentUser = null;
      setStored('currentUser', null);
      return { success: true };
    }

    return { success: true, data: {} };
  },

  put: async (url, payload = {}) => {
    const [path] = url.split('?');
    if (path.startsWith('/properties/')) return listingApi.updateProperty(path.replace('/properties/', ''), payload);
    if (path.startsWith('/blog/')) return blogApi.updateBlog(path.replace('/blog/', ''), payload);
    if (path.startsWith('/leads/')) {
      const id = path.replace('/leads/', '');
      leads = leads.map((l) => (l._id === id ? { ...l, ...payload } : l));
      setStored('leads', leads);
      return { success: true };
    }
    if (path === '/auth/profile') {
      if (currentUser) {
        currentUser = { ...currentUser, ...payload };
        users = users.map((u) => (u._id === currentUser._id ? currentUser : u));
        setStored('users', users);
        setStored('currentUser', currentUser);
      }
      return { success: true, data: { user: currentUser } };
    }
    return { success: true };
  },

  patch: async (url, payload = {}) => {
    const [path] = url.split('?');
    if (path.startsWith('/enquiries/')) {
      const id = path.split('/')[2];
      enquiries = enquiries.map((e) => (e._id === id ? { ...e, ...payload } : e));
      setStored('enquiries', enquiries);
      return { success: true };
    }
    if (path.startsWith('/site-visits/')) {
      const id = path.split('/')[2];
      siteVisits = siteVisits.map((s) => (s._id === id ? { ...s, ...payload } : s));
      setStored('siteVisits', siteVisits);
      return { success: true };
    }
    if (path.startsWith('/admin/users/')) {
      const id = path.split('/')[3];
      users = users.map((u) => (u._id === id ? { ...u, ...payload } : u));
      setStored('users', users);
      return { success: true };
    }
    return { success: true };
  },

  delete: async (url) => {
    const [path] = url.split('?');
    if (path.startsWith('/properties/')) return listingApi.deleteProperty(path.replace('/properties/', ''));
    if (path.startsWith('/blog/')) return blogApi.deleteBlog(path.replace('/blog/', ''));
    if (path.startsWith('/favorites/')) return listingApi.removeFavorite(path.replace('/favorites/', ''));
    return { success: true };
  },
};

export default api;
