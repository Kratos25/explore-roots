import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Carousel from '@/components/ui/Carousel';
import VehicleCard from '@/components/cards/VehicleCard';
import ArrowRightIcon from '@/components/ui/icons/ArrowRightIcon';

/**
 * `layout="carousel"` is the home page treatment (one scrolling row).
 * `layout="grid"` is the Vehicles page (everything visible at once).
 */
export default function VehicleGrid({
  vehicles = [],
  title = 'Choose the Right Vehicle for Your Journey',
  description = 'From compact family cars to spacious group travel, we have vehicles for different group sizes, destinations and travel requirements.',
  align = 'center',
  layout = 'grid',
  viewAllHref,
  page,
  headingLevel = 'h2',
  spacing = 'default',
}) {
  const cards = vehicles.map((vehicle, index) => (
    <VehicleCard key={vehicle.id} vehicle={vehicle} page={page} priority={index < 4} />
  ));

  return (
    <Section spacing={spacing} ariaLabel="Vehicles">
      <SectionHeading
        as={headingLevel}
        title={title}
        description={description}
        align={align}
        className={align === 'left' ? 'max-w-2xl' : undefined}
      />

      {layout === 'carousel' ? (
        <Carousel label="vehicles" className="mt-8">
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
