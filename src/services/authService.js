/**
 * authService.js — login / register / logout.
 * Mocked for now; swap the TODO lines for real api.post() calls.
 */
const authService = {
  login: async (email, password) => {
    try {
      await new Promise((r) => setTimeout(r, 500));
      if (!email || !password) throw new Error('E-Mail und Passwort erforderlich');
      return { success: true, user: { id: '1', name: 'Max Mustermann', email }, token: 'mock-token' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  register: async ({ name, email, phone, password }) => {
    try {
      await new Promise((r) => setTimeout(r, 500));
      if (!name || !email || !password) throw new Error('Alle Felder sind erforderlich');
      return { success: true, user: { id: '1', name, email, phone }, token: 'mock-token' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  logout: async () => ({ success: true }),
};

export default authService;
