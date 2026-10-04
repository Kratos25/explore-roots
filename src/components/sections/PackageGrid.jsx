import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Carousel from '@/components/ui/Carousel';
import PackageCard from '@/components/cards/PackageCard';
import ArrowRightIcon from '@/components/ui/icons/ArrowRightIcon';

export default function PackageGrid({
  packages = [],
  title = 'Explore Popular Destinations',
  description = 'Planning a road trip? Explore destinations near you with a comfortable, driver-driven vehicle from Explore Roots.',
  align = 'center',
  layout = 'grid',
  viewAllHref,
  headingLevel = 'h2',
  spacing = 'default',
}) {
  const cards = packages.map((pkg, index) => (
    <PackageCard key={pkg.id} pkg={pkg} priority={index < 4} />
  ));

  return (
    <Section spacing={spacing} ariaLabel="Travel packages">
      <SectionHeading
        as={headingLevel}
        title={title}
        description={description}
        align={align}
        className={align === 'left' ? 'max-w-2xl' : undefined}
      />

      {layout === 'carousel' ? (
        <Carousel label="travel packages" className="mt-8">
          {cards}
        </Carousel>
      ) : (
        <ul role="list" className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {cards.map((card) => (
            <li key={card.key} className="h-full">
              {card}
            </li>
          ))}
        </ul>
      )}

      {viewAllHref ? (
        <div className="mt-10 flex justify-center">
          <Button href={viewAllHref} variant="outline" size="md">
            View more
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : null}
    </Section>
  );
}
