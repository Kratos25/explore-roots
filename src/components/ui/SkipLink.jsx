export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-pill bg-charcoal px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
    >
      Skip to content
    </a>
  );
}
