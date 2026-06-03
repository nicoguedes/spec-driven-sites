import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@sites/ui/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
