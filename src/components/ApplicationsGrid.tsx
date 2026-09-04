'use client';

import Reveal from './Reveal';
import { useT } from './LanguageProvider';
import { applicationsFor } from '@/content/products';
import { L } from '@/content/types';

/** Where the product actually gets used — a specifier's first question. */
export default function ApplicationsGrid({ slug }: { slug: string }) {
  const t = useT();
  const items = applicationsFor(slug);
  if (!items.length) return null;

  return (
    <section id="anvendelse" className="band-tight anchor-below-subnav bg-sand">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4 block">{t(L('Anvendelse', 'Applications'))}</p>
          <h2 className="display-sm max-w-[26ch] text-ink">
            {t(L('Hvor det typisk sidder', 'Where it typically sits'))}
          </h2>
        </Reveal>

        <div className="mt-[clamp(2.5rem,5vw,3.5rem)] grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 70}>
              <div>
                <h3 className="text-[1rem] font-semibold text-ink">{t(item.title)}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-mut-2">{t(item.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
