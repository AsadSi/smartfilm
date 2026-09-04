import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/components/LanguageProvider';
import { META } from '@/content/pages';
import { SITE } from '@/content/site';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: META.home.title,
    template: '%s – SmartFilm Danmark',
  },
  description: META.home.description.da,
  openGraph: {
    type: 'website',
    locale: 'da_DK',
    siteName: SITE.name,
    images: [META.home.og],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  themeColor: '#0a0a0d',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="da"
      // Next 16 stopped neutralising `scroll-behavior: smooth` during client
      // navigation, which turned every route change into a slow scroll to the
      // top. This opts back into the instant-jump behaviour while keeping
      // smooth scrolling for in-page anchors.
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <LanguageProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
        {/* Structured data so the company reads as a company to a crawler, not
            just to a visitor. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE.name,
              url: SITE.url,
              email: SITE.email,
              telephone: SITE.phone,
              address: { '@type': 'PostalAddress', addressCountry: 'DK' },
              areaServed: 'DK',
            }),
          }}
        />
      </body>
    </html>
  );
}
