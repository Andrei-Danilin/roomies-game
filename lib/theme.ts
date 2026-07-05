// Design tokens shared across components/sections/* — see DESIGN.md's "Design Tokens" section
// for the source values. Centralized here so a brand color/font change doesn't require editing
// all 13 section files individually (previously duplicated as literal strings in each one).

export const fontDisplay = 'Fredoka, sans-serif';
export const fontBody = 'Nunito, sans-serif';

export const colors = {
  background: '#FFF8EF',
  text: '#2A2440',
  textSecondary: '#5B5470',
  textSecondaryAlt: '#6B6480',
  textMuted: '#A59CB3',
  textMutedAlt: '#8A8199',
  border: '#F0E6D8',
  cardFill: '#FFFBF5',
  brandOrange: '#FF7A1A',
  brandOrangeShadow: '#D9610C',
  brandPink: '#FF4FA3',
  brandYellow: '#FFC83D',
  brandYellowShadow: '#C99A1C',
  blue: '#34B3F1',
  teal: '#2BC4B6',
  green: '#8BC34A',
} as const;
