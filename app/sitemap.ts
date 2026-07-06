import type { MetadataRoute } from 'next';
import { defaultLocale, locales } from '@/lib/content';
import { siteUrl } from '@/lib/site';

const languageAlternates = Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}`]));

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: locale === defaultLocale ? 1 : 0.8,
    alternates: {
      languages: languageAlternates,
    },
  }));
}
