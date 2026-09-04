'use client';

import EndCta from '@/components/EndCta';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import SplitFeature from '@/components/SplitFeature';
import Stats from '@/components/Stats';
import { useT } from '@/components/LanguageProvider';
import { ButtonLink } from '@/components/ui';
import { HOME, OM_OS } from '@/content/pages';
import { UI } from '@/content/site';
import { L } from '@/content/types';

export default function OmOsContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(OM_OS.eyebrow)}
        title={t(OM_OS.title)}
        em={t(OM_OS.titleEm)}
        lead={t(OM_OS.lead)}
        image={{
          src: '/assets/gallery-1.jpg',
          alt: t(L('LED glasfacade om aftenen', 'LED glass facade at night')),
        }}
      />

      {/* The three principles, on the dark ground so they read as a statement */}
      <section className="band bg-noir">
        <div className="shell text-center">
          <Reveal>
            <p className="eyebrow eyebrow-light block">{t(OM_OS.statement.eyebrow)}</p>
            <h2 className="display-lg mx-auto mt-6 max-w-[20ch] text-white">
              {t(OM_OS.statement.title)}
            </h2>
          </Reveal>

          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-[clamp(2.5rem,4vw,3.5rem)] text-left md:grid-cols-3">
            {OM_OS.statement.points.map((point, i) => (
              <Reveal key={t(point.title)} delay={i * 110}>
                <div className="border-t border-gold/35 pt-6">
                  <span className="block text-[11px] font-medium tracking-[0.3em] text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-[1.05rem] leading-snug font-medium text-gold-light">
                    {t(point.title)}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-white/65">
                    {t(point.body)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220}>
            <div className="mt-[clamp(3rem,5vw,4rem)]">
              <ButtonLink href="/kontakt">{t(UI.requestQuote)}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Stats />

      <SplitFeature
        eyebrow={HOME.positioning.eyebrow}
        title={HOME.positioning.title}
        em={HOME.positioning.titleEm}
        body={HOME.positioning.body}
        image={{
          src: '/assets/gallery-3.jpg',
          alt: L('3D medieglas i en restaurant', '3D media glass in a restaurant'),
        }}
        cta={{ href: '/produkter', label: UI.seeCollection }}
        reverse
      />

      {/* Philosophy, set as a pull quote */}
      <section className="band bg-sand">
        <div className="shell-narrow flex flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow block">{t(OM_OS.quote.eyebrow)}</p>
          </Reveal>
          <Reveal delay={120}>
            <blockquote className="font-display mt-8 text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.24] font-normal text-ink italic">
              {t(OM_OS.quote.text)}
            </blockquote>
          </Reveal>
          <Reveal delay={200}>
            <cite className="micro mt-8 block not-italic">SmartFilm Danmark</cite>
          </Reveal>
        </div>
      </section>

      <EndCta />
    </>
  );
}
