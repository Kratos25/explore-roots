import site from '@/data/site.json';

/**
 * Single place where environment values are read and normalised.
 * Everything else in the app imports from here.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.exploreroots.in'
).replace(/\/$/, '');

/** Digits only, international format. 91 = India. */
export const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'
).replace(/\D/g, '');

/** Empty string means "serve images from /public". */
export const IMAGE_CDN_URL = (process.env.NEXT_PUBLIC_IMAGE_CDN_URL || '').replace(/\/$/, '');

export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '';

export const siteConfig = site;

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
