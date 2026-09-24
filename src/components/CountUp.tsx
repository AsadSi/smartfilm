'use client';

import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

/**
 * React Bits' CountUp (reactbits.dev/text-animations/count-up), adapted to
 * take a figure the way the page writes it — "99 %", "160°", "150+" — and
 * count only the number inside. Figures under 10 are left as they are:
 * counting to 2 is not a count.
 *
 * The finished figure is in the server HTML, so it reads correctly with
 * scripting off, and a screen reader gets it whole from the hidden copy rather
 * than hearing every step. The spring is React Bits' own for a two-second run.
 */
export function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  if (!m || Number(m[2]) < 10) return <>{value}</>;
  return <Counter value={value} prefix={m[1]} to={Number(m[2])} suffix={m[3]} />;
}

function Counter({ value, prefix, to, suffix }: { value: string; prefix: string; to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const target = useMotionValue(0);
  const spring = useSpring(target, { damping: 40, stiffness: 50 });
  const inView = useInView(ref, { once: true });

  // Start from nothing once scripting is here. The figure is below the fold,
  // so no one sees it drop from the finished number to zero.
  useEffect(() => {
    if (ref.current) ref.current.textContent = '0';
  }, []);

  useEffect(() => {
    if (inView) target.set(to);
  }, [inView, target, to]);

  useEffect(
    () => spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = String(Math.round(v));
    }),
    [spring],
  );

  return (
    <>
      <span className="sr">{value}</span>
      <span aria-hidden="true">{prefix}<span ref={ref}>{to}</span>{suffix}</span>
    </>
  );
}
