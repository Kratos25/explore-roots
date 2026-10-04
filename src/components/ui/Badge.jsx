import clsx from '@/lib/clsx';
import StarIcon from '@/components/ui/icons/StarIcon';

/** The small pill that sits on the top-right corner of a card image. */
export default function Badge({ label, tone = 'sun', className, showStar = true }) {
  const tones = {
    sun: 'bg-sun text-ink',
    light: 'bg-white/95 text-ink',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold shadow-sm',
        tones[tone],
        className
      )}
    >
      {label}
      {showStar ? <StarIcon className="h-3 w-3" /> : null}
    </span>
  );
}
