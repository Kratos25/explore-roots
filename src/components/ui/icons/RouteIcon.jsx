export default function RouteIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className={className}>
      <path d="M5 19h8a4 4 0 000-8H9a4 4 0 010-8h6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="3" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="5" cy="19" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
