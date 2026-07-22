/**
 * providerService.js — provider listings, detail, search.
 * Maps to the spec's "provider management" backend module.
 *
 * Mock data is grounded in real Essen/NRW geography (districts, postal codes,
 * and street names) so location-aware features (the Home radar, the Nearby
 * map) read as plausible rather than placeholder-y. Company names are
 * invented using authentic German trade-business naming conventions rather
 * than lifted from any real registered business — mixing `providerType`
 * 'company' vs 'independent' so the UI can distinguish a registered firm
 * from a solo freelancer (different trust signals, no company logo/VAT id
 * for independents, etc).
 *
 * mapPos is a percentage {x,y} position on the schematic Nearby map/radar,
 * roughly proportional to real relative direction from the user's mock
 * address (Rüttenscheider Straße 142, 45131 Essen — see locationService.js).
 */
const MOCK_PROVIDERS = [
  { id: '1',  name: 'Rüttenscheider Sanitärtechnik GmbH', providerType: 'company',     category: 'Klempner',   district: 'Rüttenscheid',  street: 'Rüttenscheider Straße 88', plz: '45131', rating: 4.9, reviews: 234, distance: '1.2 km', price: '€€',  available: 'Heute 14:00',  verified: true,  responseTime: '< 10 Min', jobs: 450, mapPos: { x: 55, y: 42 } },
  { id: '2',  name: 'Jonas Vogt',                          providerType: 'independent', category: 'Klempner',   district: 'Rüttenscheid',  street: 'Alfredstraße 21',          plz: '45130', rating: 4.7, reviews: 98,  distance: '2.0 km', price: '€',   available: 'Heute 16:30',  verified: true,  responseTime: '< 15 Min', jobs: 210, mapPos: { x: 63, y: 52 } },
  { id: '3',  name: 'ElektroMeister Krause GmbH',          providerType: 'company',     category: 'Elektriker', district: 'Holsterhausen', street: 'Holsterhauser Straße 55',  plz: '45147', rating: 4.8, reviews: 156, distance: '2.8 km', price: '€€',  available: 'Morgen 09:00', verified: true,  responseTime: '< 20 Min', jobs: 320, mapPos: { x: 30, y: 35 } },
  { id: '4',  name: 'Sabine Hoffmann',                     providerType: 'independent', category: 'Elektriker', district: 'Holsterhausen', street: 'Lenbachstraße 14',         plz: '45147', rating: 4.6, reviews: 87,  distance: '3.1 km', price: '€',   available: 'Heute 18:00',  verified: false, responseTime: '< 30 Min', jobs: 140, mapPos: { x: 25, y: 48 } },
  { id: '5',  name: 'Blitzblank Gebäudereinigung GmbH',    providerType: 'company',     category: 'Reinigung',  district: 'Frohnhausen',   street: 'Frohnhauser Straße 130',   plz: '45145', rating: 4.9, reviews: 312, distance: '3.4 km', price: '€€',  available: 'Heute 12:00',  verified: true,  responseTime: '< 5 Min',  jobs: 680, mapPos: { x: 18, y: 60 } },
  { id: '6',  name: 'Aylin Yildiz',                        providerType: 'independent', category: 'Reinigung',  district: 'Frohnhausen',   street: 'Frohnhauser Straße 47',    plz: '45145', rating: 4.8, reviews: 145, distance: '3.9 km', price: '€',   available: 'Heute 13:00',  verified: true,  responseTime: '< 10 Min', jobs: 260, mapPos: { x: 22, y: 70 } },
  { id: '7',  name: 'Wärmetechnik Ruhr GmbH',              providerType: 'company',     category: 'Heizung',    district: 'Steele',        street: 'Steeler Straße 210',       plz: '45276', rating: 4.7, reviews: 178, distance: '4.6 km', price: '€€',  available: 'Morgen 09:00', verified: true,  responseTime: '< 20 Min', jobs: 300, mapPos: { x: 80, y: 30 } },
  { id: '8',  name: 'Markus Bauer',                        providerType: 'independent', category: 'Heizung',    district: 'Steele',        street: 'Steeler Straße 64',        plz: '45276', rating: 4.5, reviews: 62,  distance: '5.1 km', price: '€',   available: 'Morgen 11:00', verified: false, responseTime: '< 30 Min', jobs: 95,  mapPos: { x: 85, y: 22 } },
  { id: '9',  name: 'Farbwerk Malerbetrieb GmbH',          providerType: 'company',     category: 'Maler',      district: 'Innenstadt',    street: 'Altendorfer Straße 76',    plz: '45127', rating: 4.7, reviews: 124, distance: '2.1 km', price: '€€',  available: 'Morgen 10:00', verified: true,  responseTime: '< 15 Min', jobs: 210, mapPos: { x: 45, y: 20 } },
  { id: '10', name: 'Nadine Krüger',                       providerType: 'independent', category: 'Maler',      district: 'Innenstadt',    street: 'Altendorfer Straße 12',    plz: '45127', rating: 4.9, reviews: 66,  distance: '2.4 km', price: '€',   available: 'Heute 15:00',  verified: true,  responseTime: '< 15 Min', jobs: 88,  mapPos: { x: 48, y: 15 } },
  { id: '11', name: 'Holz & Handwerk Schreinerei GmbH',    providerType: 'company',     category: 'Schreiner',  district: 'Rüttenscheid',  street: 'Rüttenscheider Straße 220', plz: '45131', rating: 4.8, reviews: 133, distance: '2.6 km', price: '€€',  available: 'Morgen 09:30', verified: true,  responseTime: '< 20 Min', jobs: 190, mapPos: { x: 60, y: 65 } },
  { id: '12', name: 'GrünPuls Gartenservice GmbH',         providerType: 'company',     category: 'Gärtner',    district: 'Holsterhausen', street: 'Holsterhauser Straße 5',   plz: '45147', rating: 4.6, reviews: 71,  distance: '3.7 km', price: '€',   available: 'Morgen 08:00', verified: false, responseTime: '< 30 Min', jobs: 120, mapPos: { x: 35, y: 78 } },
  { id: '13', name: 'Ruhrpott Umzüge GmbH',                providerType: 'company',     category: 'Umzug',      district: 'Steele',        street: 'Steeler Straße 5',         plz: '45276', rating: 4.7, reviews: 205, distance: '4.3 km', price: '€€',  available: 'Heute 17:00',  verified: true,  responseTime: '< 25 Min', jobs: 340, mapPos: { x: 75, y: 60 } },
];

export const NEARBY_CENTER = { x: 50, y: 50, label: 'Rüttenscheid (Sie)' };

const providerService = {
  getProviders: async (category = null) => {
    await new Promise((r) => setTimeout(r, 400));
    const result = category ? MOCK_PROVIDERS.filter((p) => p.category === category) : MOCK_PROVIDERS;
    return { success: true, providers: result };
  },

  getProviderById: async (id) => {
    await new Promise((r) => setTimeout(r, 300));
    const provider = MOCK_PROVIDERS.find((p) => p.id === id);
    return provider ? { success: true, provider } : { success: false, error: 'Anbieter nicht gefunden' };
  },

  searchProviders: async (query) => {
    await new Promise((r) => setTimeout(r, 300));
    const q = query.toLowerCase();
    const result = MOCK_PROVIDERS.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    return { success: true, providers: result };
  },

  getNearby: async () => {
    await new Promise((r) => setTimeout(r, 300));
    return { success: true, providers: MOCK_PROVIDERS, center: NEARBY_CENTER };
  },
};

export default providerService;
