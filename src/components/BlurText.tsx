import { Fragment } from 'react';

/**
 * React Bits' BlurText (reactbits.dev/text-animations/blur-text), cut down to
 * the one way this page uses it. The words arrive frosted and settle clear —
 * the Smart Film switch, played once on the headline.
 *
 * Changed from the original in three places:
 *  - it is the heading itself, named by the whole line, so a screen reader
 *    hears one sentence rather than five separate words;
 *  - Emil Kowalski's ease-out and a 12px rise, in place of linear time and a
 *    50px drop;
 *  - it is a CSS animation (.blur-text in globals.css), not Motion. It only
 *    ever plays in the hero, on load, so it needs no in-view check, and in CSS
 *    it starts on the first paint instead of waiting for hydration — this
 *    headline is the largest thing on a phone's first screen.
 */
export function BlurText({ text }: { text: string }) {
  return (
    <h1 className="blur-text" aria-label={text}>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          {i > 0 ? ' ' : null}
          <span aria-hidden="true" style={{ '--i': i } as React.CSSProperties}>{word}</span>
        </Fragment>
      ))}
    </h1>
  );
}
