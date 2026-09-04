import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privatlivspolitik',
  description:
    'Hvordan SmartFilm Danmark behandler personoplysninger fra forespørgsler og besøg på sitet.',
  robots: { index: true, follow: true },
};

export default function Page() {
  return <PrivacyContent />;
}
