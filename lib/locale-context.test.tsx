import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { LocaleProvider, useLocale } from './locale-context';

function LocaleProbe() {
  const { locale, setLocale } = useLocale();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <button onClick={() => setLocale('es')}>es</button>
    </div>
  );
}

describe('LocaleProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('defaults to English with no stored preference', () => {
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('restores a persisted locale on mount', async () => {
    window.localStorage.setItem('roomies_lang', 'ru');
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(await screen.findByTestId('locale')).toHaveTextContent('ru');
  });

  it('updates and persists the locale when changed', async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'es' }));
    expect(screen.getByTestId('locale')).toHaveTextContent('es');
    expect(window.localStorage.getItem('roomies_lang')).toBe('es');
  });

  it('ignores an invalid stored locale and falls back to the default', () => {
    window.localStorage.setItem('roomies_lang', 'fr');
    render(
      <LocaleProvider>
        <LocaleProbe />
      </LocaleProvider>,
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });
});
