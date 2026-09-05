import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/content/products';
import { SITE } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['', '/produkter', '/kontakt', '/privatlivspolitik'];

  return [
    ...routes.map((route) => ({
      url: `${SITE.url}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${SITE.url}/${product.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ];
}
