import type { Metadata } from 'next';
import OmOsContent from './OmOsContent';
import { META } from '@/content/pages';

export const metadata: Metadata = {
  title: 'Om os',
  description: META['om-os'].description.da,
  openGraph: { images: [META['om-os'].og] },
};

export default function OmOsPage() {
  return <OmOsContent />;
}
