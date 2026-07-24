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
 * hourlyRate is a real per-hour EUR figure (not a €/€€/€€€ tier symbol) so
 * prices are genuinely comparable and independents read as meaningfully
 * cheaper than companies, the way they would in reality.
 *
 * mapPos is a percentage {x,y} position on the schematic Nearby map/radar,
 * roughly proportional to real relative direction from the user's mock
 * address (Rüttenscheider Straße 142, 45131 Essen — see locationService.js).
 */
const MOCK_PROVIDERS = [
  { id: '1',  name: 'Rüttenscheider Sanitärtechnik GmbH', providerType: 'company',     category: 'Klempner',   district: 'Rüttenscheid',  street: 'Rüttenscheider Straße 88', plz: '45131', rating: 4.9, reviews: 234, distance: '1.2 km', hourlyRate: 68, available: 'Heute 14:00',  verified: true,  responseTime: '< 10 Min', jobs: 450, mapPos: { x: 55, y: 42 } },
  { id: '2',  name: 'Jonas Vogt',                          providerType: 'independent', category: 'Klempner',   district: 'Rüttenscheid',  street: 'Alfredstraße 21',          plz: '45130', rating: 4.7, reviews: 98,  distance: '2.0 km', hourlyRate: 42, available: 'Heute 16:30',  verified: true,  responseTime: '< 15 Min', jobs: 210, mapPos: { x: 63, y: 52 } },
  { id: '3',  name: 'ElektroMeister Krause GmbH',          providerType: 'company',     category: 'Elektriker', district: 'Holsterhausen', street: 'Holsterhauser Straße 55',  plz: '45147', rating: 4.8, reviews: 156, distance: '2.8 km', hourlyRate: 72, available: 'Morgen 09:00', verified: true,  responseTime: '< 20 Min', jobs: 320, mapPos: { x: 30, y: 35 } },
  { id: '4',  name: 'Sabine Hoffmann',                     providerType: 'independent', category: 'Elektriker', district: 'Holsterhausen', street: 'Lenbachstraße 14',         plz: '45147', rating: 4.6, reviews: 87,  distance: '3.1 km', hourlyRate: 45, available: 'Heute 18:00',  verified: false, responseTime: '< 30 Min', jobs: 140, mapPos: { x: 25, y: 48 } },
  { id: '5',  name: 'Blitzblank Gebäudereinigung GmbH',    providerType: 'company',     category: 'Reinigung',  district: 'Frohnhausen',   street: 'Frohnhauser Straße 130',   plz: '45145', rating: 4.9, reviews: 312, distance: '3.4 km', hourlyRate: 35, available: 'Heute 12:00',  verified: true,  responseTime: '< 5 Min',  jobs: 680, mapPos: { x: 18, y: 60 } },
  { id: '6',  name: 'Aylin Yildiz',                        providerType: 'independent', category: 'Reinigung',  district: 'Frohnhausen',   street: 'Frohnhauser Straße 47',    plz: '45145', rating: 4.8, reviews: 145, distance: '3.9 km', hourlyRate: 24, available: 'Heute 13:00',  verified: true,  responseTime: '< 10 Min', jobs: 260, mapPos: { x: 22, y: 70 } },
  { id: '7',  name: 'Wärmetechnik Ruhr GmbH',              providerType: 'company',     category: 'Heizung',    district: 'Steele',        street: 'Steeler Straße 210',       plz: '45276', rating: 4.7, reviews: 178, distance: '4.6 km', hourlyRate: 75, available: 'Morgen 09:00', verified: true,  responseTime: '< 20 Min', jobs: 300, mapPos: { x: 80, y: 30 } },
  { id: '8',  name: 'Markus Bauer',                        providerType: 'independent', category: 'Heizung',    district: 'Steele',        street: 'Steeler Straße 64',        plz: '45276', rating: 4.5, reviews: 62,  distance: '5.1 km', hourlyRate: 48, available: 'Morgen 11:00', verified: false, responseTime: '< 30 Min', jobs: 95,  mapPos: { x: 85, y: 22 } },
  { id: '9',  name: 'Farbwerk Malerbetrieb GmbH',          providerType: 'company',     category: 'Maler',      district: 'Innenstadt',    street: 'Altendorfer Straße 76',    plz: '45127', rating: 4.7, reviews: 124, distance: '2.1 km', hourlyRate: 39, available: 'Morgen 10:00', verified: true,  responseTime: '< 15 Min', jobs: 210, mapPos: { x: 45, y: 20 } },
  { id: '10', name: 'Nadine Krüger',                       providerType: 'independent', category: 'Maler',      district: 'Innenstadt',    street: 'Altendorfer Straße 12',    plz: '45127', rating: 4.9, reviews: 66,  distance: '2.4 km', hourlyRate: 28, available: 'Heute 15:00',  verified: true,  responseTime: '< 15 Min', jobs: 88,  mapPos: { x: 48, y: 15 } },
  { id: '11', name: 'Holz & Handwerk Schreinerei GmbH',    providerType: 'company',     category: 'Schreiner',  district: 'Rüttenscheid',  street: 'Rüttenscheider Straße 220', plz: '45131', rating: 4.8, reviews: 133, distance: '2.6 km', hourlyRate: 58, available: 'Morgen 09:30', verified: true,  responseTime: '< 20 Min', jobs: 190, mapPos: { x: 60, y: 65 } },
  { id: '12', name: 'GrünPuls Gartenservice GmbH',         providerType: 'company',     category: 'Gärtner',    district: 'Holsterhausen', street: 'Holsterhauser Straße 5',   plz: '45147', rating: 4.6, reviews: 71,  distance: '3.7 km', hourlyRate: 32, available: 'Morgen 08:00', verified: false, responseTime: '< 30 Min', jobs: 120, mapPos: { x: 35, y: 78 } },
  { id: '20', name: 'Rundum Handwerksservice GmbH',        providerType: 'company',     category: 'Handwerker', district: 'Innenstadt',    street: 'Altendorfer Straße 40',    plz: '45127', rating: 4.7, reviews: 141, distance: '2.3 km', hourlyRate: 44, available: 'Heute 14:30',  verified: true,  responseTime: '< 15 Min', jobs: 230, mapPos: { x: 42, y: 33 } },
  { id: '21', name: 'Ozan Celik',                          providerType: 'independent', category: 'Handwerker', district: 'Steele',        street: 'Steeler Straße 88',        plz: '45276', rating: 4.6, reviews: 52,  distance: '4.4 km', hourlyRate: 26, available: 'Heute 17:00',  verified: true,  responseTime: '< 20 Min', jobs: 68,  mapPos: { x: 78, y: 50 } },
  { id: '22', name: 'NetzWerk Ruhr GmbH',                  providerType: 'company',     category: 'Internettechniker', district: 'Rüttenscheid',  street: 'Rüttenscheider Straße 55', plz: '45130', rating: 4.8, reviews: 96,  distance: '1.6 km', hourlyRate: 62, available: 'Heute 13:00',  verified: true,  responseTime: '< 15 Min', jobs: 205, mapPos: { x: 52, y: 48 } },
  { id: '23', name: 'Fabian Nowak',                        providerType: 'independent', category: 'Internettechniker', district: 'Frohnhausen',   street: 'Frohnhauser Straße 88',    plz: '45145', rating: 4.7, reviews: 47,  distance: '3.2 km', hourlyRate: 34, available: 'Heute 16:30',  verified: true,  responseTime: '< 20 Min', jobs: 61,  mapPos: { x: 20, y: 55 } },

  // Umzug (relocation) — mix of companies and independents (with own vehicle),
  // used by both ProviderList/Nearby and the dedicated RelocationScreen wizard.
  { id: '13', name: 'Ruhrpott Umzüge GmbH',                providerType: 'company',     category: 'Umzug',      district: 'Steele',        street: 'Steeler Straße 5',          plz: '45276', rating: 4.7, reviews: 205, distance: '4.3 km', hourlyRate: 89, available: 'Heute 17:00',  verified: true,  responseTime: '< 25 Min', jobs: 340, mapPos: { x: 75, y: 60 }, vehicle: 'Möbelwagen (40 m³)', maxVolume: 40, crew: 3, insured: true },
  { id: '14', name: 'Rhein-Ruhr Umzugsprofis GmbH',        providerType: 'company',     category: 'Umzug',      district: 'Rüttenscheid',  street: 'Rüttenscheider Straße 300', plz: '45131', rating: 4.8, reviews: 167, distance: '2.9 km', hourlyRate: 95, available: 'Morgen 08:00', verified: true,  responseTime: '< 20 Min', jobs: 260, mapPos: { x: 58, y: 75 }, vehicle: 'Möbelwagen (25 m³)', maxVolume: 25, crew: 2, insured: true },
  { id: '17', name: 'Westside Umzugsservice GmbH',         providerType: 'company',     category: 'Umzug',      district: 'Borbeck',       street: 'Borbecker Straße 140',      plz: '45355', rating: 4.6, reviews: 112, distance: '5.8 km', hourlyRate: 82, available: 'Morgen 10:00', verified: true,  responseTime: '< 25 Min', jobs: 175, mapPos: { x: 8,  y: 25 }, vehicle: 'Möbelwagen (30 m³)', maxVolume: 30, crew: 2, insured: true },
  { id: '15', name: 'Tarek Aydin',                         providerType: 'independent', category: 'Umzug',      district: 'Frohnhausen',   street: 'Frohnhauser Straße 210',    plz: '45145', rating: 4.6, reviews: 54,  distance: '3.6 km', hourlyRate: 35, available: 'Heute 15:00',  verified: true,  responseTime: '< 20 Min', jobs: 76,  mapPos: { x: 15, y: 45 }, vehicle: 'VW Caddy Maxi (Kombi)', maxVolume: 4, crew: 1, insured: false },
  { id: '16', name: 'Lukas Fischer',                       providerType: 'independent', category: 'Umzug',      district: 'Holsterhausen', street: 'Holsterhauser Straße 90',   plz: '45147', rating: 4.7, reviews: 41,  distance: '3.0 km', hourlyRate: 30, available: 'Heute 17:30',  verified: false, responseTime: '< 25 Min', jobs: 52,  mapPos: { x: 38, y: 55 }, vehicle: 'Anhänger bis 750 kg',   maxVolume: 6, crew: 1, insured: false },
  { id: '18', name: 'Deniz Aksoy',                         providerType: 'independent', category: 'Umzug',      district: 'Rüttenscheid',  street: 'Alfredstraße 60',           plz: '45130', rating: 4.8, reviews: 63,  distance: '1.8 km', hourlyRate: 38, available: 'Heute 16:00',  verified: true,  responseTime: '< 15 Min', jobs: 94,  mapPos: { x: 68, y: 40 }, vehicle: 'Mercedes Sprinter (Miete)', maxVolume: 12, crew: 1, insured: false },
  { id: '19', name: 'Robin Schmitz',                       providerType: 'independent', category: 'Umzug',      district: 'Steele',        street: 'Steeler Straße 30',         plz: '45276', rating: 4.4, reviews: 28,  distance: '4.9 km', hourlyRate: 27, available: 'Morgen 09:00', verified: false, responseTime: '< 30 Min', jobs: 33,  mapPos: { x: 90, y: 45 }, vehicle: 'VW Transporter (Freund)', maxVolume: 8, crew: 1, insured: false },
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
