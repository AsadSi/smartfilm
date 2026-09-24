'use client';

import { SITE } from '@/content/site';
import { useT } from './lang';

export function Footer() {
  const { FOOTER, UI } = useT();
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <a className="brand" href="#top"><b>{SITE.name}</b><span>DANMARK</span></a>
            <p className="ftr-tag">{FOOTER.tagline}</p>
          </div>

          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4>{UI.contact}</h4>
            <ul>
              <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="ftr-bot">
          <span>© {new Date().getFullYear()} {SITE.full}{SITE.cvr ? `, CVR ${SITE.cvr}` : ''}</span>
          <span>{UI.area}</span>
        </div>
      </div>
    </footer>
  );
}
