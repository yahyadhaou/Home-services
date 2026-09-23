/**
 * The one place in the app that speaks HTTP to the backend. Every other
 * service file (authService, providerService, bookingService, ...) calls
 * through here rather than using `fetch` directly, so auth headers, error
 * shape, and token refresh are handled exactly once instead of being
 * copy-pasted into every service.
 *
 * Base URL comes from EXPO_PUBLIC_API_BASE_URL (see .env.example) — Expo
 * inlines EXPO_PUBLIC_* vars into the bundle at build time, no extra config
 * needed, but the dev server has to be restarted after changing it.
 */
import tokenStorage from './tokenStorage';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!BASE_URL && __DEV__) {
  // eslint-disable-next-line no-console
  console.warn(
    '[api] EXPO_PUBLIC_API_BASE_URL is not set — copy .env.example to .env, fill it in, and restart the Expo dev server.',
  );
}

/** Thrown for both network failures and non-2xx responses, so callers only ever catch one error type. */
export class ApiError extends Error {
  constructor(message, { status, details } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

// Endpoints that must never trigger an auth-refresh retry loop — either
// they're what refresh itself calls, or hitting them with a stale/expired
// token is an expected, unauthenticated case rather than a session issue.
const NO_REFRESH_RETRY_PATHS = ['/auth/login', '/auth/register', '/auth/refresh'];

let refreshPromise = null;

/** Shares one in-flight refresh across every request that hits a 401 at the same time, instead of each firing its own. */
const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = await tokenStorage.getRefreshToken();
      if (!refreshToken) throw new ApiError('Not signed in', { status: 401 });

      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({ refreshToken }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.data?.accessToken) {
        await tokenStorage.clear();
        throw new ApiError(json?.error?.message || 'Session expired', { status: res.status });
      }

      await tokenStorage.setTokens({ accessToken: json.data.accessToken, refreshToken: json.data.refreshToken });
      return json.data.accessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

const request = async (path, { method = 'GET', body, query, retryOn401 = true } = {}) => {
  const accessToken = await tokenStorage.getAccessToken();

  const url = new URL(`${BASE_URL}${path}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
    });
  }

  const headers = {
    'Content-Type': 'application/json',
    // ngrok's free tier serves an HTML interstitial to any request without
    // this header — see homeservice-backend/docs/NGROK.md. Harmless when
    // not behind ngrok, so it's sent unconditionally.
    'ngrok-skip-browser-warning': 'true',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  let response;
  try {
    response = await fetch(url.toString(), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    throw new ApiError('Could not reach the server — check your connection and API URL.', { status: 0 });
  }

  const json = await response.json().catch(() => null);

  if (response.status === 401 && retryOn401 && !NO_REFRESH_RETRY_PATHS.includes(path)) {
    try {
      await refreshAccessToken();
    } catch (refreshErr) {
      throw new ApiError(json?.error?.message || 'Session expired', { status: 401 });
    }
    return request(path, {
      method, body, query, retryOn401: false,
    });
  }

  if (!response.ok) {
    throw new ApiError(json?.error?.message || `Request failed (${response.status})`, {
      status: response.status,
      details: json?.error?.details,
    });
  }

  return json;
};

const api = {
  get: (path, query) => request(path, { method: 'GET', query }),
  post: (path, body) => request(path, { method: 'POST', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  delete: (path, body) => request(path, { method: 'DELETE', body }),
};

export default api;
