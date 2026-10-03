import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Lit } from '@/components/Lit';
import { ProductPage } from '@/components/ProductPage';
import { JsonLd } from '@/components/JsonLd';
import { PRODUCTS, SITE } from '@/content/site';

const PATH = '/led-film';
const P = PRODUCTS.items[0];
const TITLE = `${P.name} · ${SITE.full}`;
const DESCRIPTION = `${P.claim} ${P.body} Levering og montering i hele Danmark.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  // A page's openGraph replaces the layout's whole, so it is spelled out again.
  openGraph: {
    type: 'website',
    locale: 'da_DK',
    siteName: SITE.full,
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    images: [P.image],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: P.name,
          description: DESCRIPTION,
          url: `${SITE.url}${PATH}`,
          image: `${SITE.url}${P.image}`,
          provider: { '@type': 'Organization', name: SITE.full, url: SITE.url },
          areaServed: { '@type': 'Country', name: 'Danmark' },
        }}
      />
      <Lit />
      <div className="env" aria-hidden="true" />

      <div className="page">
        <ProductPage index={0} />
        <Footer base="/" />
      </div>
    </>
  );
}
