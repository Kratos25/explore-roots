export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-ink/20 border-t-ink" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
