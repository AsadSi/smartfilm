'use client';

import Link from 'next/link';
import PlaceholderBadge from './PlaceholderBadge';
import { useT } from './LanguageProvider';
import { FOOTER, SITE, UI } from '@/content/site';

export default function Footer() {
  const t = useT();

  return (
    <footer className="band-sep-dark bg-noir text-white/70">
      <div className="shell grid gap-12 pt-[clamp(4rem,7vw,6rem)] pb-[clamp(2.5rem,4vw,3.5rem)] sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" aria-label="SmartFilm Danmark" className="inline-flex flex-col leading-none">
            <span className="text-[1.2rem] font-semibold uppercase tracking-[0.2em] text-white">
              Smartfilm
            </span>
            <span className="mt-[5px] mb-[3px] h-px w-full bg-gold-light" />
            <span className="text-[0.58rem] font-medium uppercase tracking-[0.38em] text-gold-light">
              Danmark
            </span>
          </Link>
          <p className="mt-7 max-w-[34ch] text-[14.5px] leading-relaxed text-white/55">
            {t(FOOTER.tagline)}
          </p>
        </div>

        {FOOTER.columns.map((column) => (
          <div key={t(column.title)}>
            <p className="micro mb-5 text-white/85">{t(column.title)}</p>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/55 transition-colors duration-300 hover:text-gold-light"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="micro mb-5 text-white/85">{t(UI.contact)}</p>
          <ul className="flex flex-col gap-3 text-[14px]">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="text-white/55 transition-colors duration-300 hover:text-gold-light"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="text-white/55 transition-colors duration-300 hover:text-gold-light"
              >
                {SITE.phone}
              </a>
            </li>
            <li className="text-white/55">Danmark</li>
            <li className="figure-sm text-white/55">
              CVR {SITE.cvr}
              {SITE.cvrPlaceholder ? (
                <span className="ml-2 align-middle">
                  <PlaceholderBadge label="CVR" />
                </span>
              ) : null}
            </li>
          </ul>
        </div>
      </div>

      <div className="shell flex flex-wrap justify-between gap-4 border-t border-white/15 py-6 text-[11px] font-medium tracking-[0.14em] text-white/55">
        <span>{t(FOOTER.copyright)}</span>
        <Link href="/privatlivspolitik" className="transition-colors hover:text-gold-light">
          {t(UI.privacy)}
        </Link>
        <span>{SITE.name}</span>
      </div>
    </footer>
  );
}
