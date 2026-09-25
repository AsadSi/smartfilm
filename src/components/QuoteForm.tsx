'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { SITE } from '@/content/site';
import { useT } from './lang';
import { Reveal } from './Reveal';

// Deliberately permissive: the mail client is the real validator, and a regex
// that rejects a valid address loses a lead.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * The enquiry opens the sender's own mail client with the message composed.
 *
 * That is the behaviour the client approved and it is worth keeping: it needs
 * no mailbox, no relay, no key in an environment variable, and the sender
 * keeps a copy of what they sent in their own outbox. The cost is that the
 * page cannot know whether it was actually sent, so it says the mail client
 * opened rather than claiming anything about delivery.
 */
export function QuoteForm() {
  const { QUOTE, UI } = useT();
  const REQUIRED = [
    { id: 'name', label: QUOTE.fields.name.label },
    { id: 'email', label: QUOTE.fields.email.label },
  ];
  const [bad, setBad] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const get = (id: string) => (form.elements.namedItem(id) as HTMLInputElement | null)?.value ?? '';

    const failed = REQUIRED.filter((f) =>
      f.id === 'email' ? !EMAIL.test(get('email').trim()) : get(f.id).trim().length < 2,
    ).map((f) => f.id);

    setBad(failed);
    if (failed.length) {
      summaryRef.current?.focus();
      return;
    }

    const body = [
      `${QUOTE.fields.name.label}: ${get('name')}`,
      `${QUOTE.fields.company.label}: ${get('company')}`,
      `${QUOTE.fields.email.label}: ${get('email')}`,
      `${QUOTE.fields.phone.label}: ${get('phone')}`,
      `${QUOTE.fields.size.label}: ${get('size')}`,
      '',
      get('message'),
    ].join('\n');

    window.location.assign(
      `mailto:${SITE.email}?subject=${encodeURIComponent(QUOTE.subject)}` +
      `&body=${encodeURIComponent(body)}`,
    );
    setSent(true);
  };

  const field = (id: string, label: string, error: string | undefined, input: React.ReactNode) => (
    <div className={`field${bad.includes(id) ? ' bad' : ''}`}>
      <label htmlFor={`f-${id}`}>
        {label}
        {error ? <span className="req" aria-hidden="true">*</span> : null}
      </label>
      {input}
      {error ? <span className="err" id={`e-${id}`}>{error}</span> : null}
    </div>
  );

  return (
    <section className="section cta" id="tilbud">
      <div className="wrap">
        <div className="cta-grid">
          <Reveal>
            <p className="kicker">{QUOTE.kicker}</p>
            <h2>{QUOTE.headline}</h2>
            <hr className="edge" />
            <p className="lede">{QUOTE.lede}</p>
            <ul className="facts">
              <li><div>{UI.facts.email}</div><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><div>{UI.facts.phone}</div><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><div>{UI.facts.area}</div><p>{UI.area}</p></li>
              <li><div>{UI.facts.reply}</div><p>{UI.reply}</p></li>
            </ul>
          </Reveal>

          <Reveal className="form">
            <div className={`sent${sent ? ' show' : ''}`} role="status" aria-live="polite">
              <span className="tick">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12.5 4.5 4.5L19 6" />
                </svg>
              </span>
              <h3>{QUOTE.sent.title}</h3>
              <p>{QUOTE.sent.body}</p>
            </div>

            {sent ? null : (
              <form onSubmit={submit} noValidate>
                <div
                  ref={summaryRef}
                  className={`summary${bad.length ? ' show' : ''}`}
                  tabIndex={-1}
                  role="alert"
                >
                  <p>{QUOTE.summary}</p>
                  <ul>
                    {REQUIRED.filter((f) => bad.includes(f.id)).map((f) => (
                      <li key={f.id}><a href={`#f-${f.id}`}>{f.label}</a></li>
                    ))}
                  </ul>
                </div>

                <div className="row two">
                  {field('name', QUOTE.fields.name.label, QUOTE.fields.name.error,
                    <input id="f-name" name="name" type="text" autoComplete="name" aria-describedby="e-name" />)}
                  {field('company', QUOTE.fields.company.label, undefined,
                    <input id="f-company" name="company" type="text" autoComplete="organization" />)}
                </div>

                <div className="row two">
                  {field('email', QUOTE.fields.email.label, QUOTE.fields.email.error,
                    <input id="f-email" name="email" type="email" inputMode="email" autoComplete="email" aria-describedby="e-email" />)}
                  {field('phone', QUOTE.fields.phone.label, undefined,
                    <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" />)}
                </div>

                {field('size', QUOTE.fields.size.label, undefined,
                  <input id="f-size" name="size" type="text" placeholder={QUOTE.fields.size.placeholder} />)}

                {field('message', QUOTE.fields.message.label, undefined,
                  <textarea id="f-message" name="message" placeholder={QUOTE.fields.message.placeholder} />)}

                <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                  {QUOTE.submit}
                </button>
                <p className="hint" style={{ marginTop: 16 }}>
                  {QUOTE.hint} <Link href="/privatlivspolitik">{QUOTE.privacy}</Link>.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
