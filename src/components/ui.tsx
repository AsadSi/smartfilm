import { ArrowRight as LucideArrowRight, ChevronRight as LucideChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

/**
 * Icons come from Lucide, which is a consistent set at a single stroke weight.
 * These two wrappers keep the call sites unchanged and pin the sizes the design
 * uses, so a chevron in a link and a chevron in a card cannot drift apart.
 */
export function ChevronRight({ className = '' }: { className?: string }) {
  return <LucideChevronRight className={className} size={11} strokeWidth={3} aria-hidden="true" />;
}

export function ArrowRight({ className = '' }: { className?: string }) {
  return <LucideArrowRight className={className} size={14} strokeWidth={2} aria-hidden="true" />;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: 'gold' | 'ghost' | 'ghost-light';
  className?: string;
};

/** The pill. Filled blue on either ground, outlined when it sits over media. */
export function ButtonLink({ href, children, variant = 'gold', className = '' }: ButtonLinkProps) {
  const variantClass =
    variant === 'gold'
      ? 'btn-gold hover:bg-gold-hover hover:border-gold-hover'
      : variant === 'ghost'
        ? 'btn-ghost hover:border-ink'
        : 'btn-ghost-light hover:bg-white/10 hover:border-white/60';

  return (
    <Link href={href} className={`btn ${variantClass} ${className}`}>
      {children}
    </Link>
  );
}

type ChevLinkProps = {
  href: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, 'href' | 'children' | 'className'>;

/** Apple's text link: label plus a chevron that steps out on hover. */
export function ChevLink({ href, children, light = false, className = '', ...rest }: ChevLinkProps) {
  return (
    <Link
      href={href}
      className={`chev ${light ? 'chev-light' : ''} group hover:gap-[0.6rem] ${className}`}
      {...rest}
    >
      <span className="group-hover:underline underline-offset-4 decoration-1">{children}</span>
      <ChevronRight className="translate-y-px" />
    </Link>
  );
}

/** Section heading block: eyebrow, two-part headline, optional trailing link. */
export function SectionHead({
  eyebrow,
  title,
  em,
  action,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  em?: string;
  action?: ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap gap-x-10 gap-y-6 ${
        center ? 'flex-col items-center text-center' : 'items-baseline justify-between'
      }`}
    >
      <div className={center ? 'max-w-[26ch]' : 'max-w-[46ch]'}>
        {eyebrow ? (
          <p className={`eyebrow ${light ? 'eyebrow-light' : ''} mb-4 block`}>{eyebrow}</p>
        ) : null}
        {/* The accent half always takes its own line, so section headings read
            as a two-line stack rather than wrapping at an arbitrary word. */}
        <h2 className={`display-lg ${light ? 'text-white' : 'text-ink'}`}>
          {title}
          {em ? (
            <em className={`block ${light ? 'display-em-light' : 'display-em'}`}>{em}</em>
          ) : null}
        </h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
