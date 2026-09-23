/**
 * Real auth calls against homeservice-backend's /auth and /users routes.
 * Every function here resolves `{ success: true, ... }` or
 * `{ success: false, error }` — never throws — so screens (LoginScreen,
 * RegisterScreen) can keep their existing "if (result.success)" shape.
 */
import api, { ApiError } from './api';
import tokenStorage from './tokenStorage';

/**
 * The registration form only collects a single "name" field; the backend
 * wants firstName/lastName separately. A single-word name (no space)
 * repeats as both — the backend requires a non-empty lastName, and
 * "Cher" → { firstName: 'Cher', lastName: 'Cher' } is a reasonable
 * fallback for a field the UI never actually asked the user to split.
 */
const splitName = (fullName) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] || fullName.trim();
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : firstName;
  return { firstName, lastName };
};

const toAppUser = (backendUser) => ({
  id: backendUser.id,
  name: `${backendUser.firstName} ${backendUser.lastName}`.trim(),
  firstName: backendUser.firstName,
  lastName: backendUser.lastName,
  email: backendUser.email,
  phone: backendUser.phone,
  locale: backendUser.locale,
  role: backendUser.role,
});

const login = async (email, password) => {
  try {
    const json = await api.post('/auth/login', { email, password });
    await tokenStorage.setTokens({ accessToken: json.data.accessToken, refreshToken: json.data.refreshToken });
    return { success: true, user: toAppUser(json.data.user) };
  } catch (err) {
    return { success: false, error: err instanceof ApiError ? err.message : 'Something went wrong' };
  }
};

const register = async ({ name, email, phone, password }) => {
  const { firstName, lastName } = splitName(name || '');
  try {
    const json = await api.post('/auth/register', {
      role: 'client', email, password, firstName, lastName, phone: phone || undefined,
    });
    await tokenStorage.setTokens({ accessToken: json.data.accessToken, refreshToken: json.data.refreshToken });
    return { success: true, user: toAppUser(json.data.user) };
  } catch (err) {
    return {
      success: false,
      error: err instanceof ApiError ? err.message : 'Something went wrong',
      details: err instanceof ApiError ? err.details : undefined,
    };
  }
};

const logout = async () => {
  // Clear the local session first and immediately — a logout should never
  // make the UI wait on a network round-trip. Server-side revocation is
  // fired in the background: best-effort, since the token would also just
  // expire on its own even if this call never lands.
  const refreshToken = await tokenStorage.getRefreshToken();
  await tokenStorage.clear();
  api.post('/auth/logout', { refreshToken }).catch(() => {});
  return { success: true };
};

/** Called on app start to restore a session from a previously-stored refresh token. */
const getMe = async () => {
  try {
    const json = await api.get('/auth/me');
    return { success: true, user: toAppUser(json.data.user) };
  } catch (err) {
    return { success: false, error: err instanceof ApiError ? err.message : 'Something went wrong' };
  }
};

const updateProfile = async (patch) => {
  try {
    const json = await api.patch('/users/me', patch);
    return { success: true, user: toAppUser(json.data.user) };
  } catch (err) {
    return { success: false, error: err instanceof ApiError ? err.message : 'Something went wrong' };
  }
};

/** Whether a session might exist — checked before bothering to call getMe() on app start. */
const hasStoredSession = async () => {
  const refreshToken = await tokenStorage.getRefreshToken();
  return !!refreshToken;
};

export { splitName };

export default {
  login, register, logout, getMe, updateProfile, hasStoredSession,
};
