/**
 * Day-wise itinerary. Rendered as a real ordered list so the sequence is in
 * the markup, not just implied by the visual order.
 */
export default function Itinerary({ pkg }) {
  if (!pkg.itinerary?.length) return null;

  return (
    <section aria-labelledby="itinerary-heading">
      <h2
        id="itinerary-heading"
        className="font-display text-[20px] font-semibold tracking-tight text-ink sm:text-[22px]"
      >
        Day-wise Itinerary
      </h2>

      <ol role="list" className="mt-4 space-y-4">
        {pkg.itinerary.map((day) => (
          <li key={day.day} className="rounded-card bg-surface p-5 shadow-card">
            <h3 className="font-display text-[17px] font-semibold leading-snug text-ink">
              Day {day.day} — {day.title}
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{day.description}</p>

            {day.tags?.length ? (
              <ul role="list" className="mt-3 flex flex-wrap gap-2">
                {day.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-sun-soft/50 px-2.5 py-1 text-[11.5px] text-ink-soft"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
