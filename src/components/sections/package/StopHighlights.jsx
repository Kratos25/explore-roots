/**
 * Used for packages that are described by stop rather than by day — the Assam
 * tour, for example.
 */
export default function StopHighlights({ pkg }) {
  if (!pkg.stopHighlights?.length) return null;

  return (
    <section aria-labelledby="stops-heading">
      <h2
        id="stops-heading"
        className="font-display text-[20px] font-semibold tracking-tight text-ink sm:text-[22px]"
      >
        Tour Highlights
      </h2>

      <ul role="list" className="mt-4 grid gap-3 sm:grid-cols-2">
        {pkg.stopHighlights.map((stop) => (
          <li key={stop.place} className="rounded-card bg-surface p-5 shadow-card">
            <h3 className="font-display text-[15px] font-semibold text-ink">{stop.place}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{stop.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
