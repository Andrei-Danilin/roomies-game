import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import { assertLocale, getContent, isLocale, locales } from '@/lib/content';
import { siteUrl, siteTitle } from '@/lib/site';
import '../globals.css';

const fredoka = Fredoka({
  variable: '--font-fredoka',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const nunito = Nunito({
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// The locale set is fixed and small — treat any other segment as a build-time-known
// 404 rather than an on-demand render attempt.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return { title: siteTitle };
  }
  const url = `${siteUrl}/${locale}`;
  const description = getContent(locale).hero.pitch;

  return {
    metadataBase: new URL(siteUrl),
    title: siteTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}`])),
        'x-default': `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: siteTitle,
      description,
      url,
      siteName: siteTitle,
      images: [{ url: '/assets/board.jpg', width: 1280, height: 960, alt: siteTitle }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description,
      images: ['/assets/board.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  assertLocale(locale);

  return (
    <html lang={locale} className={`${fredoka.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
