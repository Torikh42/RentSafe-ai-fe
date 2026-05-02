/**
 * RentSafe AI — Design Token Colors
 *
 * Single source of truth untuk semua warna di aplikasi.
 * Color Philosophy:
 * - Primary (Deep Navy): Trust, authority, security (Core Brand)
 * - Accent (Warm Amber/Gold): Premium feel, CTA highlights
 * - Secondary (Slate/Grayish Blue): Professionalism
 */

export const colors = {
  primary: {
    50: '#F0F4F8',
    100: '#D9E2EC',
    200: '#BCCCDC',
    300: '#9FB3C8',
    400: '#829AB1',
    500: '#627D98',
    600: '#486581',
    700: '#334E68',
    800: '#243B53',
    900: '#102A43', // Core Navy
    950: '#0B1C2D',
  },

  secondary: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },

  accent: {
    50: '#FFF8EB',
    100: '#FFECD1',
    200: '#FDD6A3',
    300: '#FBBB70',
    400: '#F99C3D',
    500: '#F57F17', // Core Gold/Orange
    600: '#E36A0F',
    700: '#BD520F',
    800: '#974112',
    900: '#7B3612',
    950: '#421805',
  },

  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  error: {
    50: '#FFF1F2',
    100: '#FFE4E6',
    200: '#FECDD3',
    300: '#FDA4AF',
    400: '#FB7185',
    500: '#F43F5E',
    600: '#E11D48',
    700: '#BE123C',
    800: '#9F1239',
    900: '#881337',
  },

  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
} as const;

export const lightTheme = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceHover: '#F0F4F8',
  foreground: '#102A43',
  foregroundMuted: '#627D98',
  border: colors.neutral[200],
  borderHover: colors.neutral[300],
  ring: colors.accent[500],
} as const;

export const darkTheme = {
  background: '#091321',
  surface: '#102A43',
  surfaceHover: '#243B53',
  foreground: '#F0F4F8',
  foregroundMuted: '#9FB3C8',
  border: 'rgba(255, 255, 255, 0.1)',
  borderHover: 'rgba(255, 255, 255, 0.2)',
  ring: colors.accent[500],
} as const;

export const gradients = {
  hero: 'linear-gradient(to bottom, #F0F4F8, #FFFFFF)',
  heroDark: 'linear-gradient(to bottom, #091321, #102A43)',
  primaryCta: 'linear-gradient(135deg, #102A43, #243B53)',
  accentGlow: 'linear-gradient(135deg, #F57F17, #F99C3D)',
  statsDark: 'linear-gradient(135deg, #102A43, #091321)',
} as const;

export type ColorScale = typeof colors.primary;
export type ThemeTokens = typeof lightTheme;
