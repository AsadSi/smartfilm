import type { Metadata } from 'next';
import { Applications } from '@/components/Applications';
import { Channels } from '@/components/Channels';
import { ClearOrMatte } from '@/components/ClearOrMatte';
import { Faq, Specs } from '@/components/Sections';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Lit } from '@/components/Lit';
import { Products } from '@/components/Products';
import { QuoteForm } from '@/components/QuoteForm';
import { Steps } from '@/components/Steps';
import { SITE } from '@/content/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * Who is behind the site, for search engines: the same name, address, CVR and
 * contact details the footer shows. A company that serves all of Denmark from
 * one address is an Organization rather than a LocalBusiness, which would
 * imply customers come to the door.
 */
const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.full,
  legalName: SITE.company,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  email: SITE.email,
  telephone: SITE.phoneHref.replace('tel:', ''),
  vatID: `DK${SITE.cvr}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.street,
    postalCode: SITE.postcode,
    addressLocality: SITE.town,
    addressCountry: 'DK',
  },
  areaServed: { '@type': 'Country', name: 'Danmark' },
};

/**
 * One page, in the order it argues: the product working, the two products
 * named side by side, how it is fitted,
 * the numbers with their conditions, the LED film demonstrated, the second
 * product demonstrated, where it goes, what people ask, and the form.
 *
 * The two demos sit next to each other on purpose — they are two things the
 * same pane of glass can be told to do, and the page shows both being told.
 */
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION).replace(/</g, '\\u003c') }}
      />
      <Lit />
      <div className="env" aria-hidden="true" />

      <div className="page">
        <Header />

        <main id="main" tabIndex={-1}>
          <Hero />
          <Products />
          <Steps />
          <Specs />
          <Channels />
          <ClearOrMatte />
          <Applications />
          <Faq />
          <QuoteForm />
        </main>

        <Footer />
      </div>
    </>
  );
}
