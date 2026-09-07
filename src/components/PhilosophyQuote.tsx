'use client';

import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { OM_OS } from '@/content/pages';

/**
 * The philosophy pull quote, moved here when /om-os was folded into the front
 * page. It is deliberately NOT set in the display face: that face is uppercase
 * now, and a sentence of speech in uppercase reads as shouting rather than as
 * a quotation.
 */
export default function PhilosophyQuote() {
  const t = useT();

  return (
    <section id="filosofi" className="band bg-noir">
      <div className="shell-narrow flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow eyebrow-light block">{t(OM_OS.quote.eyebrow)}</p>
        </Reveal>
        <Reveal delay={120}>
          <blockquote className="mt-8 text-[clamp(1.35rem,2.8vw,2.1rem)] leading-[1.35] font-light text-balance text-white">
            {t(OM_OS.quote.text)}
          </blockquote>
        </Reveal>
        <Reveal delay={200}>
          <cite className="micro micro-light mt-8 block not-italic">SmartFilm Danmark</cite>
        </Reveal>
      </div>
    </section>
  );
}
