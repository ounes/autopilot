/**
 * Design System — Immat Scanner Plus
 * Basé sur iOS Human Interface Guidelines + Material Design 3
 * Optimisé pour React Native / Expo SDK 54
 */

export const colors = {
  // Primaires (bleu automobile moderne)
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',    // Primary main
    600: '#2563EB',    // Primary dark
    700: '#1D4ED8',    // Primary darker
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Neutrals (échelle contrastée WCAG AA)
  gray: {
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
  },

  // Status
  success: {
    light: '#D1FAE5',
    main: '#10B981',
    dark: '#059669',
  },
  warning: {
    light: '#FEF3C7',
    main: '#F59E0B',
    dark: '#D97706',
  },
  error: {
    light: '#FEE2E2',
    main: '#EF4444',
    dark: '#DC2626',
  },
  info: {
    light: '#DBEAFE',
    main: '#3B82F6',
    dark: '#2563EB',
  },

  // Backgrounds
  background: {
    primary: '#FFFFFF',
    secondary: '#F8FAFC',
    tertiary: '#F1F5F9',
    dark: '#0F172A',
    darkOverlay: 'rgba(15, 23, 42, 0.85)',
  },

  // Text
  text: {
    primary: '#0F172A',
    secondary: '#334155',
    tertiary: '#64748B',
    disabled: '#94A3B8',
    inverse: '#FFFFFF',
  },

  // Borders
  border: {
    light: '#F1F5F9',
    main: '#E2E8F0',
    dark: '#CBD5E1',
  },
};

export const typography = {
  // Font families
  fontFamily: {
    system: 'System',
    ios: 'SF Pro',
    android: 'Roboto',
  },

  // Font sizes (mobile-first)
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },

  // Font weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },

  // Line heights (multipliers)
  lineHeight: {
    tight: 1.2,
    snug: 1.4,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Text styles (predéfinis)
  styles: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 1.2,
      color: colors.text.primary,
    },
    h2: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 1.3,
      color: colors.text.primary,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 1.4,
      color: colors.text.primary,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 1.4,
      color: colors.text.primary,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 1.6,
      color: colors.text.primary,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
      color: colors.text.primary,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 1.5,
      color: colors.text.secondary,
    },
    caption: {
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 1.4,
      color: colors.text.tertiary,
    },
    label: {
      fontSize: 15,
      fontWeight: '600',
      lineHeight: 1.4,
      color: colors.text.secondary,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 1.4,
    },
  },
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
};

export const borderRadius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  full: 9999,
};

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const components = {
  // Button
  button: {
    primary: {
      backgroundColor: colors.primary[600],
      color: colors.text.inverse,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: borderRadius.md,
      minHeight: 48,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
    },
    secondary: {
      backgroundColor: colors.primary[50],
      color: colors.primary[700],
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: borderRadius.md,
      minHeight: 48,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary[600],
      color: colors.primary[700],
      paddingVertical: 12,
      paddingHorizontal: 22,
      borderRadius: borderRadius.md,
      minHeight: 48,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.primary[700],
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: borderRadius.md,
      minHeight: 48,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      minHeight: 56,
      fontSize: typography.fontSize.lg,
    },
    small: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      minHeight: 40,
      fontSize: typography.fontSize.sm,
    },
  },

  // Input
  input: {
    base: {
      backgroundColor: colors.background.tertiary,
      color: colors.text.primary,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: borderRadius.md,
      minHeight: 48,
      fontSize: typography.fontSize.base,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    focused: {
      borderColor: colors.primary[600],
      backgroundColor: colors.background.primary,
    },
    error: {
      borderColor: colors.error.main,
    },
    disabled: {
      backgroundColor: colors.gray[100],
      color: colors.text.disabled,
    },
  },

  // Card
  card: {
    base: {
      backgroundColor: colors.background.primary,
      borderRadius: borderRadius.lg,
      padding: spacing[5],
      ...shadows.md,
    },
    large: {
      padding: spacing[6],
      borderRadius: borderRadius.xl,
    },
    compact: {
      padding: spacing[4],
      borderRadius: borderRadius.md,
    },
  },

  // Icon sizes
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },

  // Touch targets (WCAG compliance)
  touchTarget: {
    minWidth: 44,
    minHeight: 44,
  },

  // Header
  header: {
    height: 64,
    paddingHorizontal: spacing[5],
    backgroundColor: colors.background.dark,
  },

  // Bottom navigation
  bottomNav: {
    height: 64,
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.main,
  },

  // Modal
  modal: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingTop: spacing[5],
    paddingBottom: spacing[6],
    paddingHorizontal: spacing[5],
    maxHeight: '80%',
  },
};

export const animations = {
  fast: 150,
  normal: 250,
  slow: 350,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
  animations,
};
