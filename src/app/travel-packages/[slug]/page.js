import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import PhotoGallery from '@/components/sections/PhotoGallery';
import PackageHero, { PackageFeatureImage } from '@/components/sections/package/PackageHero';
import PriceTiers from '@/components/sections/package/PriceTiers';
import PackageOverview from '@/components/sections/package/PackageOverview';
import PackageHighlights from '@/components/sections/package/PackageHighlights';
import Itinerary from '@/components/sections/package/Itinerary';
import StopHighlights from '@/components/sections/package/StopHighlights';
import PackageInclusions from '@/components/sections/package/PackageInclusions';
import JsonLd from '@/components/ui/JsonLd';
import packages from '@/data/packages.json';
import { buildMetadata } from '@/lib/seo';
import { packageDetailSchema, breadcrumbSchema } from '@/lib/schema';

/** One static page per package, built at `next build` time. */
export function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export function generateMetadata({ params }) {
  const pkg = packages.find((p) => p.slug === params.slug);
  if (!pkg) return buildMetadata({ title: 'Package not found', noIndex: true });

  return buildMetadata({
    title: pkg.title,
    description: pkg.metaDescription || pkg.summary,
    path: `/travel-packages/${pkg.slug}`,
    image: pkg.images.card,
    type: 'article',
    keywords: [
      `${pkg.region} tour package`,
      `${pkg.nights} nights ${pkg.days} days ${pkg.region}`,
      ...pkg.route.slice(0, 5).map((stop) => `${stop} tour`),
    ],
  });
}

export default function PackageDetailPage({ params }) {
  const pkg = packages.find((p) => p.slug === params.slug);
  if (!pkg) notFound();

  return (
    <>
      <Container className="pt-5 sm:pt-6">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 text-[13px] text-ink-muted"
        >
          <ol role="list" className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/travel-packages" className="hover:text-ink">
                Travel Packages
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink-soft">
              {pkg.cardTitle || pkg.title}
            </li>
          </ol>
        </nav>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
          {/* Images, title and meta chips */}
          <div className="lg:order-1">
            <PackageHero pkg={pkg} />
          </div>

          {/* Booking panel — second on mobile, pinned on desktop */}
          <aside className="space-y-5 lg:order-2 lg:row-span-2 lg:sticky lg:top-24">
            <PackageFeatureImage pkg={pkg} />
            <PriceTiers pkg={pkg} />
          </aside>

          {/* Everything else — last on mobile, under the hero on desktop */}
          <div className="grid gap-6 lg:order-3 lg:gap-7">
            <PackageOverview pkg={pkg} />
            <PackageHighlights pkg={pkg} />
            <StopHighlights pkg={pkg} />
            <Itinerary pkg={pkg} />
            <PackageInclusions pkg={pkg} />
          </div>
        </div>
      </Container>

      <PhotoGallery />

      <JsonLd
        schemas={[
          packageDetailSchema(pkg),
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: 'Travel Packages', href: '/travel-packages' },
            { label: pkg.cardTitle || pkg.title, href: `/travel-packages/${pkg.slug}` },
          ]),
        ]}
      />
    </>
  );
}
