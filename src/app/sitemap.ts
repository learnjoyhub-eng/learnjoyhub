import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnjoyhub.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/subjects',
    '/english',
    '/english/play',
    '/maths',
    '/maths/addition',
    '/maths/subtraction',
    '/maths/multiplication',
    '/maths/multiplication/problems',
    '/maths/division',
    '/maths/division/problems',
    '/maths/tables',
    '/knowledge',
    '/knowledge/science',
    '/knowledge/gk',
    '/knowledge/health',
    '/numerology',
    '/terms',
    '/privacy',
  ];

  const tableRoutes = Array.from({ length: 20 }, (_, i) => `/maths/tables/${i + 1}`);

  return [...staticRoutes, ...tableRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
