import { SITE_URL } from '@/lib/config';

/** Generates /robots.txt at build time. */
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
