export const Palette = {
  darkBrown: '#4B3F38',
  terracotta: '#C88168',
  beige: '#E6D5B8',
  offWhite: '#F5F2F0',
  mediumGrey: '#8E8E8E',
  lightGrey: '#B1B1B1',
  black: '#1A1A1A',
  white: '#FFFFFF',
  charcoal: '#2D2926',
} as const;

export const theme = {
  background: Palette.offWhite,
  surface: Palette.white,
  headerPill: Palette.beige,
  text: Palette.charcoal,
  textSecondary: Palette.mediumGrey,
  border: Palette.lightGrey,
  switchTrackOff: Palette.lightGrey,
  switchTrackOn: Palette.terracotta,
  modalBg: Palette.white,
  overlay: 'rgba(26,26,26,0.45)',
} as const;

export type AppTheme = typeof theme;
