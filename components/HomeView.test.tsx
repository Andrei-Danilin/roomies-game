import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Content } from '@/lib/content';
import content from '@/content/en.json';
import HomeView from './HomeView';

describe('HomeView', () => {
  it('renders the hero pitch and all section headings', () => {
    render(<HomeView content={content as Content} locale="en" />);
    expect(screen.getByText(/prototype ready/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /four roommates/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /five needs/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /pick your player/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();
  });
});
