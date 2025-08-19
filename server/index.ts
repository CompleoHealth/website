import express, { type Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import crypto from "crypto";

const app = express();

// Configure trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// Security headers middleware with enhanced CSP
app.use((req, res, next) => {
  // Generate nonce for inline scripts
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonce;

  // Enhanced Content Security Policy - specific trusted domains only
  const cspPolicy = [
    "default-src 'self'",
    // Allow specific trusted domains for scripts, still permissive for map/dev but more restrictive
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.linkedin.com https://platform.linkedin.com https://cdn.jsdelivr.net https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://unpkg.com https://cdnjs.cloudflare.com",
    // Restrict images to specific trusted domains plus map tile servers
    "img-src 'self' data: blob: https://flagcdn.com https://www.gov.uk https://www.england.nhs.uk https://www.siemens-healthineers.com https://marketing.webassets.siemens-healthineers.com https://assets.nhs.uk https://www.compleohealth.com https://compleohealth.com https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org https://tiles.wmflabs.org",
    "media-src 'self' https://www.compleohealth.com https://compleohealth.com",
    "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
    // Specific endpoints for map functionality
    "connect-src 'self' https://*.basemaps.cartocdn.com https://raw.githubusercontent.com https://*.tile.openstreetmap.org https://tiles.wmflabs.org",
    "frame-src 'self' https://www.linkedin.com https://platform.linkedin.com",
    "object-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    // Upgrade insecure requests
    "upgrade-insecure-requests"
  ].join('; ');

  // Enhanced security headers
  res.setHeader('Content-Security-Policy', cspPolicy);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=(), usb=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  next();
});

// Rate limiting middleware
const createRateLimiter = (windowMs: number, max: number, message: string) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: message,
      retryAfter: Math.ceil(windowMs / 1000),
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      log(`Rate limit exceeded for ${req.ip} on ${req.path}`, 'security');
      res.status(429).json({
        error: message,
        retryAfter: Math.ceil(windowMs / 1000),
      });
    },
  });
};

// General API rate limiting (100 requests per 15 minutes)
const generalLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100,
  'Too many requests from this IP, please try again later.'
);

// Strict rate limiting for contact form (5 requests per 15 minutes)
const contactLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5,
  'Too many contact form submissions. Please wait 15 minutes before trying again.'
);

// Apply general rate limiting to all routes
app.use('/api', generalLimiter);

// Export contactLimiter for use in specific routes
export { contactLimiter };

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files with proper MIME types for videos
app.use('/videos', express.static('public/videos', {
  setHeaders: (res, path) => {
    if (path.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    }
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
