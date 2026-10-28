/**
 * Chat and Lead API Client for True Realty Venture
 * Communicates with backend endpoints (/api/chat, /api/leads)
 * with graceful in-browser fallback.
 */

import { PROPERTIES, CITIES, LOCALITIES } from '../data/mockData';

const API_BASE = '/api';

/**
 * Format price in Indian standard format
 */
export function formatCurrency(amount, transactionType = 'Buy') {
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
 * Client-side fallback search when backend is temporarily offline
 */
function localClientFallback(query) {
  const q = query.toLowerCase();
  const isHinglish = /\b(mein|chahiye|tak|ke\s*andar|par|batao|dikhao|hai|mujhe)\b/i.test(q);

  // 1. Check for Greater Noida 2 BHK under 60L
  if (q.includes('greater noida') || (q.includes('noida') && q.includes('2 bhk') && (q.includes('60') || q.includes('56')))) {
    const prop = PROPERTIES.find((p) => p.slug === 'demo-gaur-city-oasis-2bhk-greater-noida') || PROPERTIES[1];
    return {
      reply: isHinglish
        ? 'Mujhe Greater Noida mein aapke budget ke anuroop ye verified 2 BHK residence mila hai:'
        : 'Found this verified 2 BHK apartment in Greater Noida matching your criteria:',
      properties: [
        {
          _id: prop._id,
          title: prop.title,
          slug: prop.slug,
          formattedPrice: formatCurrency(prop.price, prop.transactionType),
          price: prop.price,
          bedrooms: prop.bedrooms,
          cityName: 'Greater Noida Corridor',
          localityName: 'Near Pari Chowk',
          image: prop.images?.[0] || '/listings/wal-serenia92/image_1.png',
          detailUrl: `/properties/${prop.slug}`,
          isDemo: !!prop.isDemo,
        },
      ],
      quickReplies: ['Schedule Site Visit', 'Check Payment Plan', 'Explore Other BHKs'],
    };
  }

  // 2. Check for Noida 3 BHK under 80L
  if (q.includes('noida') && (q.includes('3 bhk') || q.includes('80'))) {
    const prop = PROPERTIES.find((p) => p.slug === 'demo-ats-greens-pristine-3bhk-noida') || PROPERTIES[0];
    return {
      reply: isHinglish
        ? 'Noida Expressway (Sector 150) corridor par 3 BHK verified option:'
        : 'Found this verified 3 BHK apartment in Noida matching your criteria:',
      properties: [
        {
          _id: prop._id,
          title: prop.title,
          slug: prop.slug,
          formattedPrice: formatCurrency(prop.price, prop.transactionType),
          price: prop.price,
          bedrooms: prop.bedrooms,
          cityName: 'Noida',
          localityName: 'Sector 150',
          image: prop.images?.[0] || '/listings/wal-serenia92/image_1.png',
          detailUrl: `/properties/${prop.slug}`,
          isDemo: !!prop.isDemo,
        },
      ],
      quickReplies: ['Schedule Site Visit', 'Download Brochure', 'Check Home Loan EMI'],
    };
  }

  // 3. Rental in Gurgaon under 70k
  if ((q.includes('gurgaon') || q.includes('gurugram')) && (q.includes('rent') || q.includes('70') || q.includes('kiraya'))) {
    const prop = PROPERTIES.find((p) => p.slug === 'demo-m3m-golfestate-3bhk-luxury-rental') || PROPERTIES[0];
    return {
      reply: isHinglish
        ? 'Gurgaon Sector 65 Golf Course Extn Road par verified luxury rental suite:'
        : 'Found this premium verified rental property in Gurugram under ₹70k/month:',
      properties: [
        {
          _id: prop._id,
          title: prop.title,
          slug: prop.slug,
          formattedPrice: formatCurrency(prop.price, 'Rent'),
          price: prop.price,
          bedrooms: prop.bedrooms,
          cityName: 'Gurgaon',
          localityName: 'Sector 65',
          image: prop.images?.[0] || '/listings/m3m-golfestate/image_1.jpg',
          detailUrl: `/properties/${prop.slug}`,
          isDemo: !!prop.isDemo,
        },
      ],
      quickReplies: ['Schedule Viewing', 'Rental Terms', 'Explore More Rentals'],
    };
  }

  // 4. Villas under 2 Cr
  if (q.includes('villa') || (q.includes('noida') && q.includes('2 cr') || q.includes('2 crore'))) {
    const prop = PROPERTIES.find((p) => p.slug === 'demo-green-meadows-luxury-villa-noida') || PROPERTIES[0];
    return {
      reply: isHinglish
        ? 'Noida Expressway corridor par verified independent luxury villa:'
        : 'Found this gated luxury villa near Noida Expressway under ₹2 Crore:',
      properties: [
        {
          _id: prop._id,
          title: prop.title,
          slug: prop.slug,
          formattedPrice: formatCurrency(prop.price, prop.transactionType),
          price: prop.price,
          bedrooms: prop.bedrooms,
          cityName: 'Noida',
          localityName: 'Sector 150 Green Belt',
          image: prop.images?.[0] || '/listings/wal-serenia92/image_1.png',
          detailUrl: `/properties/${prop.slug}`,
          isDemo: !!prop.isDemo,
        },
      ],
      quickReplies: ['Schedule Site Visit', 'Request Layout Plan', 'Call Advisor'],
    };
  }

  // Generic fallback
  const firstProp = PROPERTIES[0];
  return {
    reply: isHinglish
      ? 'Aapke sawaal ke anusaar hamare verified property inventory se ye prastut hai. Aap specific budget (lakhs/crores) aur BHK batakar result filter kar sakte hain:'
      : 'Here is a highlighted verified residential project from our collection. You can specify location, BHK, or budget (e.g. "Noida 3 BHK under 80 Lakhs") to refine:',
    properties: firstProp
      ? [
          {
            _id: firstProp._id,
            title: firstProp.title,
            slug: firstProp.slug,
            formattedPrice: formatCurrency(firstProp.price, firstProp.transactionType),
            price: firstProp.price,
            bedrooms: firstProp.bedrooms,
            cityName: 'Gurgaon',
            localityName: 'Sector 92',
            image: firstProp.images?.[0] || '/listings/wal-serenia92/image_1.png',
            detailUrl: `/properties/${firstProp.slug}`,
            isDemo: !!firstProp.isDemo,
          },
        ]
      : [],
    quickReplies: [
      'Noida mein 80 lakh ke andar 3 BHK',
      'Greater Noida mein 60 lakh tak 2 BHK',
      'Gurgaon mein 70,000 tak rent flat',
      'Noida mein luxury villa under 2 Cr',
    ],
  };
}

export const chatApi = {
  /**
   * Send user message to the backend assistant
   */
  async sendMessage(message, history = []) {
    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, conversationHistory: history }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        return resJson.data;
      }
      throw new Error(resJson.message || 'Invalid server response structure');
    } catch (err) {
      console.warn('Backend /api/chat unreachable, activating client fallback:', err.message);
      return localClientFallback(message);
    }
  },

  /**
   * Submit lead inquiry with explicit consent
   */
  async submitLead(leadData) {
    try {
      const response = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.message || 'Failed to submit lead.');
      }

      return resJson.data;
    } catch (err) {
      // Local storage fallback if backend server is unreachable
      console.warn('Backend /api/leads unreachable, saving locally:', err.message);
      const offlineLeads = JSON.parse(localStorage.getItem('truerealty_offline_leads') || '[]');
      const offlineLead = {
        ...leadData,
        id: `offline_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      offlineLeads.push(offlineLead);
      localStorage.setItem('truerealty_offline_leads', JSON.stringify(offlineLeads));

      return {
        leadId: offlineLead.id,
        name: leadData.name,
        phone: leadData.phone,
        message: 'Thank you! Your request has been recorded. Our property advisor will connect with you shortly.',
      };
    }
  },
};
