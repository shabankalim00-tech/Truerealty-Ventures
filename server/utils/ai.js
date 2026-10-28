/**
 * Gemini AI Integration with Deterministic Local NLU Fallback
 * True Realty Venture - AI Property Assistant
 */

import { parseQuery } from './nlu.js';
import { searchProperties, getAlternativeRecommendations } from './search.js';

/**
 * Generate human-like conversational response using local template engine
 * when Gemini API key is not present or offline.
 */
function generateLocalResponse({ rawQuery, isHinglish, intent, entities, searchResult, alternatives }) {
  const { location, bedrooms, propertyType, transactionType, maxPrice, minPrice } = entities;
  const count = searchResult ? searchResult.totalFound : 0;

  // 1. Greeting Intent
  if (intent === 'greeting') {
    if (isHinglish) {
      return {
        message: 'Namaste! Main True Realty Venture ka AI Property Assistant hoon. Main aapko Gurgaon, Noida, Greater Noida, Delhi aur anya prime locations par verified properties dhoondhne mein madad kar sakta hoon. Aap kis tarah ki property dekh rahe hain?',
        quickReplies: [
          'Noida mein 80 lakh ke andar 3 BHK',
          'Greater Noida mein 60 lakh tak 2 BHK',
          'Gurgaon mein 70,000 tak rent flat',
          'Noida mein luxury villa under 2 Cr',
        ],
      };
    }
    return {
      message: 'Hello and welcome to True Realty Venture! I am your AI Property Assistant. I can help you find verified luxury residences, apartments, villas, and rentals across Delhi NCR. What kind of property are you looking for today?',
      quickReplies: [
        '3 BHK in Noida under 80 Lakhs',
        '2 BHK in Greater Noida under 60 Lakhs',
        'Rental property in Gurgaon under 70k',
        'Villas near Noida under 2 Crore',
      ],
    };
  }

  // 2. Speak with Advisor / Contact Intent
  if (intent === 'speak_with_agent') {
    if (isHinglish) {
      return {
        message: 'Aap hamare dedicated property advisor se seedhe connect kar sakte hain. Kripya niche diye gaye quick button se callback schedule karein ya apna contact number share karein.',
        action: 'open_lead_form',
        quickReplies: ['Schedule Site Visit', 'Request Free Callback', 'Explore Listings'],
      };
    }
    return {
      message: 'Our senior real estate advisors are available to guide you with verified project tours and bespoke deals. Would you like us to arrange a priority callback or site visit?',
      action: 'open_lead_form',
      quickReplies: ['Schedule Site Visit', 'Request Callback', 'Explore Listings'],
    };
  }

  // 3. Loan Inquiry
  if (intent === 'loan_inquiry') {
    if (isHinglish) {
      return {
        message: 'True Realty Venture top private & public banks (SBI, HDFC, ICICI, Axis) ke saath partnered hai jisse aapko lowest interest rates (starting ~8.50%) aur fast pre-approvals milte hain. Kya aap kisi specific project ke liye EMI estimate chahte hain?',
        quickReplies: ['Check Loan Eligibility', 'Speak with Loan Expert', 'View Properties'],
      };
    }
    return {
      message: 'True Realty Venture collaborates with leading banking institutions including SBI, HDFC, ICICI, and Axis Bank to offer competitive home loan rates starting at 8.50% with zero processing fee offers. Would you like a loan assistance callback?',
      quickReplies: ['Check Loan Eligibility', 'Speak with Loan Expert', 'View Properties'],
    };
  }

  // 4. Property Search Results
  if (count > 0) {
    const locText = location ? `${location}` : 'prime locations';
    const bhkText = bedrooms ? `${bedrooms} BHK ` : '';
    const typeText = propertyType ? `${propertyType}` : (bhkText ? 'residences' : 'properties');

    if (isHinglish) {
      let msg = `Mujhe aapke criteria ke mutabiq ${count} verified ${bhkText}${typeText} mili hai (${locText}):`;
      if (!bedrooms && !maxPrice) {
        msg += '\n\nAap apna specific budget aur BHK preference bhi share kar sakte hain taaki main aur accurate results dikha sakoon.';
      }
      return {
        message: msg,
        quickReplies: [
          'Schedule Site Visit',
          'Request Price Breakup',
          'Similar Properties',
        ],
      };
    }

    let msg = `Here are ${count} verified ${bhkText}${typeText} in ${locText} matching your requirements:`;
    if (!bedrooms && !maxPrice) {
      msg += '\n\nYou can also specify your target budget or number of bedrooms for narrower recommendations.';
    }
    return {
      message: msg,
      quickReplies: [
        'Schedule Site Visit',
        'Request Price Breakup',
        'Similar Properties',
      ],
    };
  }

  // 5. Zero Results Found - Grounded Explanation and Alternatives
  const budgetStr = maxPrice ? (maxPrice >= 10000000 ? `₹${maxPrice / 10000000} Cr` : (maxPrice >= 100000 ? `₹${maxPrice / 100000} Lakhs` : `₹${maxPrice.toLocaleString('en-IN')}`)) : '';
  const locStr = location || 'this location';

  if (isHinglish) {
    let msg = `Maaf kijiye, ${locStr} mein ${budgetStr ? `${budgetStr} ke andar ` : ''}${bedrooms ? `${bedrooms} BHK ` : ''}verified listing filhaal available nahi hai.`;
    if (alternatives && alternatives.length > 0) {
      msg += ` Lekin aap ye nearby verified options dekh sakte hain:`;
    } else {
      msg += ` Hamari team naye inventory daily verify karti hai. Aap apna contact share kar sakte hain jaise hi match aayega hum notify karenge.`;
    }
    return {
      message: msg,
      quickReplies: [
        'Broaden Budget',
        'Show Nearby Locations',
        'Request Callback',
      ],
    };
  }

  let msg = `We currently do not have a verified listing matching all those criteria in ${locStr}${budgetStr ? ` under ${budgetStr}` : ''}.`;
  if (alternatives && alternatives.length > 0) {
    msg += ` However, here are the closest verified alternatives available:`;
  } else {
    msg += ` Our advisory desk frequently adds verified inventory. Would you like our relationship manager to alert you when a match becomes available?`;
  }
  return {
    message: msg,
    quickReplies: [
      'Broaden Budget',
      'Show Nearby Locations',
      'Request Callback',
    ],
  };
}

