/**
 * In-Memory Sliding Window Rate Limiter Middleware
 * Protects endpoints from flooding and abuse without requiring external Redis.
 */

const ipRequestMap = new Map();

// Default: max 50 requests per minute per IP
export function createRateLimiter({ windowMs = 60 * 1000, max = 50, message = 'Too many requests. Please try again after a minute.' } = {}) {
  // Periodic cleanup of stale entries every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of ipRequestMap.entries()) {
      const valid = timestamps.filter((t) => now - t < windowMs);
      if (valid.length === 0) {
        ipRequestMap.delete(ip);
      } else {
        ipRequestMap.set(ip, valid);
      }
    }
  }, 5 * 60 * 1000).unref();

  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();

    const timestamps = ipRequestMap.get(ip) || [];
    const recent = timestamps.filter((t) => now - t < windowMs);

    if (recent.length >= max) {
      return res.status(429).json({
        success: false,
        error: 'RATE_LIMIT_EXCEEDED',
        message,
        retryAfterSeconds: Math.ceil((recent[0] + windowMs - now) / 1000),
      });
    }

    recent.push(now);
    ipRequestMap.set(ip, recent);
    next();
  };
}
