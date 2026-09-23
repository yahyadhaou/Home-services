/**
 * Session token persistence. expo-secure-store wraps the iOS Keychain /
 * Android Keystore — meaningfully more secure than AsyncStorage (which is
 * plain unencrypted storage) for anything as sensitive as an auth token.
 *
 * The refresh token is stored here explicitly rather than relied on as an
 * httpOnly cookie: React Native has no browser-grade cookie jar guaranteed
 * to persist across requests and app restarts, so the backend also returns
 * it in the response body specifically for clients like this one — see
 * homeservice-backend's auth.controller.js.
 */
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'homeservice_access_token';
const REFRESH_TOKEN_KEY = 'homeservice_refresh_token';

// expo-secure-store wraps the iOS Keychain / Android Keystore, which don't
// exist on web — Platform.OS === 'web' falls back to localStorage there.
// Not a security downgrade in practice: a browser has no Keychain-equivalent
// to wrap in the first place, and this app has no web deployment target of
// its own (Expo's web build exists only for local preview/testing).
const store = Platform.OS === 'web'
  ? {
    getItemAsync: async (key) => window.localStorage.getItem(key),
    setItemAsync: async (key, value) => window.localStorage.setItem(key, value),
    deleteItemAsync: async (key) => window.localStorage.removeItem(key),
  }
  : SecureStore;

const getAccessToken = () => store.getItemAsync(ACCESS_TOKEN_KEY);
const getRefreshToken = () => store.getItemAsync(REFRESH_TOKEN_KEY);

const setTokens = async ({ accessToken, refreshToken }) => {
  const writes = [store.setItemAsync(ACCESS_TOKEN_KEY, accessToken)];
  if (refreshToken) writes.push(store.setItemAsync(REFRESH_TOKEN_KEY, refreshToken));
  await Promise.all(writes);
};

const clear = () => Promise.all([
  store.deleteItemAsync(ACCESS_TOKEN_KEY),
  store.deleteItemAsync(REFRESH_TOKEN_KEY),
]);

export default {
  getAccessToken, getRefreshToken, setTokens, clear,
};
