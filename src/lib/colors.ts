/**
 * RentSafe AI — Design Token Colors
 *
 * Single source of truth untuk semua warna di aplikasi.
 * Semua komponen HARUS menggunakan token dari file ini,
 * BUKAN hardcoded hex/rgb values.
 *
 * Color Philosophy:
 * - Primary (Teal/Emerald): Trust, safety, growth — core identity
 * - Secondary (Deep Navy): Professionalism, authority — headings, dark sections
 * - Accent (Amber/Gold): Premium feel, CTA highlights
 * - Semantic colors: Success, Warning, Error, Info
 *
 * Usage:
 * - Di Tailwind: gunakan `bg-primary`, `text-secondary`, `border-accent`, dll.
 * - Di JS/TS: import dari file ini untuk dynamic styling.
 */

// ---------------------------------------------------------------------------
// Brand Colors
// ---------------------------------------------------------------------------

export const colors = {
  primary: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#1A9E75', // Main primary — teal
    600: '#15835F',
    700: '#10684A',
    800: '#0B4D36',
    900: '#073323',
    950: '#041F15',
  },

  secondary: {
    50: '#EEF0F6',
    100: '#D5DAE8',
    200: '#ABB5D1',
    300: '#8190BA',
    400: '#576BA3',
    500: '#3D5289',
    600: '#2E3F6B',
    700: '#1F2D4E',
    800: '#17213D', // Main secondary — deep navy
    900: '#0F162A',
    950: '#080C17',
  },

  accent: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Main accent — amber gold
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
    950: '#451A03',
  },

  // ---------------------------------------------------------------------------
  // Semantic Colors
  // ---------------------------------------------------------------------------

  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E', // Main success
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
    500: '#F59E0B', // Main warning
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
    500: '#F43F5E', // Main error — rose
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
    500: '#3B82F6', // Main info — blue
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // ---------------------------------------------------------------------------
  // Neutral / Gray
  // ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Semantic Theme Tokens (Light Mode)
// ---------------------------------------------------------------------------

export const lightTheme = {
  background: colors.neutral[50],
  surface: '#FFFFFF',
  surfaceHover: colors.neutral[100],
  foreground: colors.secondary[800],
  foregroundMuted: colors.neutral[500],
  border: colors.neutral[200],
  borderHover: colors.neutral[300],
  ring: colors.primary[500],
} as const;

// ---------------------------------------------------------------------------
// Semantic Theme Tokens (Dark Mode)
// ---------------------------------------------------------------------------

export const darkTheme = {
  background: '#0B1121', // Very dark navy
  surface: colors.secondary[800],
  surfaceHover: colors.secondary[700],
  foreground: colors.neutral[100],
  foregroundMuted: colors.neutral[400],
  border: colors.secondary[700],
  borderHover: colors.secondary[600],
  ring: colors.primary[400],
} as const;

// ---------------------------------------------------------------------------
// Gradient Presets
// ---------------------------------------------------------------------------

export const gradients = {
  /** Hero background — subtle teal to white */
  hero: 'linear-gradient(to bottom, #ECFDF5, #FFFFFF)',
  /** Hero background dark — navy gradient */
  heroDark: 'linear-gradient(to bottom, #0B1121, #17213D)',
  /** Primary CTA gradient */
  primaryCta: 'linear-gradient(135deg, #1A9E75, #15835F)',
  /** Accent highlight gradient */
  accentGlow: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
  /** Stats section dark gradient */
  statsDark: 'linear-gradient(135deg, #17213D, #0F162A)',
} as const;

// ---------------------------------------------------------------------------
// Type Exports
// ---------------------------------------------------------------------------

export type ColorScale = typeof colors.primary;
export type ThemeTokens = typeof lightTheme;
