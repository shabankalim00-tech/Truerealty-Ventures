import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { createRateLimiter } from '../middleware/rateLimiter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const leadsFile = path.resolve(__dirname, '../data/leads.json');

const router = express.Router();

// Rate limit: 15 lead submissions per 5 minutes per IP
const leadLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 15,
  message: 'Lead submission limit reached. Please wait before submitting another inquiry.',
});

/**
 * Clean and validate Indian 10-digit phone number
 */
function validateIndianPhone(phoneInput) {
  if (!phoneInput || typeof phoneInput !== 'string') return null;
  // Remove spaces, dashes, parentheses, +91, 91, or leading 0
  let cleaned = phoneInput.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }

  // Must be exactly 10 digits starting with 6, 7, 8, or 9
  if (/^[6-9]\d{9}$/.test(cleaned)) {
    return cleaned;
  }
  return null;
}

// POST /api/leads - Create new verified lead
router.post('/', leadLimiter, async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      query,
      preferredTime = 'Immediate / Any Time',
      consent,
      propertyId = null,
      propertyTitle = null,
    } = req.body || {};

    // 1. Explicit Consent check
    if (consent !== true) {
      return res.status(400).json({
        success: false,
        error: 'CONSENT_REQUIRED',
        message: 'Explicit consent is required to process your request and connect you with a property advisor.',
      });
    }

    // 2. Name validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_NAME',
        message: 'Please provide a valid full name (minimum 2 characters).',
      });
    }

    // 3. Phone validation
    const validPhone = validateIndianPhone(phone);
    if (!validPhone) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_PHONE',
        message: 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).',
      });
    }

    // 4. Email validation (if provided)
    if (email && typeof email === 'string' && email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          error: 'INVALID_EMAIL',
          message: 'Please provide a valid email address.',
        });
      }
    }

    // 5. Construct lead record
    const leadRecord = {
      id: `lead_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
      name: name.trim(),
      phone: `+91 ${validPhone}`,
      email: email ? email.trim() : null,
      preferredTime: preferredTime.trim(),
      query: query ? query.trim() : 'General Inquiry via AI Assistant',
      propertyId,
      propertyTitle,
      consent: true,
      consentTimestamp: new Date().toISOString(),
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    // 6. Persist to leads.json
    let existingLeads = [];
    try {
      if (fs.existsSync(leadsFile)) {
        const raw = fs.readFileSync(leadsFile, 'utf-8');
        existingLeads = JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read existing leads file, creating fresh array:', e.message);
      existingLeads = [];
    }

    existingLeads.push(leadRecord);
    fs.writeFileSync(leadsFile, JSON.stringify(existingLeads, null, 2), 'utf-8');

    return res.status(201).json({
      success: true,
      data: {
        leadId: leadRecord.id,
        name: leadRecord.name,
        phone: leadRecord.phone,
        message: 'Thank you! Your request has been confirmed. Our senior property advisor will contact you shortly.',
      },
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return res.status(500).json({
      success: false,
      error: 'PERSISTENCE_ERROR',
      message: 'Failed to record your lead. Please try again or call our direct helpline.',
    });
  }
});

// GET /api/leads - Admin view of leads
router.get('/', (req, res) => {
  try {
    if (!fs.existsSync(leadsFile)) {
      return res.json({ success: true, leads: [] });
    }
    const raw = fs.readFileSync(leadsFile, 'utf-8');
    const leads = JSON.parse(raw);
    return res.json({ success: true, count: leads.length, leads });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'READ_ERROR' });
  }
});

export default router;
