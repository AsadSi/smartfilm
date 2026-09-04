'use client';

import { Accordion } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useT } from './LanguageProvider';
import { specGroupsFor } from '@/content/products';
import { L } from '@/content/types';

/**
 * The full datasheet.
 *
 * Deliberately not wrapped in <Reveal>: a specification should be on the page
 * the instant it is scrolled to, not fade in. Values are set in tabular figures
 * so a column of numbers actually lines up, which is most of the difference
 * between a spec table and a brochure.
 *
 * Groups use Base UI's Accordion with `hiddenUntilFound`, so a collapsed panel
 * is still reachable by the browser's own find-in-page — a specifier searching
 * for "brandklasse" finds it without opening five panels first.
 */
export default function SpecSheet({ slug, name }: { slug: string; name: string }) {
  const t = useT();
  const groups = specGroupsFor(slug);
  if (!groups.length) return null;

  return (
    <section id="specifikationer" className="band anchor-below-subnav bg-sand">
      <div className="shell-narrow">
        <p className="eyebrow mb-5 block">{t(L('Specifikationer', 'Specifications'))}</p>
        <h2 className="display-lg text-ink">{name}</h2>

        <Accordion.Root
          hiddenUntilFound
          // Every group starts open. Filtering unconfirmed rows leaves only a
          // handful, and collapsing a five-row table is friction for its own
          // sake; the grouping still earns its place once the remaining
          // figures land.
          defaultValue={groups.map((group) => group.id)}
          className="mt-[clamp(2rem,4vw,3rem)] border-t border-line-strong/60"
        >
          {groups.map((group) => (
            <Accordion.Item key={group.id} value={group.id} className="border-b border-line-strong/40">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-300 hover:text-gold-deep">
                  <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-[1.05rem] font-semibold text-ink">{t(group.title)}</span>
                    {group.standard ? (
                      <span className="text-[12.5px] text-mut">{t(group.standard)}</span>
                    ) : null}
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="shrink-0 text-mut transition-transform duration-300 group-data-[open]:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Panel className="spec-panel overflow-hidden">
                <dl className="pb-5">
                  {group.rows.map((row) => (
                    <div
                      key={t(row.label)}
                      className="grid gap-1 border-t border-line py-3.5 sm:grid-cols-[1fr_1fr] sm:items-baseline sm:gap-6"
                    >
                      <dt className="text-[14px] text-mut">{t(row.label)}</dt>
                      <dd
                        className={
                          row.pending
                            ? 'figure-sm text-[14px] text-mut italic'
                            : 'figure-sm text-[15.5px] text-ink'
                        }
                      >
                        {t(row.value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <p className="mt-8 max-w-[62ch] text-[14px] leading-relaxed text-mut">
          {t(L(
            'Alle løsninger prissættes individuelt efter mål, pixelafstand og montering. Datablad, snitdetaljer og montagevejledning til projektmateriale rekvireres hos os.',
            'All solutions are priced individually by size, pixel pitch and installation. Datasheets, section details and installation guides for your project file are available on request.',
          ))}{' '}
          <Link href="/kontakt" className="text-gold-deep underline underline-offset-4">
            {t(L('Skriv til os', 'Get in touch'))}
          </Link>
        </p>
      </div>
    </section>
  );
}
