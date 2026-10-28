/**
 * Advanced Real Estate Natural Language Understanding (NLU) Engine
 * Specially designed for True Realty Venture, supporting English & Hinglish queries.
 */

// City and Locality Mappings
const LOCATION_PATTERNS = [
  { key: 'greater-noida', name: 'Greater Noida', regex: /\b(greater\s*noida|gr\s*noida|gnoida|pari\s*chowk|yamuna\s*expressway)\b/i },
  { key: 'noida', name: 'Noida', regex: /\b(noida|sector\s*150|noida\s*expressway)\b/i },
  { key: 'gurgaon', name: 'Gurgaon', regex: /\b(gurgaon|gurugram|golf\s*course|sohna\s*road|cyber\s*city|sector\s*(?:65|92|14|25))\b/i },
  { key: 'delhi', name: 'Delhi', regex: /\b(delhi|new\s*delhi|south\s*delhi|saket|vasant\s*kunj|hauz\s*khas|dwarka)\b/i },
  { key: 'mumbai', name: 'Mumbai', regex: /\b(mumbai|bombay|bandra|worli|andheri|juhu|bkc|powai)\b/i },
  { key: 'bangalore', name: 'Bangalore', regex: /\b(bangalore|bengaluru|whitefield|sarjapur|electronic\s*city|hebbal|indiranagar)\b/i },
  { key: 'goa', name: 'Goa', regex: /\b(goa|assagao|candolim|panaji|calangute|anjuna)\b/i },
  { key: 'hyderabad', name: 'Hyderabad', regex: /\b(hyderabad|hitec\s*city|gachibowli|jubilee\s*hills|banjara\s*hills|kokapet)\b/i },
  { key: 'pune', name: 'Pune', regex: /\b(pune|hinjewadi|baner|wakad|kharadi|koregaon)\b/i },
];

// Property Type Mappings
const PROPERTY_TYPE_PATTERNS = [
  { type: 'Villa', regex: /\b(villa|villas|independent\s*house|kothi|bungalow|row\s*house)\b/i },
  { type: 'Commercial', regex: /\b(commercial|office|shop|shops|retail|showroom|store)\b/i },
  { type: 'Plot', regex: /\b(plot|plots|land|residential\s*plot)\b/i },
  { type: 'Builder Floor', regex: /\b(builder\s*floor|independent\s*floor)\b/i },
  { type: 'Penthouse', regex: /\b(penthouse|penthouses)\b/i },
  { type: 'Apartment', regex: /\b(apartment|apartments|flat|flats|condo|high\s*rise|society)\b/i },
];

// Transaction Intent
const INTENT_PATTERNS = {
  Rent: /\b(rent|rental|kiraya|kiraye|rent\s*par|lease|per\s*month|\/month|mahina|mahine|monthly)\b/i,
  Buy: /\b(buy|purchase|kharidna|kharidne|kharid|lena\s*hai|invest|sale|buying)\b/i,
};

// Amenities
const AMENITY_PATTERNS = [
  { name: 'Swimming Pool', regex: /\b(pool|swimming\s*pool)\b/i },
  { name: 'Gymnasium', regex: /\b(gym|gymnasium|fitness)\b/i },
  { name: 'Clubhouse', regex: /\b(club|clubhouse)\b/i },
  { name: 'Power Backup', regex: /\b(power\s*backup|electricity\s*backup|generator)\b/i },
  { name: 'Gated Security', regex: /\b(security|gated|guard|cctv)\b/i },
  { name: 'Private Garden', regex: /\b(garden|park|greenery|lawn)\b/i },
  { name: 'Golf Course', regex: /\b(golf|golf\s*course|golfestate)\b/i },
  { name: 'Covered Parking', regex: /\b(parking|car\s*parking|garage)\b/i },
];

// Hinglish detection
const HINGLISH_WORDS = /\b(mein|chahiye|tak|ke\s*andar|par|batao|dikhao|hai|mujhe|kripya|kaise|kitna|hoga|bhi|aur|wale|wali|pasand|achha|ghar|kamre)\b/i;

/**
 * Parse numeric monetary amounts with Indian numbering (Lakhs, Crores, K, Thousands)
 */
