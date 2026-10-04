import { SITE_URL } from '@/lib/config';
import packages from '@/data/packages.json';

/** Generates /sitemap.xml at build time, including one entry per package. */
export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/vehicles', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/travel-packages', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about-us', priority: 0.6, changeFrequency: 'monthly' },
  ];

  const packageRoutes = packages.map((pkg) => ({
    path: `/travel-packages/${pkg.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }));

  return [...staticRoutes, ...packageRoutes].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
