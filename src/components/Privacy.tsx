'use client';

import { ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { SITE } from '@/content/site';
import { setLang, useT } from './lang';

/**
 * The privacy policy: a plain header that leads back to the one-pager, and the
 * policy as headed paragraphs at a reading measure. The header is the site's
 * own, held solid — there is no hero under it to be white over — and carries
 * the language switch, so the page follows the reader's language like the rest.
 */
export function Privacy() {
  const t = useT();
  const { PRIVACY } = t;

  useEffect(() => {
    document.title = PRIVACY.title;
  }, [PRIVACY]);

  return (
    <>
      <header className="hdr solid">
        <a className="skip" href="#main">{t.UI.skip}</a>

        <div className="wrap">
          <div className="hdr-l">
            <Link className="hdr-link back" href="/">
              <ArrowLeft aria-hidden="true" size={14} strokeWidth={1.5} />
              {t.UI.home}
            </Link>
          </div>

          <Link className="brand" href="/">
            <b>{SITE.name}</b>
            <span>DANMARK</span>
          </Link>

          <div className="hdr-r">
            <button type="button" className="hdr-link lang-btn" lang={t.UI.switchTo.lang} onClick={() => setLang(t.UI.switchTo.lang)}>
              <Globe aria-hidden="true" size={14} strokeWidth={1.5} />
              {t.UI.switchTo.code}
              <span className="sr"> · {t.UI.switchTo.label}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="section legal">
        <div className="wrap">
          <p className="kicker">{PRIVACY.updated}</p>
          <h1>{PRIVACY.headline}</h1>
          <p className="lede">{PRIVACY.lede}</p>

          {PRIVACY.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {s.body.map((p) => <p key={p}>{p}</p>)}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
