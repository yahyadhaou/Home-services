import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';
import { LanguageProvider } from './src/i18n';
import { ThemeProvider, useTheme } from './src/constants/ThemeContext';

// Required so react-native-screens actually hides inactive screens (bottom
// tabs, stack cards) instead of leaving them mounted in normal document flow —
// without this, every tab's content renders stacked on top of each other.
enableScreens();

// Reads the live theme so the system status bar text flips with dark mode —
// must live inside ThemeProvider, which is why it isn't just inlined in App().
const ThemedStatusBar = () => {
  const { isDarkMode } = useTheme();
  return <StatusBar style={isDarkMode ? 'light' : 'dark'} />;
};

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <ThemeProvider>
          <AppProvider>
            <ThemedStatusBar />
            <AppNavigator />
          </AppProvider>
        </ThemeProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
