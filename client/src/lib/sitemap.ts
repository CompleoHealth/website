export interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export const SITEMAP_URLS: SitemapURL[] = [
  {
    loc: '/',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    loc: '/services',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    loc: '/services/managed-equipment',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: '/services/clinical-insourcing',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: '/services/equipment-rental',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: '/services/mobile-imaging',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: '/services/community-diagnostic-centres',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: '/services/screening-programmes',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    loc: '/equipment',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.7'
  },

  {
    loc: '/sustainability',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    loc: '/news-and-views',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.6'
  },
  {
    loc: '/about',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    loc: '/equipment-details',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    loc: '/net-zero-goals',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    loc: '/our-team',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.5'
  },
  {
    loc: '/work-with-us',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.5'
  },
  {
    loc: '/case-studies',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.7'
  },
  {
    loc: '/case-study/dartford-gravesham',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    loc: '/team-member/beverley-wallace',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    loc: '/team-member/james-berry',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    loc: '/team-member/paula-moore',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    loc: '/team-member/claire-zeki',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    loc: '/team-member/cordelia-wilson',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    loc: '/team-member/david-uregbula',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    loc: '/team-member/candice-martin',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    loc: '/team-member/carsten-nyborg',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.4'
  },
  {
    loc: '/contact',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.6'
  },
  {
    loc: '/privacy-policy',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.3'
  },
  {
    loc: '/cookie-policy',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.3'
  },
  {
    loc: '/csr',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.3'
  },
  {
    loc: '/modern-slavery-statement',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.3'
  },
  {
    loc: '/policies',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.3'
  },
  {
    loc: '/accessibility',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.3'
  },
  {
    loc: '/sitemap',
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.4'
  },
  {
    loc: '/manage-cookies',
    lastmod: new Date().toISOString(),
    changefreq: 'yearly',
    priority: '0.3'
  }
];

export function generateSitemap(): string {
  const baseUrl = 'https://www.compleohealth.com';
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  SITEMAP_URLS.forEach(url => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${url.loc}</loc>\n`;
    sitemap += `    <lastmod>${url.lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${url.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  return sitemap;
}