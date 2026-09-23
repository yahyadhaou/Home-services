/**
 * Registers this device for Expo push notifications and hands the resulting
 * token to the backend (POST /users/me/push-token). Every step here fails
 * soft — a missing permission, a missing EAS project ID (app.json's
 * extra.eas.projectId — set up via `eas init`, not something this code can
 * do on its own), or a network error should never block login/app start,
 * they just mean this device won't receive pushes until fixed.
 *
 * Android + Expo Go is a hard "never even import" case, not just a soft
 * failure: expo-notifications' package entry re-exports
 * DevicePushTokenAutoRegistration.fx.ts, which calls addPushTokenListener()
 * unconditionally at module-evaluation time — and on Android in Expo Go that
 * throws synchronously (see warnOfExpoGoPushUsage in the package source),
 * crashing before any try/catch in this file even runs. A `require()` here
 * is used instead of a static top-level `import` specifically so that line
 * is never reached — and therefore the module is never evaluated — in that
 * environment. A custom dev-client build is unaffected: appOwnership is only
 * 'expo' for Expo Go itself, never for a dev client.
 */
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import api, { ApiError } from './api';

const isExpoGoAndroid = Platform.OS === 'android' && Constants.appOwnership === 'expo';

// eslint-disable-next-line global-require
const getNotifications = () => (isExpoGoAndroid ? null : require('expo-notifications'));

const getProjectId = () => Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;

const registerForPushNotifications = async () => {
  const Notifications = getNotifications();
  if (!Notifications) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.warn('[pushNotificationService] Skipping — Android push notifications are unsupported in Expo Go since SDK 53. Use a development build.');
    return;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') return;

    const projectId = getProjectId();
    if (!projectId) {
      // eslint-disable-next-line no-console
      if (__DEV__) console.warn('[pushNotificationService] No EAS project ID configured — run `eas init` to enable push notifications.');
      return;
    }

    const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });
    await api.post('/users/me/push-token', { token, platform: Platform.OS });
  } catch (err) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.warn('[pushNotificationService] Registration failed:', err instanceof ApiError ? err.message : err);
  }
};

const unregisterPushToken = async () => {
  const Notifications = getNotifications();
  if (!Notifications) return;
  try {
    const projectId = getProjectId();
    if (!projectId) return;
    const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });
    await api.delete('/users/me/push-token', { token });
  } catch (err) {
    // Best-effort — the token would also just expire/stop resolving to a
    // logged-in session on the backend even if this never lands.
  }
};

export default { registerForPushNotifications, unregisterPushToken };
