'use client';

import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { ButtonLink } from './ui';
import { HOME } from '@/content/pages';
import { UI } from '@/content/site';

/**
 * The closing ask. It sits on the black ground now rather than the light grey
 * one, which puts it in a run of black bands on the front page — hence the top
 * hairline, so it still reads as its own band and not as more of the process
 * band above it.
 */
export default function EndCta() {
  const t = useT();
  const { endCta } = HOME;

  return (
    <section className="band band-sep-dark bg-noir">
      <div className="shell-narrow flex flex-col items-center text-center">
        <Reveal>
          <h2 className="display-lg text-white">
            {t(endCta.title)} <em className="display-em-light">{t(endCta.titleEm)}</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-[46ch] text-white/65">{t(endCta.body)}</p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-9">
            <ButtonLink href="/kontakt">{t(UI.requestQuote)}</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
