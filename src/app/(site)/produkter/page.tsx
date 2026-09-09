import type { Metadata } from 'next';
import ProduktContent from './ProduktContent';
import { META } from '@/content/pages';

export const metadata: Metadata = {
  title: 'Produkter – Smart Film, LED Film og 3D Media Glass',
  description: META.produkter.description.da,
  openGraph: { images: [META.produkter.og] },
};

export default function ProdukterPage() {
  return <ProduktContent />;
}
