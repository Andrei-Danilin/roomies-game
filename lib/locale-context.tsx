'use client';

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import { defaultLocale, getContent, isLocale, type Content, type Locale } from './content';

const STORAGE_KEY = 'roomies_lang';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved && isLocale(saved) ? saved : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

// Hydrates the persisted locale via useSyncExternalStore rather than an effect + setState:
// server/first-paint snapshot is always 'en' (matches SSR output, no mismatch), and React
// swaps in the real localStorage value right after hydration completes.
function createLocaleStore() {
  let locale: Locale = defaultLocale;
  let hydrated = false;
  const listeners = new Set<() => void>();

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot(): Locale {
      if (!hydrated) {
        locale = readStoredLocale();
        hydrated = true;
      }
      return locale;
    },
    getServerSnapshot(): Locale {
      return defaultLocale;
    },
    setLocale(next: Locale) {
      locale = next;
      hydrated = true;
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // localStorage unavailable (private mode, disabled storage) — locale still updates for this session.
      }
      listeners.forEach((listener) => listener());
    },
  };
}

// Sensible default on first visit (no stored preference): 'en', matching the design spec.
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createLocaleStore());

  const locale = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  // Syncs the <html lang> attribute (set server-side to 'en' in app/layout.tsx) with the
  // client-only persisted locale — a DOM attribute outside React's render tree, so this is
  // a legitimate effect rather than the setState-in-effect pattern used elsewhere in this file.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale: store.setLocale }),
    [locale, store],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}

export function useContent(): Content {
  const { locale } = useLocale();
  return getContent(locale);
}
