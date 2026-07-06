import { notFound } from 'next/navigation';
import en from '@/content/en.json';
import es from '@/content/es.json';
import ru from '@/content/ru.json';

export const locales = ['en', 'es', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const langs: { id: Locale; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'es', label: 'ES' },
  { id: 'ru', label: 'RU' },
];

export interface NeedMeta {
  key: 'sleep' | 'food' | 'hygiene' | 'fun' | 'social';
  icon: string;
  color: string;
}

export interface CharMeta {
  key: 'max' | 'lena' | 'igor' | 'anya';
  color: string;
}

// Brand colors/icons per need + character — shared across languages, code-owned per ADR-005.
export const needsMeta: NeedMeta[] = [
  { key: 'sleep', icon: '💤', color: '#34B3F1' },
  { key: 'food', icon: '🍔', color: '#FF8A3D' },
  { key: 'hygiene', icon: '🛁', color: '#2BC4B6' },
  { key: 'fun', icon: '🎉', color: '#FFC83D' },
  { key: 'social', icon: '💬', color: '#FF4FA3' },
];

export const charsMeta: CharMeta[] = [
  { key: 'max', color: '#FF5A3D' },
  { key: 'lena', color: '#9B6BFF' },
  { key: 'igor', color: '#2B9BD8' },
  { key: 'anya', color: '#FFB020' },
];

interface HowToStep {
  n: string;
  title: string;
  desc: string;
}

interface FaqItem {
  q: string;
  a: string;
}

export interface Content {
  nav: {
    about: string;
    chars: string;
    howto: string;
    gallery: string;
    media: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    tagline: string;
    pitch: string;
    players: string;
    age: string;
    learn: string;
    cta1: string;
    cta2: string;
  };
  status: {
    kicker: string;
    title: string;
    body: string;
    cta: string;
  };
  about: {
    kicker: string;
    title: string;
    body1: string;
    body2: string;
    quote: string;
  };
  needs: {
    kicker: string;
    title: string;
    intro: string;
    items: Record<NeedMeta['key'], { name: string; desc: string }>;
  };
  chars: {
    kicker: string;
    title: string;
    intro: string;
    items: Record<CharMeta['key'], { name: string; role: string; desc: string }>;
    note: string;
  };
  howto: {
    kicker: string;
    title: string;
    steps: HowToStep[];
    facts: string[];
    rulesPdf: string;
  };
  gallery: {
    kicker: string;
    title: string;
    intro: string;
    drop: string;
  };
  media: {
    kicker: string;
    title: string;
    tiktokTitle: string;
    tiktokDesc: string;
    tiktokCta: string;
    ytTitle: string;
    ytDesc: string;
    ytCta: string;
  };
  notify: {
    kicker: string;
    title: string;
    body: string;
    placeholder: string;
    button: string;
    success: string;
    error: string;
    privacy: string;
  };
  contact: {
    kicker: string;
    title: string;
    body: string;
    emailLabel: string;
    locationLabel: string;
    location: string;
    socialLabel: string;
  };
  faq: {
    kicker: string;
    title: string;
    items: FaqItem[];
  };
  footer: {
    tagline: string;
    rights: string;
    made: string;
  };
}

const contentByLocale: Record<Locale, Content> = { en, es, ru };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Shared by app/[locale]/layout.tsx and app/[locale]/page.tsx so the route-param
// validation can't drift out of sync between the two.
export function assertLocale(value: string): asserts value is Locale {
  if (!isLocale(value)) {
    notFound();
  }
}

export function getContent(locale: string): Content {
  return contentByLocale[isLocale(locale) ? locale : defaultLocale];
}
