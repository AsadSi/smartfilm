import EndCta from '@/components/EndCta';
import Hero from '@/components/Hero';
import ProcessBand from '@/components/ProcessBand';
import ReferenceBand from '@/components/ReferenceBand';
import SplitFeature from '@/components/SplitFeature';
import TechTiles from '@/components/TechTiles';
import { HOME } from '@/content/pages';
import { UI } from '@/content/site';
import { L } from '@/content/types';

export default function HomePage() {
  return (
    <>
      <Hero />

      <SplitFeature
        eyebrow={HOME.partner.eyebrow}
        title={HOME.partner.title}
        em={HOME.partner.titleEm}
        body={HOME.partner.body}
        image={{
          src: '/assets/gallery-1.jpg',
          alt: L('LED glasfacade om aftenen', 'LED glass facade at night'),
        }}
        cta={{ href: '/produkter', label: UI.seeCollection }}
      />

      <TechTiles />

      <ProcessBand />

      <ReferenceBand />

      <SplitFeature
        eyebrow={HOME.positioning.eyebrow}
        title={HOME.positioning.title}
        em={HOME.positioning.titleEm}
        body={HOME.positioning.body}
        image={{
          src: '/assets/gallery-2.jpg',
          alt: L('Transparent LED i et butiksvindue', 'Transparent LED in a shop window'),
        }}
        cta={{ href: '/om-os', label: HOME.positioning.cta }}
        reverse
        tinted
      />

      <EndCta />
    </>
  );
}
