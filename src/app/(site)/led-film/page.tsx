import type { Metadata } from 'next';
import ProductPage from '@/components/product/ProductPage';

export const metadata: Metadata = {
  title: 'LED Film',
  description:
    'Transparent LED-film på ca. 2 mm med op til 99 % visuel transparens. Forvandler vinduer og glasfacader til levende medieflader.',
  openGraph: { images: ['/assets/p2-poster.jpg'] },
};

export default function LedFilmPage() {
  return <ProductPage slug="led-film" />;
}
