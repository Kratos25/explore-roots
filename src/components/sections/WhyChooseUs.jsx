import Section from '@/components/ui/Section';
import SmartImage from '@/components/ui/SmartImage';
import CheckIcon from '@/components/ui/icons/CheckIcon';
import about from '@/data/about.json';

export default function WhyChooseUs() {
  const { heading, subheading, points, images } = about.whyChooseUs;

  return (
    <Section ariaLabel="Why choose Explore Roots">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="font-display text-[26px] leading-tight tracking-tight text-ink sm:text-[32px]">
            {heading}
          </h2>
          <p className="mt-2 text-[15px] text-ink-soft">{subheading}</p>

          <ul role="list" className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point.id} className="flex items-start gap-2.5">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sun-deep" />
                <span>
                  <span className="block text-[14px] text-ink">{point.label}</span>
                  <span className="block text-[13px] leading-snug text-ink-muted">
                    {point.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {images.map((img) => (
            <SmartImage
              key={img.image}
              src={img.image}
              alt={img.alt}
              sizes="(max-width: 1024px) 45vw, 300px"
              wrapperClassName="aspect-[4/5] rounded-card"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
