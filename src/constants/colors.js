/**
 * Color Palette
 * Deep navy + warm amber, inspired by German engineering precision
 */
export const colors = {
  primary:   { main: '#0A0E27', light: '#1A1F3A', dark: '#050711' },
  accent:    { main: '#FF9500', light: '#FFB340', dark: '#E68600' },
  secondary: { main: '#7BA899', light: '#A5C9B8', dark: '#5A8577' },

  white: '#FFFFFF',
  black: '#000000',

  background: { default: '#F8F9FA', paper: '#FFFFFF', dark: '#F0F2F5' },

  gray: {
    50: '#FAFBFC', 100: '#F0F2F5', 200: '#E4E6EB', 300: '#CED0D4',
    400: '#B0B3B8', 500: '#8A8D91', 600: '#65676B', 700: '#4E5056',
    800: '#3A3B40', 900: '#242526',
  },

  status: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' },

  services: {
    plumbing: '#2563EB', electrical: '#F59E0B', cleaning: '#10B981',
    hvac: '#8B5CF6', carpentry: '#D97706', painting: '#EC4899',
    gardening: '#14B8A6', moving: '#EF4444',
  },
};

export default colors;
