import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LocaleProvider } from '@/lib/locale-context';
import Home from './page';

describe('Home', () => {
  it('renders the hero pitch and all section headings', () => {
    render(
      <LocaleProvider>
        <Home />
      </LocaleProvider>,
    );
    expect(screen.getByText(/prototype ready/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /four roommates/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /five needs/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /pick your player/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();
  });
});
