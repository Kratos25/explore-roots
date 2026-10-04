import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import VehicleGrid from '@/components/sections/VehicleGrid';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import PackageGrid from '@/components/sections/PackageGrid';
import Faq from '@/components/sections/Faq';
import PhotoGallery from '@/components/sections/PhotoGallery';
import JsonLd from '@/components/ui/JsonLd';
import vehicles from '@/data/vehicles.json';
import packages from '@/data/packages.json';
import faqs from '@/data/faqs.json';
import { buildMetadata } from '@/lib/seo';
import { faqSchema, vehicleListSchema, packageListSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Car Rental With Drivers & North East India Tour Packages',
  description:
    'Book a well-maintained car with an experienced driver in Guwahati, or take a full tour package across Assam, Meghalaya, Arunachal Pradesh and Nagaland. Confirm on WhatsApp in minutes.',
  path: '/',
  keywords: ['book cab with driver Guwahati', 'North East tour operator', 'Assam car rental'],
});

const featuredVehicles = vehicles.filter((v) => v.featured);
const featuredPackages = packages.filter((p) => p.featured);
const homeFaqs = faqs.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <VehicleGrid
        vehicles={featuredVehicles}
        layout="carousel"
        viewAllHref="/vehicles"
        page="Home page"
      />
      <WhyChooseUs />
      <PackageGrid packages={featuredPackages} layout="carousel" viewAllHref="/travel-packages" />
      <Faq faqs={homeFaqs} />
      <PhotoGallery />

      <JsonLd
        schemas={[
          faqSchema(homeFaqs),
          vehicleListSchema(featuredVehicles, '/vehicles'),
          packageListSchema(featuredPackages),
        ]}
      />
    </>
  );
}
