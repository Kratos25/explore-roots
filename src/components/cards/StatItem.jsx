'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from '@/lib/clsx';

/**
 * Counts up to the value once the stat scrolls into view.
 *
 * The number is parsed out of the display string, so "25+" counts to 25 and
 * keeps its "+", and "10" just counts to 10. The final value is what renders
 * on the server, so the correct figure is in the HTML even if the animation
 * never runs — crawlers and no-JS visitors see the real number.
 */
export default function StatItem({ value, label, className, duration = 1400 }) {
  const match = String(value).match(/^([\d.,]+)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, '')) : null;
  const suffix = match ? match[2] : '';
  const grouped = match ? match[1].includes(',') : false;

  const [display, setDisplay] = useState(target);
  const ref = useRef(null);

  useEffect(() => {
    if (target === null || Number.isNaN(target)) return undefined;

    const node = ref.current;
    if (!node) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') return undefined;

    let frame;
    let cancelled = false;

    // Drop back to the start value so there is something to count from.
    setDisplay(Math.min(1, target));

    const run = () => {
      const start = performance.now();
      const from = Math.min(1, target);

      const tick = (now) => {
        if (cancelled) return;
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic — fast at first, settles gently on the final number
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(from + (target - from) * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            run();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  const shown =
    target === null
      ? value
      : `${grouped ? display.toLocaleString('en-IN') : display}${suffix}`;

  return (
    <div ref={ref} className={clsx('text-center', className)}>
      <p className="font-display text-[26px] leading-none tabular-nums text-gold sm:text-[30px]">
        {shown}
      </p>
      <p className="mt-2 text-[12px] text-gold/90 sm:text-[13px]">{label}</p>
    </div>
  );
}