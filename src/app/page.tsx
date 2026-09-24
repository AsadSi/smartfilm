import { Applications, Faq, Specs } from '@/components/Sections';
import { ClearOrMatte } from '@/components/ClearOrMatte';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HoldToLight } from '@/components/HoldToLight';
import { Lit } from '@/components/Lit';
import { Products } from '@/components/Products';
import { QuoteForm } from '@/components/QuoteForm';
import { Steps } from '@/components/Steps';
import { ThemePicker } from '@/components/ThemePicker';

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
      <Lit />
      <div className="env" aria-hidden="true" />

      <div className="page">
        <Header />

        <main id="main" tabIndex={-1}>
          <Hero />
          <Products />
          <Steps />
          <Specs />
          <HoldToLight />
          <ClearOrMatte />
          <Applications />
          <Faq />
          <QuoteForm />
        </main>

        <Footer />

        {/* DEMO ONLY · remove before launch */}
        <ThemePicker />
      </div>
    </>
  );
}
