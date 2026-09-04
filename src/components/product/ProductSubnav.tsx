'use client';

import Link from 'next/link';
import { useT } from '@/components/LanguageProvider';
import { UI } from '@/content/site';
import { L } from '@/content/types';

/**
 * Sticks under the header for the length of the product page — the pattern
 * Apple uses so the buy action is never more than a glance away.
 */
export default function ProductSubnav({ name }: { name: string }) {
  const t = useT();

  return (
    <nav
      aria-label={name}
      className="sticky top-[var(--header-h)] z-[90] border-b border-line/70 bg-cream/85 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="shell flex h-14 items-center gap-6">
        <span className="text-[1.05rem] font-semibold whitespace-nowrap text-ink">{name}</span>

        <div className="ml-auto hidden items-center gap-7 lg:flex">
          {[
            { href: '#overblik', label: t(UI.overview) },
            { href: '#anvendelse', label: t(L('Anvendelse', 'Applications')) },
            { href: '#specifikationer', label: t(UI.specifications) },
            { href: '#dokumenter', label: t(L('Dokumenter', 'Documents')) },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-mut transition-colors duration-300 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>

        <Link
          href="/kontakt"
          className="btn btn-gold ml-auto !min-h-0 !px-4 !py-2 !text-[12.5px] hover:bg-gold-light lg:ml-0"
        >
          {t(UI.requestPrice)}
        </Link>
      </div>
    </nav>
  );
}
