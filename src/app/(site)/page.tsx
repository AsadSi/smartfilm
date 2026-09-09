import EndCta from '@/components/EndCta';
import Hero from '@/components/Hero';
import LoopBand from '@/components/LoopBand';
import PhilosophyQuote from '@/components/PhilosophyQuote';
import ProcessBand from '@/components/ProcessBand';
import ProjectsTabs from '@/components/ProjectsTabs';
import ReferenceBand from '@/components/ReferenceBand';
import Stats from '@/components/Stats';
import SystemsRow from '@/components/SystemsRow';
import WhyCards from '@/components/WhyCards';

/**
 * One page for everything except the products.
 *
 * /referencer and /om-os were folded in here: the reference film and the
 * installation types carry the first, and the three principles, the figures and
 * the philosophy quote carry the second. Both old URLs redirect to the anchors
 * below (see next.config.ts), and the nav points at them too.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SystemsRow />

      {/* was /referencer */}
      <ReferenceBand />
      <ProjectsTabs />

      {/* Moved off /led-film, so the three product pages run the same sequence.
          It sits a band away from the reference film rather than beside it —
          two container-width clips back to back read as one long video. */}
      <LoopBand />

      {/* was /om-os */}
      <WhyCards />
      <Stats />
      <PhilosophyQuote />

      <ProcessBand />
      <EndCta />
    </>
  );
}
