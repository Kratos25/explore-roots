'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import ArrowRightIcon from '@/components/ui/icons/ArrowRightIcon';
import clsx from '@/lib/clsx';
import { formatCompactPrice } from '@/lib/format';
import { packageEnquiry } from '@/lib/whatsapp';

/**
 * Tier picker. Whichever tier is selected is carried into the WhatsApp
 * message, so the booking request already says which level the customer wants.
 */
export default function PriceTiers({ pkg }) {
  const defaultTier = pkg.tiers.find((t) => t.default) || pkg.tiers[0];
  const [selected, setSelected] = useState(defaultTier.id);
  const tier = pkg.tiers.find((t) => t.id === selected) || defaultTier;

  return (
    <div>
      <p className="text-[15px] leading-relaxed text-ink-soft">{pkg.summary}</p>

      <fieldset className="mt-5">
        <legend className="sr-only">Choose a package level</legend>
        <div className="flex flex-wrap gap-2.5">
          {pkg.tiers.map((t) => {
            const active = t.id === selected;
            return (
              <label
                key={t.id}
                className={clsx(
                  'cursor-pointer rounded-lg border px-3.5 py-2.5 transition-colors',
                  active
                    ? 'border-ink/40 bg-[#EDEAF3]'
                    : 'border-transparent bg-surface hover:border-ink/15'
                )}
              >
                <input
                  type="radio"
                  name={`tier-${pkg.id}`}
                  value={t.id}
                  checked={active}
                  onChange={() => setSelected(t.id)}
                  className="sr-only"
                />
                <span className="block text-[12.5px] text-ink-soft">{t.name}</span>
                <span className="mt-0.5 block font-display text-[19px] font-semibold text-ink">
                  {formatCompactPrice(t.price, pkg.currency || 'INR')}
                </span>
                <span className="block text-[12px] text-ink-muted">/person</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button href={packageEnquiry(pkg, { tier })} external variant="primary" size="md">
          Book this Package
        </Button>
        <Button href="/vehicles" variant="outline" size="md">
          View vehicles
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Button>
      </div>

      <p className="mt-3 text-[12px] leading-relaxed text-ink-muted">
        Booking is completed over WhatsApp. {pkg.priceNote}
      </p>
    </div>
  );
}