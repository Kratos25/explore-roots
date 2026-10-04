'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SmartImage from '@/components/ui/SmartImage';
import Button from '@/components/ui/Button';
import WhatsAppIcon from '@/components/ui/icons/WhatsAppIcon';
import clsx from '@/lib/clsx';
import { siteConfig } from '@/lib/config';
import { generalEnquiry } from '@/lib/whatsapp';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-canvas/85 pb-3 pt-3 backdrop-blur-md sm:pb-4 sm:pt-4">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Main"
          className="flex h-14 items-center justify-between rounded-pill bg-[#E8E6EF]/95 px-4 shadow-bar backdrop-blur sm:h-16 sm:px-6"
        >
          <Link
            href="/"
            className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            aria-label={`${siteConfig.name} home`}
          >
            <SmartImage
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              fill={false}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              sizes="180px"
              priority
              quality={90}
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={clsx(
                    'text-[15px] transition-colors hover:text-ink',
                    isActive(item.href) ? 'font-semibold text-ink' : 'text-ink-soft'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="mx-auto mt-2 w-full max-w-[1200px] px-4 sm:px-6 md:hidden"
      >
        <ul className="rounded-card bg-surface p-2 shadow-card">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={clsx(
                  'block rounded-lg px-4 py-3 text-[15px]',
                  isActive(item.href) ? 'bg-canvas font-semibold text-ink' : 'text-ink-soft'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="p-2">
            <Button href={generalEnquiry('mobile menu')} external variant="whatsapp" size="block">
              <WhatsAppIcon className="h-4 w-4" />
              Book on WhatsApp
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
