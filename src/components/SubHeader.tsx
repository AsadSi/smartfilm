'use client';

import { ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { SITE } from '@/content/site';
import { setLang, useT } from './lang';

/**
 * The header for the pages that are not the one-pager — the privacy policy
 * and the 404. It is the site's own header, held solid because there is no
 * hero under it to be white over, with the way back to the front page and the
 * language switch, so these pages follow the reader's language like the rest.
 */
export function SubHeader({ title }: { title: string }) {
  const t = useT();

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
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
  );
}
