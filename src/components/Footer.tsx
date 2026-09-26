'use client';

import Link from 'next/link';
import { SITE } from '@/content/site';
import { useT } from './lang';

/**
 * On the one-pager the links are in-page anchors. Anywhere else they need the
 * page in front of them, which base supplies.
 */
export function Footer({ base = '' }: { base?: string }) {
  const { FOOTER, UI } = useT();
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <a className="brand" href={`${base}#top`}><b>{SITE.name}</b><span>DANMARK</span></a>
            <p className="ftr-tag">{FOOTER.tagline}</p>
          </div>

          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}><a href={base + l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2>{UI.contact}</h2>
            <ul>
              <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><span>{SITE.street}<br />{SITE.postcode} {SITE.town}</span></li>
            </ul>
          </div>
        </div>

        <div className="ftr-bot">
          <span>
            © {new Date().getFullYear()} {SITE.full} · {UI.cvr} {SITE.cvr} · <Link href="/privatlivspolitik">{FOOTER.privacy}</Link>
          </span>
          <span>{UI.area}</span>
        </div>
      </div>
    </footer>
  );
}
