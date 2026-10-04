import CalendarIcon from '@/components/ui/icons/CalendarIcon';
import PinIcon from '@/components/ui/icons/PinIcon';
import MountainIcon from '@/components/ui/icons/MountainIcon';
import RouteIcon from '@/components/ui/icons/RouteIcon';
import ListIcon from '@/components/ui/icons/ListIcon';
import { durationLabel } from '@/lib/format';

/**
 * Derived from the package's own fields rather than authored separately, so
 * adding a package never means writing the same facts twice.
 */
function buildHighlights(pkg) {
  const items = [
    {
      icon: <CalendarIcon className="h-4 w-4" />,
      label: durationLabel(pkg.nights, pkg.days),
      detail: `A ${pkg.days}-day journey through ${pkg.region}, paced so you are not driving all day every day.`,
    },
    {
      icon: <CalendarIcon className="h-4 w-4" />,
      label: pkg.dates,
      detail: pkg.datesShort === 'Year round'
        ? 'Run on request through the year, subject to season and road conditions.'
        : 'A dedicated window for the festival, local culture and winter mountain scenery.',
    },
    {
      icon: <PinIcon className="h-4 w-4" />,
      label: pkg.destination,
      detail: `The main stops on this route, with local sightseeing at each.`,
    },
    {
      icon: <MountainIcon className="h-4 w-4" />,
      label: pkg.themes.join(' • '),
      detail: 'What this trip is built around, and what most of the days are spent doing.',
    },
    {
      icon: <RouteIcon className="h-4 w-4" />,
      label: 'Tour Route',
      detail: pkg.route.join(' → '),
    },
  ];

  if (pkg.itinerary.length > 0) {
    items.push({
      icon: <ListIcon className="h-4 w-4" />,
      label: 'Day-wise Itinerary',
      detail: `A complete daily plan covering all ${pkg.days} days, from arrival to departure.`,
    });
  }

  return items;
}

export default function PackageHighlights({ pkg }) {
  const highlights = buildHighlights(pkg);

  return (
    <section
      aria-labelledby="highlights-heading"
      className="rounded-card bg-surface p-5 shadow-card sm:p-6"
    >
      <h2 id="highlights-heading" className="font-display text-[17px] font-semibold text-ink">
        Package Highlights
      </h2>

      <ul role="list" className="mt-4 grid gap-3 sm:grid-cols-2">
        {highlights.map((item) => (
          <li key={item.label} className="rounded-lg bg-sun-soft/40 p-4">
            <span className="text-navy">{item.icon}</span>
            <p className="mt-2.5 text-[13px] font-semibold leading-snug text-ink">{item.label}</p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
