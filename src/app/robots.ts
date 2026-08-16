import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnjoyhub.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/english/parent', '/english/child'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
