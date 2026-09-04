'use client';

import { Accordion } from '@base-ui/react/accordion';
import { Plus } from 'lucide-react';
import Reveal from './Reveal';
import { useLanguage, useT } from './LanguageProvider';
import { faqFor } from '@/content/faq';
import { L } from '@/content/types';

/**
 * The procurement objections, answered in public.
 *
 * `hiddenUntilFound` keeps collapsed answers reachable by the browser's own
 * find-in-page, and the JSON-LD lets the same answers surface in search — which
 * is where most of these questions actually get asked first.
 */
export default function FaqAccordion({ product }: { product?: string }) {
  const t = useT();
  const { lang } = useLanguage();
  const items = faqFor(product);
  if (!items.length) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q[lang],
      acceptedAnswer: { '@type': 'Answer', text: item.a[lang] },
    })),
  };

  return (
    <section id="spoergsmaal" className="band anchor-below-subnav">
      <div className="shell-narrow">
        <Reveal>
          <p className="eyebrow mb-4 block">{t(L('Spørgsmål', 'Questions'))}</p>
          <h2 className="display-lg text-ink">
            {t(L('Det, der plejer', 'What usually'))}{' '}
            <em className="display-em block">{t(L('at blive spurgt om', 'gets asked'))}</em>
          </h2>
        </Reveal>

        <Accordion.Root
          hiddenUntilFound
          className="mt-[clamp(2rem,4vw,3rem)] border-t border-line-strong/50"
        >
          {items.map((item) => (
            <Accordion.Item key={item.id} value={item.id} className="border-b border-line-strong/40">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-gold-deep">
                  <span className="display-sm max-w-[46ch] text-ink group-hover:text-gold-deep">
                    {t(item.q)}
                  </span>
                  <Plus
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-gold-deep transition-transform duration-300 group-data-[open]:rotate-45"
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Panel className="spec-panel overflow-hidden">
                <p className="max-w-[62ch] pb-7 text-[15.5px] leading-[1.75] text-mut-2">
                  {t(item.a)}
                </p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
