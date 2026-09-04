'use client';

import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { ButtonLink } from './ui';
import { HOME } from '@/content/pages';
import { UI } from '@/content/site';

/** The closing ask, on the sand band that separates it from the footer. */
export default function EndCta() {
  const t = useT();
  const { endCta } = HOME;

  return (
    <section className="band bg-sand">
      <div className="shell-narrow flex flex-col items-center text-center">
        <Reveal>
          <h2 className="display-lg text-ink">
            {t(endCta.title)} <em className="display-em">{t(endCta.titleEm)}</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-[46ch] text-mut-2">{t(endCta.body)}</p>
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
