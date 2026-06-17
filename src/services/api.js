/**
 * api.js — Base HTTP client.
 * Replace BASE_URL with the real NestJS backend from the spec when ready.
 */
const BASE_URL = 'https://api.homeservices.de/v1';

const headers = (token) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const handle = async (res) => {
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
  return data;
};

const api = {
  get:    (endpoint, token) => fetch(`${BASE_URL}${endpoint}`, { method: 'GET', headers: headers(token) }).then(handle),
  post:   (endpoint, body, token) => fetch(`${BASE_URL}${endpoint}`, { method: 'POST', headers: headers(token), body: JSON.stringify(body) }).then(handle),
  put:    (endpoint, body, token) => fetch(`${BASE_URL}${endpoint}`, { method: 'PUT', headers: headers(token), body: JSON.stringify(body) }).then(handle),
  delete: (endpoint, token) => fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE', headers: headers(token) }).then(handle),
};

export default api;
