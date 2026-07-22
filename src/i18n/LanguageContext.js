import React, { createContext, useContext, useState, useCallback } from 'react';
import en from './en';
import fr from './fr';
import de from './de';

const LANGUAGES = { en, fr, de };

export const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French',  native: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'German',  native: 'Deutsch',  flag: '🇩🇪' },
];

const LanguageContext = createContext();

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
};

/**
 * Resolves a dotted key path like "login.emailRequired" against the active
 * language dictionary. Falls back to English, then to the key itself,
 * so a missing translation never crashes a screen.
 */
const resolve = (dict, path) => {
  const parts = path.split('.');
  let node = dict;
  for (const p of parts) {
    if (node == null) return undefined;
    node = node[p];
  }
  return node;
};

export const LanguageProvider = ({ children }) => {
  // null = not yet chosen -> triggers the language picker on first launch.
  // Once set, navigation never routes back to the picker for this session.
  const [language, setLanguageState] = useState(null);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);

  const setLanguage = useCallback((code) => {
    if (!LANGUAGES[code]) return;
    setLanguageState(code);
    setHasChosenLanguage(true);
  }, []);

  const t = useCallback(
    (path, vars) => {
      const dict = LANGUAGES[language] || LANGUAGES.en;
      let value = resolve(dict, path);
      if (value === undefined) value = resolve(LANGUAGES.en, path);
      if (value === undefined) return path;
      if (typeof value === 'string' && vars) {
        return Object.keys(vars).reduce((acc, k) => acc.replace(`{{${k}}}`, vars[k]), value);
      }
      return value;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language: language || 'en', setLanguage, hasChosenLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
