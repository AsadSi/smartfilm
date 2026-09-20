import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

/** One page, so one entry. The sections are anchors, not URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
