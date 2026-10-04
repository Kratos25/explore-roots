import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';
import StatItem from '@/components/cards/StatItem';
import ArrowRightIcon from '@/components/ui/icons/ArrowRightIcon';
import about from '@/data/about.json';
import { siteConfig } from '@/lib/config';

export default function AboutIntro() {
  return (
    <Section spacing="tight" ariaLabel="About Explore Roots">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <h1 className="font-display text-[32px] leading-tight tracking-tight text-ink sm:text-[40px]">
            {about.heading}
          </h1>

          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
            {about.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="max-w-prose">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-9 grid grid-cols-3 gap-y-6 sm:grid-cols-5 sm:gap-4">
            {siteConfig.stats.map((stat) => (
              <div key={stat.id}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <StatItem value={stat.value} label={stat.label} className="sm:text-left" />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9">
            <Button href="/travel-packages" variant="outline" size="md">
              View Packages
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {about.images.map((img, index) => (
            <SmartImage
              key={img.image}
              src={img.image}
              alt={img.alt}
              priority={index === 0}
              sizes="(max-width: 1024px) 45vw, 300px"
              wrapperClassName="aspect-[3/4] rounded-card"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
