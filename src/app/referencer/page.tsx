import type { Metadata } from 'next';
import ReferencerContent from './ReferencerContent';
import { META } from '@/content/pages';

export const metadata: Metadata = {
  title: 'Referencer',
  description: META.referencer.description.da,
  openGraph: { images: [META.referencer.og] },
};

export default function ReferencerPage() {
  return <ReferencerContent />;
}
