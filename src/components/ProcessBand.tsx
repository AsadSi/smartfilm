'use client';

import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { SectionHead } from './ui';
import { PROCESS } from '@/content/process';
import { L } from '@/content/types';

/**
 * What happens between an enquiry and a working installation.
 *
 * A specifier will not commit to glass they cannot see a process behind, and
 * this is the question the site previously left unanswered. It needs no client
 * data, which makes it the cheapest credibility on the site — so it sits on the
 * home page rather than being buried on an "about" page.
 */
export default function ProcessBand() {
  const t = useT();

  return (
    <section id="proces" className="band bg-noir">
      <div className="shell">
        <Reveal>
          <SectionHead
            light
            eyebrow={t(L('Sådan arbejder vi', 'How we work'))}
            title={t(L('Fra forespørgsel', 'From enquiry'))}
            em={t(L('til færdigt glas', 'to finished glass'))}
          />
        </Reveal>

        <ol className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-8 gap-y-[clamp(2.5rem,4vw,3rem)] md:grid-cols-3 lg:grid-cols-5">
          {PROCESS.map((step, i) => (
            <Reveal
              key={step.id}
              as="li"
              delay={i * 70}
              className="flex h-full flex-col gap-4 border-t border-white/15 pt-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="figure-sm text-[13px] font-semibold tracking-[0.24em] text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="figure-sm text-[11px] tracking-[0.14em] text-white/55 uppercase">
                  {t(step.duration)}
                </span>
              </div>

              <h3 className="text-[1.05rem] leading-snug font-semibold text-white">
                {t(step.title)}
              </h3>

              <p className="text-[14.5px] leading-relaxed text-white/65">{t(step.body)}</p>

              <p className="mt-auto pt-4 text-[13px] text-gold-light">{t(step.output)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
