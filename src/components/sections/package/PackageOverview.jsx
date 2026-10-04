import CalendarIcon from '@/components/ui/icons/CalendarIcon';
import PinIcon from '@/components/ui/icons/PinIcon';
import MountainIcon from '@/components/ui/icons/MountainIcon';

function Row({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-navy">{icon}</span>
      <span>
        <span className="block text-[12.5px] font-medium text-ink">{label}</span>
        <span className="block text-[13px] leading-snug text-ink-soft">{value}</span>
      </span>
    </div>
  );
}

export default function PackageOverview({ pkg }) {
  return (
    <section
      aria-labelledby="overview-heading"
      className="rounded-card bg-surface p-5 shadow-card sm:p-6"
    >
      <h2 id="overview-heading" className="font-display text-[17px] font-semibold text-ink">
        Package Overview
      </h2>

      <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{pkg.summary}</p>

      <div className="mt-5 space-y-4">
        <Row icon={<CalendarIcon className="h-4 w-4" />} label="Dates" value={pkg.dates} />
        <Row icon={<PinIcon className="h-4 w-4" />} label="Destination" value={pkg.destination} />
        <Row
          icon={<MountainIcon className="h-4 w-4" />}
          label="Focus"
          value={pkg.themes.join(' • ')}
        />
      </div>

      <div className="mt-5 rounded-lg bg-sun-soft/45 p-4">
        <h3 className="text-[13.5px] font-semibold text-ink">Why this package</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{pkg.whyThisPackage}</p>
      </div>
    </section>
  );
}
