import type { Metadata } from 'next';
import ProductPage from '@/components/product/ProductPage';

export const metadata: Metadata = {
  title: '3D Media Glass',
  description:
    'Immersiv 3D direkte i glasset. 160° synsvinkel, HD-billede med op til 85 % transparens og cloud-baseret indholdsstyring.',
  openGraph: { images: ['/assets/p3-poster.jpg'] },
};

export default function MediaGlassPage() {
  return <ProductPage slug="3d-media-glass" />;
}
