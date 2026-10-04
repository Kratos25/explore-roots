'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from '@/lib/clsx';

/**
 * Horizontal scroller with arrow controls, matching the vehicle and package
 * rows in the design.
 *
 * It is a real scroll container, not a transform-based slider: swipe works on
 * touch, the scrollbar is hidden, scroll-snap keeps cards aligned, and every
 * card stays in the DOM so crawlers and keyboard users reach all of them.
 */
export default function Carousel({ children, label, className, itemClassName }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return undefined;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const scrollBy = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-carousel-item]');
    const step = card ? card.clientWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      <div className="mb-4 flex justify-end gap-2">
        <ArrowButton
          direction="left"
          disabled={atStart}
          onClick={() => scrollBy(-1)}
          label={`Previous ${label}`}
        />
        <ArrowButton
          direction="right"
          disabled={atEnd}
          onClick={() => scrollBy(1)}
          label={`Next ${label}`}
        />
      </div>

      <ul
        ref={trackRef}
        aria-label={label}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:gap-6 lg:mx-0 lg:px-0"
      >
        {items.filter(Boolean).map((child, index) => (
          <li
            key={child.key ?? index}
            data-carousel-item
            className={clsx(
              'w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[calc((100%-4.5rem)/4)]',
              itemClassName
            )}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowButton({ direction, disabled, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition-opacity hover:bg-ink/5 disabled:opacity-25"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
          d={direction === 'left' ? 'M19 12H5m0 0l6-6m-6 6l6 6' : 'M5 12h14m0 0l-6-6m6 6l-6 6'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
