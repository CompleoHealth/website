import { Request, Response } from 'express';

// Define all website routes for sitemap generation
const routes = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/services', changefreq: 'weekly', priority: '0.9' },
  { url: '/services/managed-equipment', changefreq: 'weekly', priority: '0.8' },
  { url: '/services/equipment-rentals', changefreq: 'weekly', priority: '0.8' },
  { url: '/services/clinical-insourcing', changefreq: 'weekly', priority: '0.8' },
  { url: '/services/mobile-imaging', changefreq: 'weekly', priority: '0.8' },
  { url: '/services/community-diagnostic-centres', changefreq: 'weekly', priority: '0.8' },
  { url: '/services/screening-programs', changefreq: 'weekly', priority: '0.8' },
  { url: '/equipment', changefreq: 'weekly', priority: '0.8' },
  { url: '/equipment-details', changefreq: 'weekly', priority: '0.8' },
  { url: '/patient-portal', changefreq: 'weekly', priority: '0.7' },
  { url: '/sustainability', changefreq: 'monthly', priority: '0.7' },
  { url: '/news-and-views', changefreq: 'weekly', priority: '0.7' },
  { url: '/about', changefreq: 'monthly', priority: '0.7' },
  { url: '/our-team', changefreq: 'monthly', priority: '0.6' },
  { url: '/careers', changefreq: 'weekly', priority: '0.6' },
  { url: '/case-studies', changefreq: 'weekly', priority: '0.6' },
  { url: '/case-studies/dartford-gravesham', changefreq: 'monthly', priority: '0.5' },
  { url: '/contact', changefreq: 'monthly', priority: '0.8' },
  { url: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { url: '/cookie-policy', changefreq: 'yearly', priority: '0.3' },
  { url: '/csr', changefreq: 'yearly', priority: '0.3' },
  { url: '/modern-slavery-statement', changefreq: 'yearly', priority: '0.3' },
  { url: '/accessibility', changefreq: 'yearly', priority: '0.3' },
];

// Generate XML sitemap
export function generateSitemap(req: Request, res: Response) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const currentDate = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  routes.forEach(route => {
    sitemap += `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.send(sitemap);
}

// Generate robots.txt
export function generateRobots(req: Request, res: Response) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  const robots = `User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Disallow admin and development paths
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /node_modules/
Disallow: /.git/
Disallow: /dist/
Disallow: /build/`;

  res.setHeader('Content-Type', 'text/plain');
  res.send(robots);
}