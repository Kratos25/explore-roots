import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import Button from '@/components/ui/Button';
import CalendarIcon from '@/components/ui/icons/CalendarIcon';
import clsx from '@/lib/clsx';
import { formatCompactPrice, durationLabel } from '@/lib/format';
import { SIZES } from '@/lib/images';

/**
 * Package card used on the home page and the packages listing.
 * The whole card links through to the detail page; "Learn more" is the
 * explicit affordance for anyone who needs a visible target.
 */
export default function PackageCard({ pkg, priority = false }) {
  const href = `/travel-packages/${pkg.slug}`;
  const lead = pkg.tiers.find((t) => t.default) || pkg.tiers[0];
  const extraDeals = pkg.tiers.length - 1;

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card transition-shadow duration-200 hover:shadow-cardHover">
      <Link href={href} className="block" tabIndex={-1} aria-hidden="true">
        <SmartImage
          src={pkg.images.card}
          alt=""
          sizes={SIZES.carousel}
          priority={priority}
          wrapperClassName="aspect-[4/3] w-full"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="font-display text-[15px] font-semibold leading-snug text-ink">
          <Link href={href} className="hover:underline after:absolute after:inset-0 after:content-['']">
            {pkg.cardTitle || pkg.title}
          </Link>
        </h3>

        <p className="flex items-center gap-1.5 text-[12.5px] text-ink-soft">
          <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-ink-muted" />
          {durationLabel(pkg.nights, pkg.days)}
          {pkg.datesShort ? (
            <>
              <span aria-hidden="true" className="text-ink-muted">
                &middot;
              </span>
              {pkg.datesShort}
            </>
          ) : null}
        </p>

        {pkg.badge ? (
          <p
            className={clsx(
              'inline-flex w-fit rounded-md px-2 py-1 text-[11.5px] font-medium',
              pkg.badge.tone === 'urgent'
                ? 'bg-sun-soft text-ink'
                : 'bg-sun-soft/60 text-ink-soft'
            )}
          >
            {pkg.badge.label}
          </p>
        ) : null}

        <div className="mt-auto pt-1">
          <p className="text-[12px] text-ink-muted">{lead.name}</p>
          <div className="flex items-end justify-between gap-3">
            <p className="flex items-baseline gap-1">
              <span className="font-display text-[20px] font-semibold text-ink">
                {formatCompactPrice(lead.price, pkg.currency || 'INR')}
              </span>
              <span className="text-[12.5px] text-ink-soft">/person</span>
            </p>
            <Button href={href} variant="primary" size="sm" className="relative shrink-0">
              Learn more
            </Button>
          </div>

          {extraDeals > 0 ? (
            <p className="mt-2 text-[12.5px] text-ink-muted">+{extraDeals} More deals</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
