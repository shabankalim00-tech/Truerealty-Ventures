import express from 'express';
import { processUserMessage } from '../utils/ai.js';
import { createRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Rate limit: 40 chat messages per minute per IP
const chatLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 40,
  message: 'Chat request limit reached. Please wait a moment before sending another query.',
});

router.post('/', chatLimiter, async (req, res) => {
  try {
    const { message, conversationHistory } = req.body || {};

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_INPUT',
        message: 'Message must be a non-empty text string.',
      });
    }

    if (message.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'MESSAGE_TOO_LONG',
        message: 'Message cannot exceed 500 characters.',
      });
    }

    const safeHistory = Array.isArray(conversationHistory) ? conversationHistory.slice(-8) : [];
    const response = await processUserMessage(message.trim(), safeHistory);

    return res.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An error occurred while processing your property request. Please try again.',
    });
  }
});

export default router;
