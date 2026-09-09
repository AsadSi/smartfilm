'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Reveal on scroll.
 *
 * Two variants because they are two different jobs: text and controls rise into
 * place, media only fades. A photograph that slides upward reads as a
 * slideshow, which is precisely the register this language is trying to avoid.
 *
 * The observer disconnects after the first intersection — nothing here should
 * animate a second time when the user scrolls back up.
 */
export function Reveal({
  children,
  delay = 0,
  fade = false,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  /** Milliseconds. Used to stagger siblings; keep the total under ~240ms. */
  delay?: number;
  /** Fade only, no rise. Use for anything photographic. */
  fade?: boolean;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        io.disconnect();
      },
      // Fires a little before the element reaches the fold, so the motion has
      // finished by the time it is properly in view rather than starting there.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // One generic ref across the union of tags; React's per-tag ref types do
      // not unify, and every member here is an HTMLElement.
      ref={ref as React.Ref<never>}
      data-visible={visible}
      className={`v2-reveal ${fade ? 'v2-reveal-fade' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** The arrow that carries every text link. Steps forward 4px on hover. */
export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

/**
 * A single `<video>` with an H.265 source ahead of the H.264 fallback.
 *
 * Every video on the page is decoration behind or beside copy, so all of them
 * are muted, looping and `playsInline` — and all of them carry a poster, so the
 * band has something to show in the moment before the file arrives.
 */
export function Loop({
  video,
  videoHevc,
  poster,
  className = '',
  ref,
  ...rest
}: {
  video: string;
  videoHevc?: string;
  poster: string;
  className?: string;
  // React 19 passes `ref` through as an ordinary prop, so the pause control on
  // the hero can reach the element without a forwardRef wrapper.
  ref?: React.Ref<HTMLVideoElement>;
} & React.VideoHTMLAttributes<HTMLVideoElement>) {
  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      {...rest}
    >
      {videoHevc ? <source src={videoHevc} type='video/mp4; codecs="hvc1"' /> : null}
      <source src={video} type="video/mp4" />
    </video>
  );
}
