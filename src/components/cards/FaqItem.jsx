/**
 * Built on <details>/<summary> so it opens without JavaScript, is keyboard
 * accessible by default, and the answer text stays in the HTML for crawlers.
 * The +/- marker is driven by the [open] attribute in globals.css.
 */
export default function FaqItem({ faq, defaultOpen = false }) {
  return (
    <details
      className="faq-item group rounded-card bg-surface px-5 py-4 shadow-card open:pb-5"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 text-left">
        <span className="faq-marker relative h-4 w-4 shrink-0 text-navy" aria-hidden="true" />
        <span className="font-display text-[15px] font-semibold leading-snug text-navy">
          {faq.question}
        </span>
      </summary>
      <p className="mt-3 pl-8 text-[14px] leading-relaxed text-ink-soft">{faq.answer}</p>
    </details>
  );
}
