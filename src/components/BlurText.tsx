'use client';

import { MotionConfig, motion, useInView } from 'motion/react';
import { Fragment, useRef } from 'react';

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
 *  - reduced motion drops the rise and keeps the blur settling, which is a
 *    change of focus rather than movement.
 *
 * With scripting off every word would stay at opacity 0, so the <noscript>
 * rule in the layout forces them visible.
 */
export function BlurText({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const from = { opacity: 0, filter: 'blur(10px)', y: 12 };

  return (
    <MotionConfig reducedMotion="user">
      <h1 ref={ref} className="blur-text" aria-label={text}>
        {text.split(' ').map((word, i) => (
          <Fragment key={i}>
            {i > 0 ? ' ' : null}
            <motion.span
              aria-hidden="true"
              initial={from}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : from}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.09, ease: [0.23, 1, 0.32, 1] }}
            >
              {word}
            </motion.span>
          </Fragment>
        ))}
      </h1>
    </MotionConfig>
  );
}
