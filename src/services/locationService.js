/**
 * locationService.js — distance + address helpers.
 * Maps to the spec's "location service" backend module.
 * Replace with real geocoding (e.g. Google Maps API) when going live.
 */

const MOCK_ADDRESS = {
  street: 'Musterstraße 1',
  city:   'Essen',
  zip:    '45127',
  country: 'Deutschland',
};

const locationService = {
  /** Returns the user's saved address (mock). */
  getCurrentAddress: async () => {
    await new Promise((r) => setTimeout(r, 200));
    return { success: true, address: MOCK_ADDRESS };
  },

  /** Formats an address object into a single display line. */
  formatAddress: (addr = MOCK_ADDRESS) =>
    `${addr.street}, ${addr.zip} ${addr.city}`,

  /** Rough straight-line distance estimate between two lat/lng pairs (km). */
  calculateDistance: (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  },
};

export default locationService;