function parsePrice(amountStr, unitStr) {
  const num = parseFloat(amountStr.replace(/,/g, ''));
  if (isNaN(num)) return null;

  const unit = (unitStr || '').toLowerCase().trim();
  if (unit.startsWith('cr')) {
    return Math.round(num * 10000000);
  }
  if (unit.startsWith('lakh') || unit.startsWith('lac') || unit === 'l') {
    return Math.round(num * 100000);
  }
  if (unit.startsWith('k') || unit.startsWith('hazar') || unit.startsWith('thousand')) {
    return Math.round(num * 1000);
  }
  // If no unit and amount is in thousands or small
  if (num >= 1000) return Math.round(num);
  // Default if raw small number without unit: e.g. "80" could mean 80 lakhs in real-estate context
  if (num > 0 && num <= 500) {
    return Math.round(num * 100000);
  }
  return Math.round(num);
}

/**
 * Extract Budget constraints from text
 */
function extractBudget(text) {
  let minPrice = null;
  let maxPrice = null;

  // Case 1: Range "between X and Y" / "X se Y (lakh/cr)" / "from X to Y"
  const rangeRegex = /(?:between|from|se)?\s*(?:rs\.?|inr|₹)?\s*([0-9]+(?:\.[0-9]+)?)\s*(cr|crore|crores|lakh|lakhs|lac|lacs|k)?\s*(?:to|and|-|se)\s*(?:rs\.?|inr|₹)?\s*([0-9]+(?:\.[0-9]+)?)\s*(cr|crore|crores|lakh|lakhs|lac|lacs|k)?\s*(?:ke\s*beech)?/i;
  const rangeMatch = text.match(rangeRegex);
  if (rangeMatch && rangeMatch[1] && rangeMatch[3]) {
    const val1 = rangeMatch[1];
    const unit1 = rangeMatch[2] || rangeMatch[4] || 'lakh';
    const val2 = rangeMatch[3];
    const unit2 = rangeMatch[4] || rangeMatch[2] || 'lakh';

    const p1 = parsePrice(val1, unit1);
    const p2 = parsePrice(val2, unit2);
    if (p1 && p2 && p1 !== p2) {
      minPrice = Math.min(p1, p2);
      maxPrice = Math.max(p1, p2);
      return { minPrice, maxPrice };
    }
  }

  // Case 2: Hindi suffix pattern ("80 lakh ke andar", "60 lakh tak", "70,000 per month tak", "80L tak")
  const hindiSuffixRegex = /(?:rs\.?|inr|₹)?\s*([0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?)\s*(cr|crore|crores|lakh|lakhs|lac|lacs|k|thousand)?\s*(?:per\s*month|\/month|\/mo|mahina)?\s*(?:ke\s*andar|tak|se\s*kam|se\s*neeche)/i;
  const hindiMatch = text.match(hindiSuffixRegex);
  if (hindiMatch) {
    const amountStr = hindiMatch[1];
    const unitStr = hindiMatch[2];
    const rawVal = parseFloat(amountStr.replace(/,/g, ''));
    if (!unitStr && rawVal >= 5000) {
      maxPrice = rawVal;
    } else {
      maxPrice = parsePrice(amountStr, unitStr);
    }
    return { minPrice, maxPrice };
  }

  // Case 3: English prefix pattern ("under 80 lakh", "below 60 lakh", "budget 80L", "upto 2 crore")
  const engPrefixRegex = /(?:under|below|max|upto|up\s*to|within|less\s*than|budget\s*(?:of|is|:)?)\s*(?:rs\.?|inr|₹)?\s*([0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?)\s*(cr|crore|crores|lakh|lakhs|lac|lacs|k|thousand)?/i;
  const engMatch = text.match(engPrefixRegex);
  if (engMatch) {
    const amountStr = engMatch[1];
    const unitStr = engMatch[2];
    const rawVal = parseFloat(amountStr.replace(/,/g, ''));
    if (!unitStr && rawVal >= 5000) {
      maxPrice = rawVal;
    } else {
      maxPrice = parsePrice(amountStr, unitStr);
    }
    return { minPrice, maxPrice };
  }

  // Case 4: Min budget ("above 50 lakh", "min 1 cr", "50 lakh se jyada")
  const minPatterns = [
    /(?:above|min|minimum|starting\s*(?:from|at)?|more\s*than)\s*(?:rs\.?|inr|₹)?\s*([0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?)\s*(cr|crore|crores|lakh|lakhs|lac|lacs|k|thousand)?/i,
    /(?:rs\.?|inr|₹)?\s*([0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?)\s*(cr|crore|crores|lakh|lakhs|lac|lacs|k|thousand)?\s*(?:se\s*jyada|se\s*upar|plus|\+)/i,
  ];

  for (const regex of minPatterns) {
    const match = text.match(regex);
    if (match) {
      minPrice = parsePrice(match[1], match[2]);
      break;
    }
  }

  return { minPrice, maxPrice };
}

/**
 * Extract Bedrooms / BHK from text
 */
function extractBedrooms(text) {
  // Matches "3 BHK", "2bhk", "4 bedroom", "3 kamre", "2 bed"
  const bhkMatch = text.match(/\b([1-6])\s*(?:bhk|bedroom|bedrooms|bed|kamre|kamra)\b/i);
  if (bhkMatch) {
    return parseInt(bhkMatch[1], 10);
  }
  // Matches standalone "3bhk" without space
  const compactMatch = text.match(/\b([1-6])bhk\b/i);
  if (compactMatch) {
    return parseInt(compactMatch[1], 10);
  }
  return null;
}

/**
 * Extract Location
 */
function extractLocation(text) {
  // Check Greater Noida first before Noida to avoid false positive
  for (const loc of LOCATION_PATTERNS) {
    if (loc.regex.test(text)) {
      return { key: loc.key, name: loc.name };
    }
  }
  return null;
}

/**
 * Extract Property Type
 */
function extractPropertyType(text) {
  for (const pt of PROPERTY_TYPE_PATTERNS) {
    if (pt.regex.test(text)) {
      return pt.type;
    }
  }
  return null;
}

/**
 * Extract Transaction Intent (Buy vs Rent)
 */
function extractTransactionType(text, maxPrice) {
  if (INTENT_PATTERNS.Rent.test(text)) {
    return 'Rent';
  }
  if (INTENT_PATTERNS.Buy.test(text)) {
    return 'Buy';
  }
  // If price is monthly scale (< 2.5 Lakhs) and mentions rent or per month
  if (maxPrice && maxPrice <= 250000 && /(per\s*month|\/mo|\/month|monthly)/i.test(text)) {
    return 'Rent';
  }
  return null;
}

/**
 * Extract Amenities
 */
function extractAmenities(text) {
  const matched = [];
  for (const item of AMENITY_PATTERNS) {
    if (item.regex.test(text)) {
      matched.push(item.name);
    }
  }
  return matched;
}

/**
 * Main NLU Parse function
 */
export function parseQuery(queryText = '') {
  const cleanText = queryText.trim();
  const isHinglish = HINGLISH_WORDS.test(cleanText);

  const location = extractLocation(cleanText);
  const { minPrice, maxPrice } = extractBudget(cleanText);
  const bedrooms = extractBedrooms(cleanText);
  const propertyType = extractPropertyType(cleanText);
  const transactionType = extractTransactionType(cleanText, maxPrice);
  const amenities = extractAmenities(cleanText);

  // Determine intent category
  let intent = 'property_search';
  if (/^(hi|hello|namaste|hey|good\s*(morning|afternoon|evening))\b/i.test(cleanText) && cleanText.length < 25) {
    intent = 'greeting';
  } else if (/\b(contact|call|agent|advisor|representative|phone\s*number|baat\s*karna)\b/i.test(cleanText)) {
    intent = 'speak_with_agent';
  } else if (/\b(loan|emi|home\s*loan|interest\s*rate)\b/i.test(cleanText)) {
    intent = 'loan_inquiry';
  }

  return {
    rawQuery: cleanText,
    isHinglish,
    intent,
    entities: {
      location: location ? location.name : null,
      locationKey: location ? location.key : null,
      bedrooms,
      propertyType,
      transactionType: transactionType || (propertyType === 'Commercial' ? 'Buy' : null),
      minPrice,
      maxPrice,
      amenities,
    },
  };
}
