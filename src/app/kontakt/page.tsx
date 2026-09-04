import type { Metadata } from 'next';
import KontaktContent from './KontaktContent';
import { META } from '@/content/pages';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: META.kontakt.description.da,
  openGraph: { images: [META.kontakt.og] },
};

export default function KontaktPage() {
  return <KontaktContent />;
}
