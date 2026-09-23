/**
 * bookingService.js — create / fetch / cancel bookings, price estimation.
 * Create/fetch/cancel talk to the real backend's /bookings endpoints;
 * `toAppBooking` maps its DTO (see bookings.service.js's toBookingDTO) down
 * to the flat shape MyBookingsScreen/BookingDetailScreen already render.
 */
import api, { ApiError } from './api';

const toAppBooking = (dto) => ({
  id: dto.id,
  service: dto.serviceLabel,
  provider: dto.provider?.name,
  providerId: dto.provider?.id,
  providerType: dto.providerType,
  date: dto.scheduledDate,
  time: dto.scheduledTime,
  status: dto.status,
  frequency: dto.isRecurring ? (dto.recurrenceFrequency || 'weekly') : 'once',
  urgency: dto.isEmergency ? 'emergency' : 'normal',
  total: dto.pricing?.priceGross,
  createdAt: dto.createdAt,
});

const bookingService = {
  createBooking: async (bookingData) => {
    try {
      const payload = {
        categoryCode: bookingData.categoryCode,
        serviceLabel: bookingData.service,
        providerType: bookingData.providerType,
        ...(bookingData.providerType === 'company'
          ? { companyId: bookingData.providerId }
          : { independentProviderId: bookingData.providerId }),
        clientPhone: bookingData.clientPhone,
        addressStreet: bookingData.addressStreet,
        addressPostalCode: bookingData.addressPostalCode,
        addressCity: bookingData.addressCity,
        scheduledDate: bookingData.scheduledDate,
        scheduledTime: bookingData.time,
        priceGross: bookingData.total,
        isRecurring: bookingData.frequency && bookingData.frequency !== 'once',
        recurrenceFrequency: bookingData.frequency && bookingData.frequency !== 'once' ? bookingData.frequency : undefined,
        isEmergency: bookingData.urgency === 'emergency',
      };
      const json = await api.post('/bookings', payload);
      return { success: true, booking: toAppBooking(json.data.booking) };
    } catch (err) {
      return { success: false, error: err instanceof ApiError ? err.message : 'Something went wrong' };
    }
  },

  getBookingById: async (id) => {
    try {
      const json = await api.get(`/bookings/${id}`);
      return { success: true, booking: toAppBooking(json.data.booking) };
    } catch (err) {
      return { success: false, error: err instanceof ApiError ? err.message : 'Something went wrong' };
    }
  },

  getMyBookings: async () => {
    try {
      const json = await api.get('/bookings');
      return { success: true, bookings: (json.data || []).map(toAppBooking) };
    } catch (err) {
      return { success: false, error: err instanceof ApiError ? err.message : 'Something went wrong' };
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const json = await api.post(`/bookings/${bookingId}/cancel`, {});
      return { success: true, booking: toAppBooking(json.data.booking) };
    } catch (err) {
      return { success: false, error: err instanceof ApiError ? err.message : 'Something went wrong' };
    }
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
