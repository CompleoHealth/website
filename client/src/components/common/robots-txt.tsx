export const ROBOTS_TXT = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.compleohealth.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /login

# Allow important pages
Allow: /
Allow: /services
Allow: /services/*
Allow: /equipment

Allow: /about
Allow: /contact
Allow: /sustainability
Allow: /news-and-views
Allow: /case-studies
Allow: /work-with-us
Allow: /our-team
Allow: /privacy-policy
Allow: /csr

# Allow CSS, JS, and images
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.gif
Allow: /*.svg
Allow: /*.webp
Allow: /*.ico

# Performance optimizations
Allow: /*.woff
Allow: /*.woff2
Allow: /*.ttf
Allow: /*.eot

# Block development files
Disallow: /*.map
Disallow: /src/
Disallow: /node_modules/
Disallow: /.git/
Disallow: /.env
Disallow: /.replit
Disallow: /package.json
Disallow: /tsconfig.json
Disallow: /vite.config.ts
Disallow: /tailwind.config.ts
`;

export function generateRobotsTxt(): string {
  return ROBOTS_TXT;
}