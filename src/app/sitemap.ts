import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

/** The one-pager and its privacy policy. The sections are anchors, not URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/privatlivspolitik`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
