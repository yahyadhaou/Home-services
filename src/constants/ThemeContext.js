import React, { createContext, useContext, useState, useMemo } from 'react';
import { getColors } from './colors';
import typography from './typography';
import { spacing, borderRadius, shadows } from './layout';

const ThemeContext = createContext();

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const colors = useMemo(() => getColors(isDarkMode ? 'dark' : 'light'), [isDarkMode]);

  // Shadows need to soften in dark mode — a black drop-shadow that reads as
  // "depth" on a white card is nearly invisible (or just looks like noise)
  // against a dark card, so dark mode uses lower-opacity, larger-blur shadows.
  const themedShadows = useMemo(() => {
    if (!isDarkMode) return shadows;
    const soften = (s) => ({ ...s, shadowOpacity: (s.shadowOpacity || 0) * 0.6, shadowColor: '#000000' });
    return {
      sm: soften(shadows.sm), md: soften(shadows.md), lg: soften(shadows.lg), xl: soften(shadows.xl),
    };
  }, [isDarkMode]);

  const value = {
    isDarkMode,
    toggleDarkMode: () => setIsDarkMode((p) => !p),
    setDarkMode: setIsDarkMode,
    colors,
    typography,
    spacing,
    borderRadius,
    shadows: themedShadows,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
