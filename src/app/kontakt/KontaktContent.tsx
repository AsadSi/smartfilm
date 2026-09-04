'use client';

import ContactForm from '@/components/ContactForm';
import ProcessBand from '@/components/ProcessBand';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { useT } from '@/components/LanguageProvider';
import { KONTAKT } from '@/content/pages';
import { CONTACT_DETAILS } from '@/content/site';
import { L } from '@/content/types';

function DetailIcon({ name }: { name: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'mail') {
    return (
      <svg {...common}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    );
  }
  if (name === 'phone') {
    return (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }
  if (name === 'area') {
    return (
      <svg {...common}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export default function KontaktContent() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t(KONTAKT.eyebrow)}
        title={t(KONTAKT.title)}
        em={t(KONTAKT.titleEm)}
        lead={t(KONTAKT.lead)}
        image={{
          src: '/assets/hero-poster.jpg',
          alt: t(L('Glasfacade med lysteknologi', 'Glass facade with light technology')),
        }}
      />

      <section id="kontakt" className="band">
        <div className="shell grid items-start gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="lead max-w-[44ch]">{t(KONTAKT.formIntro)}</p>
            </Reveal>

            <ul className="mt-[clamp(2.5rem,5vw,3.5rem)] flex flex-col gap-7">
              {CONTACT_DETAILS.map((detail, i) => (
                <Reveal key={detail.key} delay={i * 80}>
                  <li className="flex gap-4">
                    <span className="mt-1 shrink-0 text-gold-deep">
                      <DetailIcon name={detail.key} />
                    </span>
                    <div>
                      <span className="micro mb-1.5 block">{t(detail.label)}</span>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="text-[15.5px] text-ink transition-colors duration-300 hover:text-gold-deep"
                        >
                          {t(detail.value)}
                        </a>
                      ) : (
                        <p className="text-[15.5px] text-ink">{t(detail.value)}</p>
                      )}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={140}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <ProcessBand />
    </>
  );
}
