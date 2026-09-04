'use client';

import EndCta from '@/components/EndCta';
import PageHero from '@/components/PageHero';
import ReferenceBand from '@/components/ReferenceBand';
import Reveal from '@/components/Reveal';
import { useT } from '@/components/LanguageProvider';
import { SectionHead } from '@/components/ui';
import { REFERENCER } from '@/content/pages';
import { L } from '@/content/types';

export default function ReferencerContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(REFERENCER.eyebrow)}
        title={t(REFERENCER.title)}
        em={t(REFERENCER.titleEm)}
        lead={t(REFERENCER.lead)}
        image={{
          src: '/assets/ref-poster.jpg',
          alt: t(L('Mediefacade med transparent LED', 'Media facade with transparent LED')),
        }}
      />

      <ReferenceBand withCaption={false} />

      {/* Types of installation, not named clients. Set as a plain measure of
          text with air around it rather than as cards — there are only four,
          and a card apiece would add three borders and no information. */}
      <section className="band">
        <div className="shell-narrow">
          <Reveal>
            <SectionHead eyebrow={t(REFERENCER.cases.eyebrow)} title={t(REFERENCER.cases.title)} />
          </Reveal>

          <div className="mt-[clamp(3rem,6vw,4.5rem)] flex flex-col gap-[clamp(2.5rem,5vw,4rem)]">
            {REFERENCER.cases.items.map((item, i) => (
              <Reveal key={t(item.title)} delay={i * 80}>
                <article className="grid gap-x-[clamp(1.5rem,4vw,3rem)] gap-y-3 sm:grid-cols-[4rem_1fr]">
                  <span className="figure-sm pt-1 text-[12px] tracking-[0.28em] text-gold-deep">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="display-sm text-ink">{t(item.title)}</h3>
                    <p className="mt-3 max-w-[58ch] text-[15.5px] leading-[1.75] text-mut-2">
                      {t(item.body)}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EndCta />
    </>
  );
}
