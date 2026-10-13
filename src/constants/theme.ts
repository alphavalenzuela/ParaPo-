/**
 * ParaPo! Mobile App - Design System & Brand Tokens
 * Theme: Trust & Safety (Primary Blue, Emerald Green, Neutral Grays)
 */

export const colors = {
  // Brand Primary (Trust, Professionalism & Reliability)
  primary: '#1E40AF',       // Deep Royal Blue
  primaryLight: '#3B82F6',  // Vivid Sky Blue
  primaryDark: '#1E3A8A',   // Navy Shade
  primaryMuted: '#DBEAFE',  // Ice Blue Wash

  // Brand Secondary / Safety Accent (Safety, Verified, Active Status)
  secondary: '#059669',     // Emerald Green
  secondaryLight: '#10B981',// Mint Green
  secondaryDark: '#065F46', // Deep Forest Green
  secondaryMuted: '#D1FAE5',// Soft Mint Wash

  // Feedback & Alert Accents
  danger: '#DC2626',        // Emergency Red
  dangerLight: '#FEE2E2',   // Soft Red Wash
  warning: '#D97706',       // Amber Alert / Moderate Density
  warningLight: '#FEF3C7',  // Soft Amber Wash
  info: '#0284C7',          // Ocean Info Blue

  // Commuter Density Colors
  densityLow: '#10B981',     // Green - Magaan / Maraming Bakante
  densityModerate: '#F59E0B',// Amber - Sakto lang / May Uupuan Pa
  densityHeavy: '#EF4444',   // Red - Siksikan / Tayuan
  densityFull: '#991B1B',    // Dark Red - Punuan / Standby

  // Neutral Scales (Accessible high-contrast grays)
  background: '#F8FAFC',    // Cool Slate White
  surface: '#FFFFFF',       // Card White
  surfaceSubtle: '#F1F5F9', // Subtle card container
  border: '#E2E8F0',        // Clean border gray
  borderFocused: '#94A3B8',

  // Typography Grays
  textPrimary: '#0F172A',   // High-contrast slate black
  textSecondary: '#475569', // Muted subtitle gray
  textTertiary: '#94A3B8',  // Light placeholder gray
  textInverse: '#FFFFFF',   // White text for colored badges/buttons
};

export const typography = {
  h1: {
    fontSize: 26,
    fontWeight: '700' as const,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 26,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 21,
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 21,
  },
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },
  micro: {
    fontSize: 11,
    fontWeight: '600' as const,
    lineHeight: 14,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};
