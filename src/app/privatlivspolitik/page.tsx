import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Lit } from '@/components/Lit';
import { Privacy } from '@/components/Privacy';
import { PRIVACY, SITE } from '@/content/site';

export const metadata: Metadata = {
  title: PRIVACY.title,
  description: PRIVACY.lede,
  alternates: { canonical: '/privatlivspolitik' },
  // A page's openGraph replaces the layout's whole, so it is spelled out again.
  openGraph: {
    type: 'website',
    locale: 'da_DK',
    siteName: SITE.full,
    title: PRIVACY.title,
    description: PRIVACY.lede,
    url: '/privatlivspolitik',
    images: ['/assets/hero-ending.jpg'],
  },
};

/** The one page that is not the one-pager. Its footer links back into it. */
export default function Page() {
  return (
    <>
      <Lit />
      <div className="env" aria-hidden="true" />

      <div className="page">
        <Privacy />
        <Footer base="/" />
      </div>
    </>
  );
}
