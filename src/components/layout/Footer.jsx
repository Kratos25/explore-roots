import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import Container from '@/components/ui/Container';
import PinIcon from '@/components/ui/icons/PinIcon';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/80">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <SmartImage
              src={siteConfig.logo.srcLight}
              alt={siteConfig.logo.alt}
              fill={false}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              sizes="180px"
              quality={90}
              className="h-10 w-auto"
            />
            <div className="space-y-2 text-[15px]">
              <p>
                <a className="hover:text-white" href={`tel:${siteConfig.contact.phoneHref}`}>
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a className="hover:text-white" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </div>

          {siteConfig.footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title} className="space-y-4">
              <h2 className="text-[15px] font-medium text-white">{group.title}</h2>
              <ul className="space-y-3 text-[15px]">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex items-start gap-3">
            <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-white" />
            <address className="text-[15px] not-italic leading-relaxed">
              <a
                href={siteConfig.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {siteConfig.address.street} {siteConfig.address.locality},
                <br />
                {siteConfig.address.region} {siteConfig.address.postalCode}{' '}
                {siteConfig.address.country}
              </a>
            </address>
          </div>
        </div>

        <hr className="my-10 border-white/15" />

        <p className="text-center text-sm text-white/70">
          &copy; {year} {siteConfig.name}. All rights reserved
        </p>
      </Container>
    </footer>
  );
}
