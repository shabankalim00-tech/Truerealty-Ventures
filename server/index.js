import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import chatRouter from './routes/chat.js';
import leadsRouter from './routes/leads.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend development and production
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'True Realty AI Property Assistant Backend',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'),
  });
});

// Mount Routes
app.use('/api/chat', chatRouter);
app.use('/api/leads', leadsRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected internal error occurred.',
  });
});

// Start Server if directly executed
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(` True Realty AI Property Assistant Backend is Running `);
    console.log(` Server URL : http://localhost:${PORT}`);
    console.log(` Health     : http://localhost:${PORT}/api/health`);
    console.log(` Chat API   : http://localhost:${PORT}/api/chat`);
    console.log(` Leads API  : http://localhost:${PORT}/api/leads`);
    console.log(`=======================================================`);
  });
}

export default app;
