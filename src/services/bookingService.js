/**
 * bookingService.js — create / fetch / cancel bookings, price estimation.
 * Maps to the spec's "booking engine" backend module.
 */
const bookingService = {
  createBooking: async (bookingData) => {
    await new Promise((r) => setTimeout(r, 500));
    return { success: true, booking: { id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'confirmed', ...bookingData } };
  },

  getMyBookings: async () => {
    await new Promise((r) => setTimeout(r, 400));
    return { success: true, bookings: [] };
  },

  cancelBooking: async (bookingId) => {
    await new Promise((r) => setTimeout(r, 300));
    return { success: true };
  },

  /** urgency: 'normal' | 'emergency' — adds Notfall-Zuschlag from the spec's monetization rules */
  estimatePrice: (serviceType, urgency = 'normal') => {
    const BASE = {
      Klempner: { min: 80, max: 120 }, Elektriker: { min: 90, max: 140 },
      Reinigung: { min: 60, max: 100 }, Heizung: { min: 100, max: 160 },
      Schreiner: { min: 70, max: 120 }, Maler: { min: 50, max: 90 },
      Gärtner: { min: 40, max: 80 }, Umzug: { min: 120, max: 200 },
      default: { min: 70, max: 120 },
    };
    const base = BASE[serviceType] || BASE.default;
    const surcharge = urgency === 'emergency' ? 30 : 0;
    return { min: base.min + surcharge, max: base.max + surcharge };
  },
};

export default bookingService;
