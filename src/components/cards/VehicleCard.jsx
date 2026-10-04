import SmartImage from '@/components/ui/SmartImage';
import Button from '@/components/ui/Button';
import StarIcon from '@/components/ui/icons/StarIcon';
import SeatIcon from '@/components/ui/icons/SeatIcon';
import ClockIcon from '@/components/ui/icons/ClockIcon';
import { formatCompactPrice } from '@/lib/format';
import { vehicleEnquiry } from '@/lib/whatsapp';
import { SIZES } from '@/lib/images';

/**
 * One vehicle from src/data/vehicles.json.
 * "Book Now" is a plain link to WhatsApp with the card's details already
 * written into the message, so it works without client-side JavaScript.
 */
export default function VehicleCard({ vehicle, page = 'Vehicles page', priority = false }) {
  const bookingUrl = vehicleEnquiry(vehicle, { page });

  return (
    <article
      id={vehicle.slug}
      className="flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card transition-shadow duration-200 hover:shadow-cardHover"
    >
      <div className="relative">
        <SmartImage
          src={vehicle.image}
          alt={vehicle.imageAlt}
          sizes={SIZES.carousel}
          priority={priority}
          wrapperClassName="aspect-[16/11] w-full"
        />
        {vehicle.rating ? (
          <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-sun px-2 py-1 text-xs font-semibold text-ink shadow-sm">
            {vehicle.rating}
            <StarIcon className="h-3 w-3" />
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
            {vehicle.shortName || vehicle.name}
          </h3>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <SeatIcon className="h-4 w-4 text-ink-muted" />
              {vehicle.seatsLabel} seater
            </span>
            <span aria-hidden="true" className="text-ink-muted">
              &middot;
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4 text-ink-muted" />
              {vehicle.instantBooking ? 'Instant booking' : 'On request'}
            </span>
          </p>
        </div>

        <div className="mt-auto">
          <p className="text-[13px] text-ink-muted">Starting at</p>
          {vehicle.rateOnRequest ? (
            <p className="font-display text-[20px] font-semibold text-ink">Rate on request</p>
          ) : (
            <p className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-display text-[22px] font-semibold text-ink">
                {formatCompactPrice(vehicle.localRate, vehicle.currency)}
              </span>
              <span className="text-sm text-ink-soft">/day</span>
            </p>
          )}
          <p className="mt-0.5 text-[13px] text-ink-soft">
            {formatCompactPrice(vehicle.hourlyRate, vehicle.currency)}/hour
          </p>
          <p className="mt-0.5 text-[12px] text-ink-muted">
            {vehicle.dutyHours} local duty · fuel extra
          </p>
        </div>

        <Button
          href={bookingUrl}
          external
          variant="primary"
          size="block"
          aria-label={`Book the ${vehicle.name} on WhatsApp`}
        >
          Book Now
        </Button>
      </div>
    </article>
  );
}
