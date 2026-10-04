import { WHATSAPP_NUMBER, siteConfig } from './config';
import { formatPrice, formatCompactPrice } from './format';

/**
 * Every "Book Now" / "Book a ride" button on the site ends up here.
 * The result is a plain https://wa.me/ link, so the buttons can stay server
 * rendered and still work if JavaScript never loads.
 */
export function whatsappUrl(message) {
  const text = encodeURIComponent(String(message || '').trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

const line = (label, value) => (value ? `${label}: ${value}` : null);

/** Message prefilled when someone taps Book Now on a vehicle card. */
export function vehicleEnquiry(vehicle, extra = {}) {
  const body = [
    `Hi ${siteConfig.name}, I would like to book a vehicle.`,
    '',
    line('Vehicle', vehicle.name),
    line('Type', vehicle.category),
    line('Seats', `${vehicle.seats} seater`),
    line('Day rate', `${formatCompactPrice(vehicle.localRate, vehicle.currency)} per day (${vehicle.dutyHours})`),
    line('Hourly rate', `${formatCompactPrice(vehicle.hourlyRate, vehicle.currency)} per hour`),
    line('Reference', `${vehicle.slug}`),
    extra.page ? line('Seen on', extra.page) : null,
    '',
    'Pickup location:',
    'Drop location:',
    'Travel date:',
    'Number of passengers:',
  ]
    .filter((l) => l !== null && l !== undefined)
    .join('\n');

  return whatsappUrl(body);
}

/** Message prefilled when someone taps Book this Package. */
export function packageEnquiry(pkg, extra = {}) {
  const tier = extra.tier || pkg.tiers?.find((t) => t.default) || pkg.tiers?.[0];

  const body = [
    `Hi ${siteConfig.name}, I am interested in a travel package.`,
    '',
    line('Package', pkg.title),
    line('Region', pkg.region),
    line('Duration', `${pkg.nights} Nights / ${pkg.days} Days`),
    line('Dates', pkg.dates),
    tier ? line('Package level', `${tier.name} — ${formatCompactPrice(tier.price, pkg.currency || 'INR')} per person`) : null,
    line('Reference', pkg.slug),
    extra.page ? line('Seen on', extra.page) : null,
    '',
    'Travel date:',
    'Number of travellers:',
    'Pickup city:',
  ]
    .filter((l) => l !== null && l !== undefined)
    .join('\n');

  return whatsappUrl(body);
}

/** Generic enquiry used by the header, hero and the floating button. */
export function generalEnquiry(context = 'website') {
  return whatsappUrl(
    [
      `Hi ${siteConfig.name}, I would like to book a ride.`,
      '',
      'Pickup location:',
      'Drop location:',
      'Travel date:',
      'Number of passengers:',
      '',
      `(Sent from the ${context})`,
    ].join('\n')
  );
}
