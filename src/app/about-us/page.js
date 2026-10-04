import AboutIntro from '@/components/sections/AboutIntro';
import Faq from '@/components/sections/Faq';
import JsonLd from '@/components/ui/JsonLd';
import faqs from '@/data/faqs.json';
import { buildMetadata } from '@/lib/seo';
import { faqSchema, breadcrumbSchema, organizationSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'About Us',
  description:
    'Explore Roots is a local driver-driven car rental and travel service. Ten years on the road, 15+ drivers and 25+ vehicles for local trips and multi-day journeys.',
  path: '/about-us',
  keywords: ['local travel company', 'driver driven car rental service', 'about Explore Roots'],
});

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <Faq faqs={faqs} />

      <JsonLd
        schemas={[
          organizationSchema(),
          faqSchema(faqs),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'About Us', href: '/about-us' },
          ]),
        ]}
      />
    </>
  );
}
