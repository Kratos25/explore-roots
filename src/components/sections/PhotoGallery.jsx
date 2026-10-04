import SectionHeading from '@/components/ui/SectionHeading';
import SmartImage from '@/components/ui/SmartImage';
import gallery from '@/data/gallery.json';

/**
 * Full-bleed strip. Horizontally scrollable on small screens with snap points
 * so it stays usable on a phone instead of shrinking to nothing.
 */
export default function PhotoGallery({ items = gallery, title = 'Photo Gallery' }) {
  return (
    <section aria-label="Photo gallery" className="py-14 sm:py-16 lg:py-20">
      <SectionHeading as="h2" title={title} className="px-4" />

      <ul
        role="list"
        className="mt-8 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 sm:px-0 lg:grid lg:grid-cols-5 lg:gap-2 lg:overflow-visible"
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className="w-[68vw] shrink-0 snap-center sm:w-[38vw] lg:w-auto lg:shrink"
          >
            <SmartImage
              src={item.image}
              alt={item.alt}
              sizes="(max-width: 640px) 68vw, (max-width: 1024px) 38vw, 20vw"
              wrapperClassName={
                index === 2
                  ? 'aspect-[3/4] h-full lg:scale-y-105 rounded-sm'
                  : 'aspect-[3/4] h-full rounded-sm'
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
