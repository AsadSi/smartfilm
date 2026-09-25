'use client';

import Link from 'next/link';
import { useT } from './lang';
import { SubHeader } from './SubHeader';

/** An address that does not exist: say so, and point at the front page. */
export function NotFound() {
  const { NOT_FOUND } = useT();

  return (
    <>
      <SubHeader title={NOT_FOUND.title} />

      <main id="main" tabIndex={-1} className="section legal nf">
        <div className="wrap">
          <p className="kicker">{NOT_FOUND.kicker}</p>
          <h1>{NOT_FOUND.headline}</h1>
          <p className="lede">{NOT_FOUND.body}</p>
          <Link className="btn btn-primary" href="/">{NOT_FOUND.cta}</Link>
        </div>
      </main>
    </>
  );
}
