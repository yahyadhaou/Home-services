/**
 * paymentService.js — real /payments calls. No payment processor is wired
 * up on the backend yet (see payments.service.js's createPayment) — a
 * card/apple_pay/google_pay charge is simulated as succeeding immediately,
 * while 'cash' is recorded as genuinely pending (owed on job completion,
 * not simulated as paid). Swapping in a real processor later only touches
 * the backend function, not this service or its callers.
 */
import api, { ApiError } from './api';

const toAppPayment = (dto) => ({
  id: dto.id,
  amountGross: dto.amountGross,
  currency: dto.currency,
  status: dto.status,
  method: dto.method,
  processedAt: dto.processedAt,
});

const paymentService = {
  /** method: 'card' | 'apple_pay' | 'google_pay' | 'cash' */
  createPayment: async (bookingId, method) => {
    try {
      const json = await api.post('/payments', { bookingId, method });
      return { success: true, payment: toAppPayment(json.data.payment) };
    } catch (err) {
      return { success: false, error: err instanceof ApiError ? err.message : 'Something went wrong' };
    }
  },

  getForBooking: async (bookingId) => {
    try {
      const json = await api.get(`/payments/booking/${bookingId}`);
      return { success: true, payments: (json.data.payments || []).map(toAppPayment) };
    } catch (err) {
      return { success: false, error: err instanceof ApiError ? err.message : 'Something went wrong' };
    }
  },
};

export default paymentService;
