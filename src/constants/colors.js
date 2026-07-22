/**
 * Color Palette — vibrant, gradient-rich refresh with full light/dark support.
 *
 * Brand, accent, status, service and gradient colors are intentionally
 * constant across modes (a vibrant gradient should look the same whether
 * the phone is in light or dark mode). What changes between modes are the
 * *surface* tokens — backgrounds, grays, white/black — which is what makes
 * text readable and surfaces look correct against a dark canvas.
 *
 * getColors(mode) returns a fully-resolved palette for 'light' or 'dark'.
 * Screens should read colors via useTheme() (see ThemeContext.js) rather
 * than importing this module's default export directly, so they react to
 * the active mode instead of being frozen at light-mode values.
 */

const BRAND = {
  primary:   { main: '#0A0E27', light: '#1A1F3A', dark: '#050711' },
  accent:    { main: '#FF9500', light: '#FFB340', dark: '#E68600' },
  secondary: { main: '#7BA899', light: '#A5C9B8', dark: '#5A8577' },
  status: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' },
  services: {
    plumbing: '#2563EB', electrical: '#F59E0B', cleaning: '#10B981',
    hvac: '#8B5CF6', carpentry: '#D97706', painting: '#EC4899',
    gardening: '#14B8A6', moving: '#EF4444',
  },
  gradients: {
    sunset:     ['#FF9500', '#FF5F6D', '#6A11CB'],
    candy:      ['#FF5F6D', '#FFC371'],
    ocean:      ['#2193B0', '#6DD5ED'],
    violet:     ['#7F00FF', '#E100FF'],
    flame:      ['#F2994A', '#F2C94C'],
    emergency:  ['#EB3349', '#F45C43'],
    midnight:   ['#0A0E27', '#3A1C71'],
    aurora:     ['#00C9FF', '#92FE9D'],
    plumbing:   ['#2563EB', '#6DD5ED'],
    electrical: ['#F2994A', '#F2C94C'],
    cleaning:   ['#11998E', '#38EF7D'],
    hvac:       ['#7F00FF', '#E100FF'],
    carpentry:  ['#D97706', '#FBBF24'],
    painting:   ['#EC4899', '#F472B6'],
    gardening:  ['#0BA360', '#3CBA92'],
    moving:     ['#EB3349', '#F45C43'],
  },
};

const LIGHT_SURFACES = {
  white: '#FFFFFF',
  black: '#000000',
  background: { default: '#F8F9FC', paper: '#FFFFFF', dark: '#F0F2F5' },
  gray: {
    50: '#FAFBFC', 100: '#F0F2F5', 200: '#E4E6EB', 300: '#CED0D4',
    400: '#B0B3B8', 500: '#8A8D91', 600: '#65676B', 700: '#4E5056',
    800: '#3A3B40', 900: '#242526',
  },
  card: '#FFFFFF',
  border: '#E4E6EB',
  isDark: false,
};

const DARK_SURFACES = {
  white: '#1C1F2E',     // "white" surfaces (cards, inputs) become dark slate
  black: '#FFFFFF',     // inverted: used where pure contrast against white-surfaces is needed
  background: { default: '#0D0F1A', paper: '#161927', dark: '#05060B' },
  // Gray scale is reversed in perceptual order: 50 stays "near-background", 900 stays "near-text",
  // so existing usages like colors.gray[900] for primary text and colors.gray[500] for secondary
  // text continue to mean the same *role* in dark mode without every screen needing edits.
  gray: {
    50: '#12141F', 100: '#181B29', 200: '#232636', 300: '#33384A',
    400: '#4B5066', 500: '#717689', 600: '#9BA0B0', 700: '#C2C6D2',
    800: '#E2E4EA', 900: '#F5F6F8',
  },
  card: '#161927',
  border: '#232636',
  isDark: true,
};

// Dispatch-board tokens — used by the redesigned Home/Emergency/booking screens.
// Dark = "blueprint" (ink-navy canvas, cyan schematic linework).
// Light = "whiteprint" (drafting-paper canvas, ink-blue linework) — a real
// cyanotype/diazo-print duality, not an inverted afterthought. `danger` is
// reserved for the Emergency screen only so it stays meaningfully urgent.
const DISPATCH_DARK = {
  canvas: '#0E2233', panel: '#142E42', line: '#6FE3FF', lineSoft: 'rgba(111,227,255,0.22)',
  grid: 'rgba(111,227,255,0.07)', text: '#EAF6FB', textSoft: '#7FA0B3',
  amber: '#FFB020', green: '#4ADE80', danger: '#FF5A4E', dangerSoft: 'rgba(255,90,78,0.16)',
  tabBg: '#0B1D2C',
};

const DISPATCH_LIGHT = {
  canvas: '#EDF2F6', panel: '#FFFFFF', line: '#1D4E73', lineSoft: 'rgba(29,78,115,0.22)',
  grid: 'rgba(29,78,115,0.08)', text: '#132635', textSoft: '#4C6B80',
  amber: '#9A5F0A', green: '#1F7A4D', danger: '#C43D2F', dangerSoft: 'rgba(196,61,47,0.1)',
  tabBg: '#FFFFFF',
};

export const getColors = (mode = 'light') => {
  const surfaces = mode === 'dark' ? DARK_SURFACES : LIGHT_SURFACES;
  const dispatch = mode === 'dark' ? DISPATCH_DARK : DISPATCH_LIGHT;
  return { ...BRAND, ...surfaces, dispatch };
};

// Default export kept for any non-screen utility that just needs brand
// constants (gradients, service colors) and doesn't need mode-awareness.
export const colors = getColors('light');
export default colors;
