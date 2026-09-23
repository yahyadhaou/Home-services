/**
 * messageService.js — real conversations/messages from the backend's
 * /messages endpoints. A brand-new account has no conversations until a
 * client actually starts one with a provider (start()) — never a
 * pre-populated inbox.
 */
import api from './api';

const toConversation = (dto) => ({
  id: dto.id,
  name: dto.provider?.name || '',
  providerType: dto.providerType,
  providerId: dto.provider?.id,
  lastMessageAt: dto.lastMessageAt,
});

const toMessage = (dto, currentUserId) => ({
  id: String(dto.id),
  text: dto.body,
  sender: dto.senderId === currentUserId ? 'user' : 'provider',
  time: dto.sentAt ? new Date(dto.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
});

const messageService = {
  listConversations: async () => {
    try {
      const res = await api.get('/messages', { limit: 50 });
      return { success: true, conversations: (res.data || []).map(toConversation) };
    } catch (err) {
      return { success: false, error: err.message || 'Conversations could not be loaded' };
    }
  },

  /** Finds or creates the conversation with a given provider — used when messaging starts from a provider profile rather than the inbox. */
  startConversation: async ({ providerType, companyId, independentProviderId, bookingId }) => {
    try {
      const res = await api.post('/messages', {
        providerType,
        companyId: providerType === 'company' ? companyId : undefined,
        independentProviderId: providerType === 'independent' ? independentProviderId : undefined,
        bookingId,
      });
      return { success: true, conversation: toConversation(res.data.conversation) };
    } catch (err) {
      return { success: false, error: err.message || 'Could not start conversation' };
    }
  },

  listMessages: async (conversationId, currentUserId) => {
    try {
      const res = await api.get(`/messages/${conversationId}/messages`, { limit: 100 });
      return { success: true, messages: (res.data || []).map((m) => toMessage(m, currentUserId)) };
    } catch (err) {
      return { success: false, error: err.message || 'Messages could not be loaded' };
    }
  },

  sendMessage: async (conversationId, body, currentUserId) => {
    try {
      const res = await api.post(`/messages/${conversationId}/messages`, { body });
      return { success: true, message: toMessage(res.data.message, currentUserId) };
    } catch (err) {
      return { success: false, error: err.message || 'Message could not be sent' };
    }
  },

  markRead: async (conversationId) => {
    try {
      await api.patch(`/messages/${conversationId}/read`);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Could not mark as read' };
    }
  },
};

export default messageService;
