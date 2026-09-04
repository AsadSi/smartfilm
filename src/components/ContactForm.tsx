'use client';

import { ChevronDown } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useLanguage } from './LanguageProvider';
import { FORM, SITE } from '@/content/site';
import { L } from '@/content/types';

type Status = 'idle' | 'sending' | 'ok' | 'error';

/**
 * Controls carry a real border rather than the decorative hairline: at 1.3:1
 * the old `--color-line` underline was invisible as a control boundary, which
 * is a WCAG failure as well as a usability one.
 */
const fieldClass =
  'min-h-[52px] w-full rounded-lg border border-line-strong/70 bg-cream px-4 py-3 text-[15.5px] text-ink outline-none transition-colors duration-300 placeholder:text-mut focus:border-gold-deep';

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('sending');

    try {
      const response = await fetch(SITE.formEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Enquiry endpoint returned ${response.status}`);
      form.reset();
      setStatus('ok');
    } catch {
      // The enquiry matters more than the transport: hand it to the mail client
      // rather than losing what the sender just typed.
      setStatus('error');
      const subject = encodeURIComponent('Tilbudsforespørgsel – SmartFilm Danmark');
      const body = encodeURIComponent(
        [...data.entries()]
          .filter(([key]) => !key.startsWith('_'))
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n'),
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      action={SITE.formEndpoint}
      method="POST"
      className="w-full"
    >
      {/* Honeypot — bots fill it, people never see it. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />

      <div className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="micro">{t(FORM.name.label)}</span>
          <input
            type="text"
            name="navn"
            required
            autoComplete="name"
            placeholder={t(FORM.name.placeholder)}
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="micro">{t(FORM.email.label)}</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={t(FORM.email.placeholder)}
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="micro">{t(FORM.phone.label)}</span>
          <input
            type="tel"
            name="telefon"
            autoComplete="tel"
            placeholder={t(FORM.phone.placeholder)}
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="micro">{t(FORM.interest.label)}</span>
          {/* `appearance-none` previously stripped the native arrow and put
              nothing back, leaving a select that did not look like one. */}
          <span className="relative block">
            <select name="produkt" className={`${fieldClass} cursor-pointer appearance-none pr-11`}>
              {FORM.interestOptions.map((option) => (
                <option key={t(option)}>{t(option)}</option>
              ))}
            </select>
            <ChevronDown
              size={18}
              strokeWidth={2}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-mut"
            />
          </span>
        </label>

        <label className="flex flex-col gap-2">
          <span className="micro">{t(FORM.project.label)}</span>
          <textarea
            name="besked"
            rows={4}
            placeholder={t(FORM.project.placeholder)}
            className={`${fieldClass} resize-y leading-relaxed`}
          />
        </label>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn btn-gold mt-1 w-full hover:bg-gold-light disabled:opacity-60"
        >
          {status === 'sending' ? t(FORM.sending) : t(FORM.submit)}
        </button>

        <p role="status" aria-live="polite" className="min-h-[1.2em] text-center text-[13.5px]">
          {status === 'ok' ? <span className="text-[#3f6b33]">{t(FORM.success)}</span> : null}
          {status === 'error' ? <span className="text-[#8f3325]">{t(FORM.error)}</span> : null}
        </p>

        <p className="-mt-3 text-center text-[12px] text-mut">
          {t(FORM.note)}{' '}
          <a href="/privatlivspolitik" className="underline underline-offset-2 hover:text-gold-deep">
            {t(L('Privatlivspolitik', 'Privacy policy'))}
          </a>
        </p>
      </div>
    </form>
  );
}
