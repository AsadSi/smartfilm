import type { Metadata } from 'next';
import ProductPage from '@/components/product/ProductPage';

export const metadata: Metadata = {
  title: 'Smart Film',
  description:
    'PDLC smart film: fra mat til krystalklart på et splitsekund. Op til 92 % transparens, projektionsklar, styres via kontakt, fjernbetjening eller app.',
  openGraph: { images: ['/assets/p1-poster.jpg'] },
};

export default function SmartFilmPage() {
  return <ProductPage slug="smart-film" />;
}
