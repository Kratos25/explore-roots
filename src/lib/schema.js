import { siteConfig, absoluteUrl, SITE_URL } from './config';

/**
 * JSON-LD builders. Rendered by <JsonLd /> on each page so Google can read
 * the business details, the fleet, the packages and the FAQ answers.
 */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    '@id': `${SITE_URL}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: SITE_URL,
    logo: absoluteUrl(siteConfig.logo.src),
    image: absoluteUrl(siteConfig.og.image),
    description: siteConfig.shortDescription,
    slogan: siteConfig.tagline,
    telephone: siteConfig.contact.phoneDisplay,
    email: siteConfig.contact.email,
    priceRange: siteConfig.priceRange,
    openingHours: siteConfig.openingHours,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.rating.value,
      reviewCount: siteConfig.rating.count,
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(trail = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(faqs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function vehicleListSchema(vehicles = [], path = '/vehicles') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vehicles available for rent',
    itemListElement: vehicles.map((vehicle, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: vehicle.name,
        description: vehicle.bestFor,
        image: absoluteUrl(vehicle.image),
        category: vehicle.category,
        url: `${absoluteUrl(path)}#${vehicle.slug}`,
        offers: {
          '@type': 'Offer',
          price: vehicle.pricePerDay,
          priceCurrency: vehicle.currency,
          availability: 'https://schema.org/InStock',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: vehicle.pricePerDay,
            priceCurrency: vehicle.currency,
            unitCode: 'DAY',
          },
        },
      },
    })),
  };
}

export function packageListSchema(packages = [], path = '/travel-packages') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Travel packages',
    itemListElement: packages.map((pkg, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'TouristTrip',
        name: pkg.title,
        description: pkg.summary,
        image: absoluteUrl(pkg.images.card),
        url: absoluteUrl(`${path}/${pkg.slug}`),
      },
    })),
  };
}

/** Full detail schema for one package page. */
export function packageDetailSchema(pkg) {
  const lead = pkg.tiers.find((t) => t.default) || pkg.tiers[0];
  const url = absoluteUrl(`/travel-packages/${pkg.slug}`);

  const itinerary = pkg.itinerary?.length
    ? {
        '@type': 'ItemList',
        numberOfItems: pkg.itinerary.length,
        itemListElement: pkg.itinerary.map((day) => ({
          '@type': 'ListItem',
          position: day.day,
          item: {
            '@type': 'TouristDestination',
            name: day.title,
            description: day.description,
          },
        })),
      }
    : {
        '@type': 'ItemList',
        itemListElement: pkg.route.map((stop, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: { '@type': 'TouristDestination', name: stop },
        })),
      };

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${url}#trip`,
    name: pkg.title,
    description: pkg.metaDescription || pkg.summary,
    url,
    image: pkg.images.gallery.map((g) => absoluteUrl(g.image)),
    touristType: pkg.themes,
    provider: { '@id': `${SITE_URL}/#organization` },
    itinerary,
    aggregateRating: pkg.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: pkg.rating,
          reviewCount: pkg.reviewCount || 1,
        }
      : undefined,
    offers: pkg.tiers.map((tier) => ({
      '@type': 'Offer',
      name: `${tier.name} package`,
      price: tier.price,
      priceCurrency: pkg.currency || 'INR',
      availability: 'https://schema.org/InStock',
      url,
      itemOffered: {
        '@type': 'Service',
        name: `${pkg.title} — ${tier.name}`,
        description: pkg.includes.join(', '),
      },
    })),
    priceRange: `From ${lead.price} ${pkg.currency || 'INR'} per person`,
  };
}
