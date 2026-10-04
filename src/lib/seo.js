import { SITE_URL, siteConfig, absoluteUrl } from './config';

/**
 * Builds a Next.js Metadata object for a page.
 * Handles title, description, canonical, Open Graph and Twitter in one call
 * so no page has to remember the full shape.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image = siteConfig.og.image,
  type = 'website',
  noIndex = false,
} = {}) {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...siteConfig.defaultKeywords, ...keywords],
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: 'en_IN',
      images: [
        {
          url: ogImage,
          width: siteConfig.og.width,
          height: siteConfig.og.height,
          alt: siteConfig.og.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export { SITE_URL };
