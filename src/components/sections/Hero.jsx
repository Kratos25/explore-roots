import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SmartImage from '@/components/ui/SmartImage';
import StarIcon from '@/components/ui/icons/StarIcon';
import ArrowRightIcon from '@/components/ui/icons/ArrowRightIcon';
import hero from '@/data/hero.json';
import { siteConfig } from '@/lib/config';
import { generalEnquiry } from '@/lib/whatsapp';

export default function Hero() {
  const [imgA, imgB, imgC, imgD] = hero.images;

  return (
    <section className="pt-8 sm:pt-12 lg:pt-16" aria-labelledby="hero-heading">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="max-w-xl">
          <p className="inline-flex rounded-md bg-sun-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink/80">
            {hero.eyebrow}
          </p>

          <h1
            id="hero-heading"
            className="mt-5 font-display text-[32px] leading-[1.15] tracking-tight text-ink sm:text-[42px] lg:text-[48px]"
          >
            {hero.heading}
          </h1>

          <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-ink-soft sm:text-base">
            {hero.subheading}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button href={generalEnquiry('hero')} external variant="primary" size="md">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="md">
              {hero.secondaryCta.label}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Button>
          </div>

          <p className="mt-5 flex items-center gap-2 text-[13px] text-ink-soft">
            <span className="flex text-sun-deep" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-3.5 w-3.5" />
              ))}
            </span>
            <span className="font-semibold text-ink">{siteConfig.rating.label}</span>
            {hero.ratingLabel}
          </p>
        </div>

        {/* Staggered 2x2 mosaic: the left column sits slightly lower than
            the right, which is what gives the collage its offset look. */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SmartImage
              src={imgA.image}
              alt={imgA.alt}
              priority
              sizes="(max-width: 1024px) 46vw, 300px"
              wrapperClassName="aspect-[4/5] rounded-card"
            />
            <SmartImage
              src={imgC.image}
              alt={imgC.alt}
              sizes="(max-width: 1024px) 46vw, 300px"
              wrapperClassName="aspect-[4/3] rounded-card"
            />
          </div>
          <div className="flex flex-col gap-3 pt-8 sm:gap-4 sm:pt-10 lg:pt-12">
            <SmartImage
              src={imgB.image}
              alt={imgB.alt}
              priority
              sizes="(max-width: 1024px) 46vw, 300px"
              wrapperClassName="aspect-[4/3] rounded-card"
            />
            <SmartImage
              src={imgD.image}
              alt={imgD.alt}
              sizes="(max-width: 1024px) 46vw, 300px"
              wrapperClassName="aspect-[4/5] rounded-card"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
