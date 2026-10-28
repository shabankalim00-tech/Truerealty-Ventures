/**
 * Comprehensive Backend Test Suite for True Realty AI Property Assistant
 */

import app from './index.js';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const leadsFile = path.resolve(__dirname, 'data/leads.json');

const TEST_PORT = 5099;
let server = null;

function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = http.request({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('--- Starting True Realty AI Backend Automated Tests ---');

  // Start test server
  await new Promise((res) => {
    server = app.listen(TEST_PORT, () => {
      console.log(`Test server running on port ${TEST_PORT}`);
      res();
    });
  });

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    console.log('\n[1/5] Testing Health Check Endpoint:');
    const healthRes = await makeRequest('/api/health');
    assert(healthRes.status === 200, 'Health endpoint returns 200');
    assert(healthRes.body.status === 'ok', 'Health status is ok');

    // 2. The 4 Required Property Queries
    console.log('\n[2/5] Testing 4 Required Real-Estate Queries (English + Hinglish):');

    // Query 1: Noida 3 BHK under 80 Lakhs
    const q1 = await makeRequest('/api/chat', 'POST', {
      message: 'Noida mein 80 lakh ke andar 3 BHK chahiye.',
    });
    assert(q1.status === 200, 'Query 1 returns 200');
    const q1Props = q1.body?.data?.properties || [];
    assert(q1Props.length > 0, 'Query 1 returned property recommendations');
    assert(q1Props[0]?.slug === 'demo-ats-greens-pristine-3bhk-noida', 'Query 1 matches ATS Greens Pristine');
    assert(q1Props[0]?.price <= 8000000, 'Query 1 price is under 80 Lakhs');

    // Query 2: Greater Noida 2 BHK under 60 Lakhs
    const q2 = await makeRequest('/api/chat', 'POST', {
      message: 'Show me 2 BHK flats in Greater Noida under 60 lakh.',
    });
    assert(q2.status === 200, 'Query 2 returns 200');
    const q2Props = q2.body?.data?.properties || [];
    assert(q2Props.length > 0, 'Query 2 returned property recommendations');
    assert(q2Props[0]?.slug === 'demo-gaur-city-oasis-2bhk-greater-noida', 'Query 2 matches Gaur City Oasis');
    assert(q2Props[0]?.price <= 6000000, 'Query 2 price is under 60 Lakhs');

    // Query 3: Gurgaon Rental under 70k
    const q3 = await makeRequest('/api/chat', 'POST', {
      message: 'Gurgaon mein 70,000 per month tak rental property.',
    });
    assert(q3.status === 200, 'Query 3 returns 200');
    const q3Props = q3.body?.data?.properties || [];
    assert(q3Props.length > 0, 'Query 3 returned rental property');
    assert(q3Props[0]?.slug === 'demo-m3m-golfestate-3bhk-luxury-rental', 'Query 3 matches M3M Golfestate Rental');
    assert(q3Props[0]?.transactionType === 'Rent', 'Query 3 matches Rent transactionType');

    // Query 4: Noida Villa under 2 Crore
    const q4 = await makeRequest('/api/chat', 'POST', {
      message: 'Show villas near Noida under 2 crore.',
    });
    assert(q4.status === 200, 'Query 4 returns 200');
    const q4Props = q4.body?.data?.properties || [];
    assert(q4Props.length > 0, 'Query 4 returned villa property');
    assert(q4Props[0]?.slug === 'demo-green-meadows-luxury-villa-noida', 'Query 4 matches Green Meadows Villa');
    assert(q4Props[0]?.propertyType === 'Villa', 'Query 4 matches propertyType Villa');

    // 3. No-Results / Zero-Match Handling
    console.log('\n[3/5] Testing No-Results Case:');
    const qZero = await makeRequest('/api/chat', 'POST', {
      message: 'Noida mein 15 lakh ke andar 4 BHK villa chahiye.',
    });
    assert(qZero.status === 200, 'Zero-result query returns 200 without crashing');
    assert((qZero.body?.data?.properties || []).length === 0, 'Zero properties returned for impossible budget');
    assert(typeof qZero.body?.data?.reply === 'string', 'Helpful conversational explanation provided');

    // 4. Input Validation & Error Handling
    console.log('\n[4/5] Testing Input Validation:');
    const qInvalid = await makeRequest('/api/chat', 'POST', { message: '   ' });
    assert(qInvalid.status === 400, 'Empty message rejected with 400');
    assert(qInvalid.body?.error === 'INVALID_INPUT', 'Correct error code for invalid input');

    // 5. Lead Generation & Persistence
    console.log('\n[5/5] Testing Lead Capture & Persistence:');

    // Missing consent
    const leadNoConsent = await makeRequest('/api/leads', 'POST', {
      name: 'Rohan Sharma',
      phone: '9876543210',
      consent: false,
    });
    assert(leadNoConsent.status === 400, 'Rejects lead without explicit consent');
    assert(leadNoConsent.body?.error === 'CONSENT_REQUIRED', 'Error specifies CONSENT_REQUIRED');

    // Invalid phone
    const leadBadPhone = await makeRequest('/api/leads', 'POST', {
      name: 'Rohan Sharma',
      phone: '12345',
      consent: true,
    });
    assert(leadBadPhone.status === 400, 'Rejects lead with invalid phone number');
    assert(leadBadPhone.body?.error === 'INVALID_PHONE', 'Error specifies INVALID_PHONE');

    // Valid lead
    const validLead = await makeRequest('/api/leads', 'POST', {
      name: 'Rohan Sharma',
      phone: '+91 9876543210',
      email: 'rohan.sharma@example.com',
      query: 'Interested in ATS Greens Pristine 3 BHK Noida',
      preferredTime: 'Evening 6 PM',
      consent: true,
      propertyId: 'prop-demo-1',
      propertyTitle: 'ATS Greens Pristine',
    });
    assert(validLead.status === 201, 'Valid lead created with 201');
    assert(validLead.body?.data?.leadId, 'Lead ID returned to client');

    // Verify written to disk
    const diskLeads = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'));
    const saved = diskLeads.find(l => l.id === validLead.body?.data?.leadId);
    assert(!!saved, 'Lead was persisted successfully to server/data/leads.json');
    assert(saved?.phone === '+91 9876543210', 'Persisted phone is properly normalized');

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    if (server) {
      server.close();
      console.log('\nTest server shut down.');
    }
    console.log(`\n========================================`);
    console.log(`Tests Finished: ${passed} Passed, ${failed} Failed`);
    console.log(`========================================`);
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
