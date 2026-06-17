/**
 * Typography System — system fonts for zero-dependency reliability.
 * Swap to Space Grotesk / Inter later by adding files to assets/fonts/.
 */
export const typography = {
  fontFamily: { regular: 'System', medium: 'System', semiBold: 'System', bold: 'System' },
  fontSize:   { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 48 },
  fontWeight: { regular: '400', medium: '500', semiBold: '600', bold: '700' },
  lineHeight: { tight: 1.2, normal: 1.5, relaxed: 1.75 },
};

export default typography;
