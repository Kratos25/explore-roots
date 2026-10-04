import { Outfit, Poppins } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import SkipLink from '@/components/ui/SkipLink';
import JsonLd from '@/components/ui/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { SITE_URL, siteConfig, GOOGLE_SITE_VERIFICATION } from '@/lib/config';
import './globals.css';

const display = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.name} — Car Rental With Drivers & Travel Packages`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.name,
  keywords: siteConfig.defaultKeywords,
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'travel',
  alternates: { canonical: '/' },
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
  verification: GOOGLE_SITE_VERIFICATION
    ? { google: GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport = {
  themeColor: '#F3F1F9',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh">
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <JsonLd schemas={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
