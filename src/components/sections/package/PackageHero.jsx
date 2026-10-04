import SmartImage from '@/components/ui/SmartImage';
import CalendarIcon from '@/components/ui/icons/CalendarIcon';
import PinIcon from '@/components/ui/icons/PinIcon';
import MountainIcon from '@/components/ui/icons/MountainIcon';
import { durationLabel } from '@/lib/format';
import { SIZES } from '@/lib/images';

function Chip({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-surface px-2.5 py-1.5 text-[12.5px] text-ink-soft shadow-sm">
      {icon}
      {children}
    </span>
  );
}

export default function PackageHero({ pkg }) {
  const [a, b] = pkg.images.gallery;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <SmartImage
          src={a.image}
          alt={a.alt}
          priority
          sizes={SIZES.thumb}
          wrapperClassName="aspect-[4/3] rounded-card"
        />
        <SmartImage
          src={b.image}
          alt={b.alt}
          priority
          sizes={SIZES.thumb}
          wrapperClassName="aspect-[4/3] rounded-card"
        />
      </div>

      <h1 className="mt-7 font-display text-[28px] font-bold uppercase leading-[1.15] tracking-tight text-ink sm:text-[34px] lg:text-[38px]">
        {pkg.title}
      </h1>

      <div className="mt-5 flex flex-wrap gap-2">
        <Chip icon={<CalendarIcon className="h-3.5 w-3.5 text-ink-muted" />}>
          {durationLabel(pkg.nights, pkg.days)}
        </Chip>
        <Chip icon={<CalendarIcon className="h-3.5 w-3.5 text-ink-muted" />}>{pkg.dates}</Chip>
        <Chip icon={<PinIcon className="h-3.5 w-3.5 text-ink-muted" />}>
          {pkg.destinationShort}
        </Chip>
      </div>

      <div className="mt-2.5">
        <Chip icon={<MountainIcon className="h-3.5 w-3.5 text-ink-muted" />}>
          {pkg.themes.join(' \u2022 ')}
        </Chip>
      </div>
    </div>
  );
}

/** The wide image that sits at the top of the right-hand booking column. */
export function PackageFeatureImage({ pkg }) {
  const feature = pkg.images.gallery[2];
  if (!feature) return null;

  return (
    <SmartImage
      src={feature.image}
      alt={feature.alt}
      priority
      sizes={SIZES.half}
      wrapperClassName="aspect-[16/9] rounded-card lg:aspect-[2.3/1]"
    />
  );
}
