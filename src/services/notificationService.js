/**
 * notificationService.js — real notifications from the backend's
 * /notifications endpoints. A brand-new account has none of these until
 * something in the backend actually creates one (a booking confirmed, a
 * message received, etc.) — never a pre-populated welcome list.
 */
import api from './api';

const notificationService = {
  list: async () => {
    try {
      const res = await api.get('/notifications', { limit: 50 });
      return { success: true, notifications: res.data || [] };
    } catch (err) {
      return { success: false, error: err.message || 'Notifications could not be loaded' };
    }
  },

  markRead: async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Could not mark as read' };
    }
  },

  markAllRead: async () => {
    try {
      await api.patch('/notifications/read-all');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Could not mark all as read' };
    }
  },
};

export default notificationService;
