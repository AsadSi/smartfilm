'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Reveal on scroll.
 *
 * Carries both jobs the stylesheet expects of it: `.in.rise` reveals the
 * element itself, and `.in .rise` reveals `.rise` children on a stagger. So a
 * group like the three steps is one Reveal with `.rise` children, and a single
 * block is a Reveal with nothing inside it that cares.
 *
 * `done` lands a beat later and retires the stagger delays, or a hover on the
 * third step inherits a 270ms wait for the rest of the session.
 *
 * There is no fallback for a missing IntersectionObserver. `.rise` starts at
 * opacity 0, so anything that stops this running hides the page — and the case
 * that actually matters is scripting being off altogether, which a <noscript>
 * rule in the layout covers for every element at once.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  id,
  style,
}: {
  children: ReactNode;
  as?: 'div' | 'section' | 'ul' | 'article';
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'' | 'in' | 'in done'>('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState('in');
        timer = setTimeout(() => setState('in done'), 1200);
        io.disconnect();
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <Tag ref={ref as React.Ref<never>} id={id} style={style} className={`rise ${state} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
