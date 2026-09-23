import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import AppNavigator from './src/navigation/AppNavigator';
import navigationRef from './src/navigation/navigationRef';
import bookingService from './src/services/bookingService';
import { AppProvider } from './src/context/AppContext';
import { LocationProvider } from './src/context/LocationContext';
import { LanguageProvider } from './src/i18n';
import { ThemeProvider, useTheme } from './src/constants/ThemeContext';

// Required so react-native-screens actually hides inactive screens (bottom
// tabs, stack cards) instead of leaving them mounted in normal document flow —
// without this, every tab's content renders stacked on top of each other.
enableScreens();

// expo-notifications must never even be `require()`'d on Android in Expo Go —
// its package entry re-exports a side-effect module that calls
// addPushTokenListener() at import time, which throws synchronously there
// (see pushNotificationService.js's file comment for the full explanation).
// A static top-level `import` would run that before this check could ever
// run, so the require is conditional and lazy instead.
const isExpoGoAndroid = Platform.OS === 'android' && Constants.appOwnership === 'expo';
// eslint-disable-next-line global-require
const Notifications = isExpoGoAndroid ? null : require('expo-notifications');

// Shows an alert/sound even while the app is in the foreground — without
// this, expo-notifications suppresses foreground notifications by default,
// which would make a push feel like it silently did nothing while testing.
if (Notifications) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: false,
    }),
  });
}

// Tapping a push (or an in-app foreground alert) with a bookingId opens that
// booking directly — fetches the current booking by id rather than trusting
// stale data baked into the notification payload itself.
const useNotificationTapNavigation = () => {
  useEffect(() => {
    if (!Notifications) return undefined;
    const subscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
      const bookingId = response.notification.request.content.data?.bookingId;
      if (!bookingId || !navigationRef.isReady()) return;
      const result = await bookingService.getBookingById(bookingId);
      if (result.success) navigationRef.navigate('BookingDetail', { booking: result.booking });
    });
    return () => subscription.remove();
  }, []);
};

// Reads the live theme so the system status bar text flips with dark mode —
// must live inside ThemeProvider, which is why it isn't just inlined in App().
const ThemedStatusBar = () => {
  const { isDarkMode } = useTheme();
  return <StatusBar style={isDarkMode ? 'light' : 'dark'} />;
};

export default function App() {
  useNotificationTapNavigation();

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <ThemeProvider>
          <AppProvider>
            <LocationProvider>
              <ThemedStatusBar />
              <AppNavigator />
            </LocationProvider>
          </AppProvider>
        </ThemeProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
