/**
 * providerService.js — provider listings, detail, search.
 * Maps to the spec's "provider management" backend module.
 */
const MOCK_PROVIDERS = [
  { id: '1', name: 'Müller GmbH',        category: 'Klempner',   rating: 4.9, reviews: 234, distance: '1.2 km', price: '€€',  available: 'Heute 14:00',  verified: true,  responseTime: '< 10 Min', jobs: 450 },
  { id: '2', name: 'Schmidt Sanitär',    category: 'Klempner',   rating: 4.7, reviews: 189, distance: '2.5 km', price: '€€€', available: 'Heute 16:00',  verified: true,  responseTime: '< 15 Min', jobs: 320 },
  { id: '3', name: 'Bauer Haustechnik', category: 'Heizung',    rating: 4.8, reviews: 156, distance: '3.1 km', price: '€€',  available: 'Morgen 09:00', verified: false, responseTime: '< 20 Min', jobs: 280 },
  { id: '4', name: 'Weber Service',      category: 'Elektriker', rating: 4.6, reviews: 98,  distance: '4.0 km', price: '€',   available: 'Heute 18:00',  verified: true,  responseTime: '< 30 Min', jobs: 190 },
  { id: '5', name: 'Clean Pro',          category: 'Reinigung',  rating: 4.9, reviews: 312, distance: '0.8 km', price: '€€',  available: 'Heute 12:00',  verified: true,  responseTime: '< 5 Min',  jobs: 680 },
  { id: '6', name: 'Farbwerk GmbH',      category: 'Maler',      rating: 4.7, reviews: 124, distance: '2.1 km', price: '€€',  available: 'Morgen 10:00', verified: true,  responseTime: '< 15 Min', jobs: 210 },
];

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
};

export default providerService;
