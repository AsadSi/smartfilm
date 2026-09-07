'use client';

import Image from 'next/image';
import { useState } from 'react';
import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { REFERENCER } from '@/content/pages';

/**
 * The reference band's photography, in the order the cases are written. Every
 * photograph on this page now appears exactly once — these three were sharing
 * led-facade-night and led-shopwindow with the "why" cards below, which made
 * the page read as three views of the same two installations. Mediefacade
 * carries a new client render of a retail media facade, Butiksvindue takes the
 * retail shot the LED Film page no longer needs, and Mødelokale og klinik
 * carries the 3D Media Glass photograph.
 */
const SHOTS = [
  { src: '/assets/led-mall-facade.jpg', position: 'center' },
  { src: '/assets/gallery-2.jpg', position: 'center 40%' },
  { src: '/assets/media-glass-mall.jpg', position: 'center 45%' },
];

/**
 * Vitrocsa's "Highlighted Projects": a centred heading over a paragraph of
 * intro, then the projects as a row of tab labels above one large image. Only
 * the selected project's description is shown, so the band stays one screen
 * tall however many cases get added later.
 */
export default function ProjectsTabs() {
  const t = useT();
  const [active, setActive] = useState(0);
  const items = REFERENCER.cases.items;
  const current = items[active];

  return (
    <section id="referencer" className="band bg-noir">
      <div className="shell">
        <Reveal>
          <div className="mx-auto max-w-[52rem] text-center">
            <p className="eyebrow eyebrow-light mb-5 block">{t(REFERENCER.cases.eyebrow)}</p>
            <h2 className="display-lg text-white">{t(REFERENCER.cases.title)}</h2>
            <p className="lead lead-light mx-auto mt-6 max-w-[54ch]">{t(REFERENCER.lead)}</p>
          </div>
        </Reveal>

        {/* Tab labels. Vitrocsa sets these as widely tracked micro-caps with a
            rule under the active one and nothing else. */}
        <Reveal>
          <div
            role="tablist"
            aria-label={t(REFERENCER.cases.title)}
            className="mt-[clamp(2.5rem,5vw,3.5rem)] flex flex-wrap justify-center gap-x-10 gap-y-4 border-b border-white/15"
          >
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                id={`project-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`project-panel-${i}`}
                onClick={() => setActive(i)}
                className={`micro micro-light -mb-px border-b-2 pb-4 transition-colors duration-300 ${
                  i === active
                    ? 'border-gold-light !text-white'
                    : 'border-transparent hover:!text-white'
                }`}
              >
                {t(item.title)}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div
            role="tabpanel"
            id={`project-panel-${active}`}
            aria-labelledby={`project-tab-${active}`}
            className="mt-[clamp(2rem,4vw,3rem)]"
          >
            <div className="media-frame relative aspect-[16/9] w-full bg-noir-2">
              {/* All three stay mounted so switching tabs never shows an empty
                  frame while the next photograph decodes. */}
              {items.map((item, i) => {
                const shot = SHOTS[i % SHOTS.length];
                return (
                  <Image
                    key={i}
                    src={shot.src}
                    alt={t(item.title)}
                    fill
                    sizes="(min-width: 1200px) 1200px, 100vw"
                    style={{ objectPosition: shot.position }}
                    className={`object-cover transition-opacity duration-700 ease-[var(--ease-out-soft)] ${
                      i === active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                );
              })}
            </div>

            <div className="mt-8">
              <p className="mx-auto max-w-[58ch] text-center text-[15.5px] leading-relaxed text-white/65">
                {t(current.body)}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
