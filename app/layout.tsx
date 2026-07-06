import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import { LocaleProvider } from '@/lib/locale-context';
import { siteUrl, siteTitle } from '@/lib/site';
import './globals.css';

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

const title = siteTitle;
const description =
  'A light-to-medium strategy board game for 2–4 players about the gloriously chaotic experience of sharing an apartment. Manage your 5 basic needs, compete for shared rooms, and outsmart your roommates.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    images: [{ url: '/assets/board.jpg', width: 1280, height: 960, alt: title }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/assets/board.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // <html lang> stays 'en': it's rendered server-side before the persisted locale
  // (client-only, via localStorage) is known — see lib/locale-context.tsx.
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
