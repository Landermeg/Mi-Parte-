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
  bookBeige: '#E8D3B9',
} as const;

export type ThemeMode = 'light' | 'dark';

export function getTheme(isDark: boolean) {
  if (isDark) {
    return {
      background: Palette.black,
      surface: Palette.darkBrown,
      headerPill: '#5C4F47',
      text: Palette.white,
      textSecondary: Palette.lightGrey,
      border: Palette.mediumGrey,
      switchTrackOff: Palette.mediumGrey,
      switchTrackOn: Palette.terracotta,
      modalBg: Palette.darkBrown,
      overlay: 'rgba(0,0,0,0.65)',
      statusBar: 'light' as const,
    };
  }

  return {
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
    statusBar: 'dark' as const,
  };
}

export type AppTheme = ReturnType<typeof getTheme>;
