import PageIntro from '@/components/sections/PageIntro';
import VehicleGrid from '@/components/sections/VehicleGrid';
import Faq from '@/components/sections/Faq';
import JsonLd from '@/components/ui/JsonLd';
import vehicles from '@/data/vehicles.json';
import faqs from '@/data/faqs.json';
import { buildMetadata } from '@/lib/seo';
import { faqSchema, vehicleListSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Vehicles for Rent With Driver',
  description:
    'Sedans, SUVs and tempo travellers available with experienced drivers. Compare seats, day and hourly rates, then book the one you want on WhatsApp.',
  path: '/vehicles',
  keywords: [
    'Innova Crysta rental',
    'Scorpio booking with driver',
    'tempo traveller hire',
    'Swift Dzire taxi rate',
  ],
});

export default function VehiclesPage() {
  return (
    <>
      <PageIntro
        title="Choose the Right Vehicle for Your Journey"
        description="From compact family cars to spacious group travel, we have vehicles for different group sizes, destinations and travel requirements."
      />

      <VehicleGrid
        vehicles={vehicles}
        title="Our fleet"
        description={null}
        align="left"
        headingLevel="h2"
        spacing="tight"
        page="Vehicles page"
      />

      <Faq faqs={faqs} />

      <JsonLd
        schemas={[
          vehicleListSchema(vehicles),
          faqSchema(faqs),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Vehicles', href: '/vehicles' },
          ]),
        ]}
      />
    </>
  );
}