/**
 * Call Gemini API or fallback to local NLU
 */
export async function processUserMessage(message = '', conversationHistory = []) {
  // First, parse entities using local high-precision NLU
  const localParsed = parseQuery(message);
  const searchResult = localParsed.intent === 'property_search' 
    ? searchProperties(localParsed.entities) 
    : { exactMatches: [], totalFound: 0 };

  const alternatives = (searchResult.totalFound === 0 && localParsed.intent === 'property_search')
    ? getAlternativeRecommendations(localParsed.entities)
    : [];

  const apiKey = process.env.GEMINI_API_KEY;

  // If Gemini API key is configured, attempt conversational enhancement
  if (apiKey && apiKey.trim() !== '' && apiKey !== 'your_gemini_api_key_here') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const prompt = `You are the official AI Property Assistant for True Realty Venture, an elite Indian real estate consultancy.
User Query: "${message}"
Detected Intent: ${localParsed.intent}
Is Hinglish/Hindi: ${localParsed.isHinglish}
Matched Properties from Database (${searchResult.totalFound}):
${JSON.stringify(searchResult.exactMatches.map(p => ({ title: p.title, price: p.formattedPrice, location: p.cityName, bedrooms: p.bedrooms })), null, 2)}

Instructions:
1. Provide a professional, warm response in 2-3 sentences.
2. If Hinglish/Hindi is used, respond in friendly, polished Hinglish. Otherwise, respond in fluent English.
3. GROUNDING RULE: Never invent properties, amenities, or pricing outside the provided data.
4. Output valid JSON in the format:
{
  "message": "...",
  "quickReplies": ["reply 1", "reply 2", "reply 3"]
}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 300,
            responseMimeType: 'application/json',
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResponse) {
          try {
            const aiData = JSON.parse(textResponse);
            return {
              reply: aiData.message,
              quickReplies: aiData.quickReplies || ['Schedule Site Visit', 'Request Callback', 'Explore More'],
              properties: searchResult.exactMatches,
              alternatives: searchResult.totalFound === 0 ? alternatives : [],
              entities: localParsed.entities,
              provider: 'gemini',
            };
          } catch (e) {
            // fallback if JSON parse fails
          }
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed or timed out, falling back to local NLU engine:', err.message);
    }
  }

  // Deterministic Local NLU Engine Fallback
  const localOutput = generateLocalResponse({
    rawQuery: localParsed.rawQuery,
    isHinglish: localParsed.isHinglish,
    intent: localParsed.intent,
    entities: localParsed.entities,
    searchResult,
    alternatives,
  });

  return {
    reply: localOutput.message,
    quickReplies: localOutput.quickReplies,
    action: localOutput.action || null,
    properties: searchResult.exactMatches,
    alternatives: searchResult.totalFound === 0 ? alternatives : [],
    entities: localParsed.entities,
    provider: 'local-nlu',
  };
}
