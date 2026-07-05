'use client';

import { langs } from '@/lib/content';
import { useLocale } from '@/lib/locale-context';
import { fontDisplay } from '@/lib/theme';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div style={{ display: 'flex', gap: 2, background: '#F4ECDF', borderRadius: 10, padding: 3 }}>
      {langs.map((lng) => {
        const active = lng.id === locale;
        return (
          <button
            key={lng.id}
            type="button"
            onClick={() => setLocale(lng.id)}
            aria-pressed={active}
            style={{
              fontFamily: fontDisplay,
              fontWeight: 600,
              fontSize: 13,
              border: 'none',
              cursor: 'pointer',
              padding: '6px 11px',
              borderRadius: 8,
              background: active ? '#2A2440' : 'transparent',
              color: active ? '#fff' : '#8A8199',
            }}
          >
            {lng.label}
          </button>
        );
      })}
    </div>
  );
}
