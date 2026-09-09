import V2Cta from '@/components/v2/V2Cta';
import V2Editorial from '@/components/v2/V2Editorial';
import V2Features from '@/components/v2/V2Features';
import V2Footer from '@/components/v2/V2Footer';
import V2Header from '@/components/v2/V2Header';
import V2Hero from '@/components/v2/V2Hero';
import V2Range from '@/components/v2/V2Range';
import V2Specs from '@/components/v2/V2Specs';
import V2Statement from '@/components/v2/V2Statement';

/**
 * The v2 template.
 *
 * One page, eight bands, and the whole sequence is the argument: film, range,
 * principle, principle, claim, data, proof, ask. That order is what the German
 * automotive sites all share underneath their different surfaces — desire
 * first, then the range, then the reason to believe, and only then the numbers.
 * Putting the specification table before the photography inverts it and the
 * page immediately reads as a catalogue.
 *
 * The grounds alternate paper → fog → graphite → paper → fog → void, so no two
 * adjacent bands share a background and the page has a rhythm even when it is
 * scrolled past at speed.
 */
export default function TemplatePage() {
  return (
    <>
      <V2Header />
      <main id="main">
        <V2Hero />
        <V2Range />
        <V2Features />
        <V2Statement />
        <V2Specs />
        <V2Editorial />
        <V2Cta />
      </main>
      <V2Footer />
    </>
  );
}
