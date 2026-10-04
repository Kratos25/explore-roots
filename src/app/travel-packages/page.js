import PageIntro from '@/components/sections/PageIntro';
import PackageGrid from '@/components/sections/PackageGrid';
import PhotoGallery from '@/components/sections/PhotoGallery';
import Faq from '@/components/sections/Faq';
import JsonLd from '@/components/ui/JsonLd';
import packages from '@/data/packages.json';
import faqs from '@/data/faqs.json';
import { buildMetadata } from '@/lib/seo';
import { faqSchema, packageListSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'North East India Tour Packages',
  description:
    'Multi-day tour packages across Assam, Meghalaya, Arunachal Pradesh, Nagaland and Sikkim — private vehicle, experienced driver, hotels and daily breakfast included.',
  path: '/travel-packages',
  keywords: [
    'All Assam tour package',
    'All Meghalaya grand tour',
    'Arunachal Pradesh 21 day tour',
    'Hornbill Festival 2026 package',
    'Sikkim tour package',
  ],
});

export default function TravelPackagesPage() {
  return (
    <>
      <PageIntro
        title="Explore Popular Destinations"
        description="Planning a road trip? Explore destinations near you with a comfortable, driver-driven vehicle from Explore Roots."
      />

      <PackageGrid
        packages={packages}
        title="Packages we run"
        description={null}
        align="left"
        headingLevel="h2"
        spacing="tight"
      />

      <PhotoGallery />
      <Faq faqs={faqs} />

      <JsonLd
        schemas={[
          packageListSchema(packages),
          faqSchema(faqs),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Travel Packages', href: '/travel-packages' },
          ]),
        ]}
      />
    </>
  );
}
