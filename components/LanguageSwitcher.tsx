'use client';

import Link from 'next/link';
import { langs, type Locale } from '@/lib/content';
import { fontDisplay } from '@/lib/theme';

const PREFERRED_LOCALE_COOKIE = 'NEXT_LOCALE';

function rememberLocale(locale: Locale) {
  document.cookie = `${PREFERRED_LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <div style={{ display: 'flex', gap: 2, background: '#F4ECDF', borderRadius: 10, padding: 3 }}>
      {langs.map((lng) => {
        const active = lng.id === locale;
        return (
          <Link
            key={lng.id}
            href={`/${lng.id}`}
            onClick={() => rememberLocale(lng.id)}
            aria-current={active ? 'page' : undefined}
            style={{
              fontFamily: fontDisplay,
              fontWeight: 600,
              fontSize: 13,
              textDecoration: 'none',
              cursor: 'pointer',
              padding: '6px 11px',
              borderRadius: 8,
              background: active ? '#2A2440' : 'transparent',
              color: active ? '#fff' : '#8A8199',
            }}
          >
            {lng.label}
          </Link>
        );
      })}
    </div>
  );
}
