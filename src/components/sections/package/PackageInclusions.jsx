import CheckIcon from '@/components/ui/icons/CheckIcon';

export default function PackageInclusions({ pkg }) {
  return (
    <section
      aria-labelledby="inclusions-heading"
      className="rounded-card bg-surface p-5 shadow-card sm:p-6"
    >
      <h2 id="inclusions-heading" className="font-display text-[17px] font-semibold text-ink">
        What&apos;s included
      </h2>

      <ul role="list" className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[13.5px] text-ink-soft">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sun-deep" />
            {item}
          </li>
        ))}
      </ul>

      {pkg.optional?.length ? (
        <>
          <h3 className="mt-6 text-[13.5px] font-semibold text-ink">Available at extra cost</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
            {pkg.optional.join(' • ')}
          </p>
        </>
      ) : null}

      {pkg.vehicleOptions?.length ? (
        <>
          <h3 className="mt-6 text-[13.5px] font-semibold text-ink">Vehicle options</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
            {pkg.vehicleOptions.join(' • ')} — the right one depends on your group size and the
            road conditions on your route.
          </p>
        </>
      ) : null}

      {pkg.notes?.length ? (
        <div className="mt-6 rounded-lg border border-sun-deep/30 bg-sun-soft/35 p-4">
          <h3 className="text-[13.5px] font-semibold text-ink">Before you book</h3>
          <ul role="list" className="mt-2 space-y-2">
            {pkg.notes.map((note) => (
              <li key={note} className="text-[12.5px] leading-relaxed text-ink-soft">
                {note}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
