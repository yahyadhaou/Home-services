/**
 * providerService.js — provider listings, detail, search.
 * Talks to the real backend's /companies and /independents endpoints and
 * merges both provider types into one flat, screen-friendly shape (the app
 * doesn't otherwise care which table a provider came from, only that
 * `providerType` says which).
 *
 * Category codes (klempner, elektriker, ...) come straight from the
 * backend's `categories` table and are what every caller should filter by;
 * `category` on the returned provider is the German display label, kept
 * only so existing icon lookups / display code don't all need touching.
 *
 * `mapPos` is computed client-side from real latitude/longitude (see
 * computeMapPos) — the backend has no concept of a schematic radar
 * position, only real coordinates, so the projection onto the Nearby
 * screen's 0-100% field happens here.
 *
 * Fields the backend genuinely has no data for yet are simply absent
 * (`null`) rather than fabricated — a provider with zero reviews shows no
 * rating, not a fake one.
 */
import api from './api';

export const CATEGORY_LABELS = {
  klempner: 'Klempner',
  elektriker: 'Elektriker',
  reinigung: 'Reinigung',
  heizung: 'Heizung',
  maler: 'Maler',
  schreiner: 'Schreiner',
  gaertner: 'Gärtner',
  handwerker: 'Handwerker',
  internettechniker: 'Internettechniker',
  umzug: 'Umzug',
};

const LIST_LIMIT = 100; // comfortably above the seeded 12+12 providers — no pagination UI exists to page through more.
const KM_PER_DEG_LAT = 111.32;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/**
 * Projects a real (lat, lng) onto the Nearby radar's 0-100% coordinate
 * space, centered on `center` and clamped to `maxKm` from it — the map
 * has a fixed schematic radius, it isn't a scaled real map, so anything
 * farther than `maxKm` just pins to the edge rather than overflowing.
 */
export const computeMapPos = (center, point, maxKm = 8) => {
  if (!center || !point || point.latitude == null || point.longitude == null) return { x: 50, y: 50 };
  const dLatDeg = point.latitude - center.latitude;
  const dLngDeg = point.longitude - center.longitude;
  const dyKm = dLatDeg * KM_PER_DEG_LAT;
  const dxKm = dLngDeg * KM_PER_DEG_LAT * Math.cos((center.latitude * Math.PI) / 180);
  const nx = clamp(dxKm, -maxKm, maxKm) / maxKm;
  const ny = clamp(dyKm, -maxKm, maxKm) / maxKm;
  return { x: 50 + nx * 40, y: 50 - ny * 40 };
};

const toProvider = (dto, providerType, center) => {
  const categoryCode = dto.primaryCategory || (dto.categories && dto.categories[0]) || null;
  const latitude = dto.latitude ?? null;
  const longitude = dto.longitude ?? null;

  return {
    id: dto.id,
    providerType,
    name: dto.legalName || dto.businessName,
    category: categoryCode ? (CATEGORY_LABELS[categoryCode] || categoryCode) : null,
    categoryCode,
    categories: dto.categories || [],
    street: dto.street ?? null,
    city: dto.city ?? null,
    postalCode: dto.postalCode ?? null,
    latitude,
    longitude,
    rating: dto.ratingAvg ?? null,
    reviews: dto.reviewCount ?? 0,
    distanceKm: dto.distanceKm ?? null,
    distance: dto.distanceKm != null ? `${dto.distanceKm} km` : null,
    hourlyRate: dto.hourlyRateFrom ?? null,
    verified: true, // only ever true here — the public endpoints never return an unapproved provider
    avgResponseMinutes: dto.avgResponseMinutes ?? null,
    responseTime: dto.avgResponseMinutes != null ? `~${dto.avgResponseMinutes} Min` : null,
    jobs: dto.completedJobs ?? 0,
    mapPos: computeMapPos(center, { latitude, longitude }),
    // Umzug-only — undefined (not null) for every other category, matching
    // how the rest of the app already treats "field doesn't apply here".
    vehicle: dto.vehicleType ?? undefined,
    maxVolume: dto.vehicleMaxVolumeM3 ?? undefined,
    crew: dto.crewSize ?? undefined,
    insured: dto.isInsured ?? undefined,
    longHaulCapable: dto.longHaulCapable ?? undefined,
  };
};

/** Fetches both provider types in parallel and merges them into one flat array. */
const fetchAllProviders = async (center, categoryCode = null) => {
  const query = {
    categoryCode: categoryCode || undefined,
    lat: center?.latitude,
    lng: center?.longitude,
    limit: LIST_LIMIT,
  };

  const [companiesRes, independentsRes] = await Promise.all([
    api.get('/companies', query),
    api.get('/independents', query),
  ]);

  const companies = (companiesRes.data || []).map((dto) => toProvider(dto, 'company', center));
  const independents = (independentsRes.data || []).map((dto) => toProvider(dto, 'independent', center));
  return [...companies, ...independents];
};

const providerService = {
  /** `center` is `{ latitude, longitude }` — see LocationContext.effectiveCoords. */
  getProviders: async (categoryCode = null, center = null) => {
    try {
      const providers = await fetchAllProviders(center, categoryCode);
      return { success: true, providers };
    } catch (err) {
      return { success: false, error: err.message || 'Anbieter konnten nicht geladen werden' };
    }
  },

  getProviderById: async (id, providerType = null, center = null) => {
    try {
      const query = { lat: center?.latitude, lng: center?.longitude };
      if (providerType === 'independent') {
        const res = await api.get(`/independents/${id}`, query);
        return { success: true, provider: toProvider(res.data.provider, 'independent', center) };
      }
      if (providerType === 'company') {
        const res = await api.get(`/companies/${id}`, query);
        return { success: true, provider: toProvider(res.data.company, 'company', center) };
      }
      // providerType not supplied by the caller — try both. Rare path;
      // every current navigation call already carries providerType along
      // with the provider object.
      try {
        const res = await api.get(`/companies/${id}`, query);
        return { success: true, provider: toProvider(res.data.company, 'company', center) };
      } catch (companyErr) {
        const res = await api.get(`/independents/${id}`, query);
        return { success: true, provider: toProvider(res.data.provider, 'independent', center) };
      }
    } catch (err) {
      return { success: false, error: err.message || 'Anbieter nicht gefunden' };
    }
  },

  /** No free-text search endpoint on the backend — filters the full (small) provider set client-side, same as the app has always done. */
  searchProviders: async (query, center = null) => {
    try {
      const providers = await fetchAllProviders(center);
      const q = query.toLowerCase();
      const result = providers.filter(
        (p) => p.name.toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q),
      );
      return { success: true, providers: result };
    } catch (err) {
      return { success: false, error: err.message || 'Suche fehlgeschlagen' };
    }
  },

  getNearby: async (center = null) => {
    try {
      const providers = await fetchAllProviders(center);
      return { success: true, providers, center: { x: 50, y: 50, label: 'Ihr Standort' } };
    } catch (err) {
      return { success: false, error: err.message || 'Anbieter konnten nicht geladen werden' };
    }
  },
};

export default providerService;
