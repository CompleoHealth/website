import type { Express } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { contactFormSchema } from "@shared/schema";
import { COMPLEO_LOCATIONS } from "@shared/location-data";
import { sendContactEmail } from "./email-service";
import { z } from "zod";
import { generateSitemap } from "@/lib/sitemap";
import { ORGANIZATION_SCHEMA, MEDICAL_ORGANIZATION_SCHEMA, generateStructuredData } from "@/lib/structured-data";
import { generateRobotsTxt } from "@/components/common/robots-txt";
import DOMPurify from 'isomorphic-dompurify';
// Operational routes removed

export async function registerRoutes(app: Express): Promise<Server> {
  // Strict rate limiting for contact form (5 requests per 15 minutes)
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
      error: 'Too many contact form submissions. Please wait 15 minutes before trying again.',
      retryAfter: 900, // 15 minutes in seconds
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {

      res.status(429).json({
        error: 'Too many contact form submissions. Please wait 15 minutes before trying again.',
        retryAfter: 900,
      });
    },
  });

  // Contact form email endpoint with strict rate limiting and input sanitization
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      // First validate with Zod schema
      const contactData = contactFormSchema.parse(req.body);
      
      // Additional input sanitization for security
      const sanitizedData = {
        ...contactData,
        firstName: DOMPurify.sanitize(contactData.firstName, { ALLOWED_TAGS: [] }),
        lastName: DOMPurify.sanitize(contactData.lastName, { ALLOWED_TAGS: [] }),
        email: DOMPurify.sanitize(contactData.email, { ALLOWED_TAGS: [] }),
        phone: contactData.phone ? DOMPurify.sanitize(contactData.phone, { ALLOWED_TAGS: [] }) : contactData.phone,
        organization: contactData.organization ? DOMPurify.sanitize(contactData.organization, { ALLOWED_TAGS: [] }) : contactData.organization,
        role: contactData.role ? DOMPurify.sanitize(contactData.role, { ALLOWED_TAGS: [] }) : contactData.role,
        serviceInterest: contactData.serviceInterest ? DOMPurify.sanitize(contactData.serviceInterest, { ALLOWED_TAGS: [] }) : contactData.serviceInterest,
        message: contactData.message ? DOMPurify.sanitize(contactData.message, { 
          ALLOWED_TAGS: ['p', 'br', 'strong', 'em'], 
          ALLOWED_ATTR: [] 
        }) : contactData.message
      };
      
      const emailSent = await sendContactEmail(sanitizedData);
      
      if (emailSent) {
        res.json({ success: true, message: "Contact form submitted successfully" });
      } else {
        res.status(500).json({ error: "Failed to send email" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid contact data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to process contact form" });
      }
    }
  });

  // Handle old deprecated URLs with 410 Gone status for SEO cleanup
  app.get('/about/our-employees/', (req, res) => {
    res.status(410).send(`
      <!DOCTYPE html>
      <html><head><title>Page No Longer Available | Compleo Health</title></head>
      <body>
        <h1>Page No Longer Available</h1>
        <p>This page has been permanently removed. Please visit <a href="/our-team">Our Team</a> instead.</p>
      </body></html>
    `);
  });

  app.get('/mobile-units/', (req, res) => {
    res.status(410).send(`
      <!DOCTYPE html>
      <html><head><title>Page No Longer Available | Compleo Health</title></head>
      <body>
        <h1>Page No Longer Available</h1>
        <p>This page has been permanently removed. Please visit <a href="/equipment-details">Equipment Details</a> instead.</p>
      </body></html>
    `);
  });

  app.get('/solutions/', (req, res) => {
    res.status(410).send(`
      <!DOCTYPE html>
      <html><head><title>Page No Longer Available | Compleo Health</title></head>
      <body>
        <h1>Page No Longer Available</h1>
        <p>This page has been permanently removed. Please visit <a href="/services">Our Services</a> instead.</p>
      </body></html>
    `);
  });

  // Location routes - using static data
  app.get("/api/locations", async (req, res) => {
    try {
      res.json(COMPLEO_LOCATIONS);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  // SEO and sitemap routes - using centralized sitemap system
  app.get("/sitemap.xml", (req, res) => {
    const sitemap = generateSitemap();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(sitemap);
  });

  app.get("/robots.txt", (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(generateRobotsTxt());
  });

  app.get("/api/structured-data/organization", (req, res) => {
    res.json(ORGANIZATION_SCHEMA);
  });

  app.get("/api/structured-data/medical-organization", (req, res) => {
    res.json(MEDICAL_ORGANIZATION_SCHEMA);
  });

  // Operational dashboard API routes removed

  const httpServer = createServer(app);
  return httpServer;
}
