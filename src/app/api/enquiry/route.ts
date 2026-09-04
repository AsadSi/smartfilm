import { NextResponse } from 'next/server';

/**
 * Receives a project enquiry.
 *
 * Enquiries used to POST straight from the browser to a free third-party relay
 * with captcha disabled, while the form told the sender their details were
 * handled confidentially. Routing them through our own handler keeps the data
 * under our control, lets us reject bots server-side, and means swapping mail
 * provider is a change in one file rather than a change to the client bundle.
 *
 * Set ENQUIRY_WEBHOOK_URL (or replace `deliver` with a provider SDK) to send
 * mail. Until it is set the handler validates and logs, so the form is
 * exercisable in development without wiring a mailbox first.
 */

const FIELDS = ['navn', 'email', 'telefon', 'produkt', 'besked'] as const;

type Enquiry = Partial<Record<(typeof FIELDS)[number], string>>;

function validate(data: Enquiry): string | null {
  if (!data.navn?.trim()) return 'name';
  const email = data.email?.trim() ?? '';
  // Deliberately permissive: the mail server is the real validator, and a
  // regex that rejects a valid address loses a lead.
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'email';
  return null;
}

async function deliver(data: Enquiry) {
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    console.info('[enquiry] no ENQUIRY_WEBHOOK_URL set; enquiry not delivered', {
      ...data,
      email: '[redacted]',
    });
    return;
  }

  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Delivery failed: ${response.status}`);
}

export async function POST(request: Request) {
  let data: Enquiry = {};

  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    data = await request.json();
  } else {
    const form = await request.formData();
    // A bot fills the honeypot; a person never sees it. Answer 200 so the bot
    // has nothing to learn from the response.
    if (form.get('_honey')) return NextResponse.json({ ok: true });
    for (const field of FIELDS) {
      const value = form.get(field);
      if (typeof value === 'string') data[field] = value;
    }
  }

  const invalid = validate(data);
  if (invalid) {
    return NextResponse.json({ ok: false, field: invalid }, { status: 400 });
  }

  try {
    await deliver(data);
  } catch (error) {
    console.error('[enquiry] delivery failed', error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
