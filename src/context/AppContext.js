import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import authService from '../services/authService';
import bookingService from '../services/bookingService';
import pushNotificationService from '../services/pushNotificationService';

const AppContext = createContext();

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  // Whether the on-start session-restore attempt has finished — SplashScreen
  // waits on this before deciding whether to route to MainTabs or Onboarding,
  // so a returning user with a still-valid refresh token skips login entirely.
  const [authChecked, setAuthChecked] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      const hasSession = await authService.hasStoredSession();
      if (hasSession) {
        const result = await authService.getMe();
        if (result.success) {
          setUser(result.user);
          setIsAuth(true);
          pushNotificationService.registerForPushNotifications();
          refreshBookings();
        }
        // A failed getMe() (expired/revoked refresh token) just leaves the
        // user logged out — authService already cleared storage in that case.
      }
      setAuthChecked(true);
    })();
  }, []);

  // --- Auth ---
  const login = async (email, password) => {
    setLoading(true);
    const result = await authService.login(email, password);
    setLoading(false);
    if (result.success) {
      setUser(result.user);
      setIsAuth(true);
      pushNotificationService.registerForPushNotifications();
      refreshBookings();
    }
    return result;
  };

  const register = async (data) => {
    setLoading(true);
    const result = await authService.register(data);
    setLoading(false);
    if (result.success) {
      setUser(result.user);
      setIsAuth(true);
      pushNotificationService.registerForPushNotifications();
      refreshBookings();
    }
    return result;
  };

  const logout = async () => {
    await pushNotificationService.unregisterPushToken();
    await authService.logout();
    setUser(null);
    setIsAuth(false);
    setBookings([]);
    setFavorites([]);
  };

  const updateProfile = async (patch) => {
    const result = await authService.updateProfile(patch);
    if (result.success) setUser(result.user);
    return result;
  };

  // --- Bookings ---
  // b.id is the real backend booking id (bookingService already mapped the
  // DTO) — this used to overwrite it with Date.now(), which broke every
  // subsequent lookup/cancel by id once bookings were real instead of mock.
  const addBooking = (b) => setBookings((p) => [...p, b]);
  const updateBooking = (id, upd) => setBookings((p) => p.map((b) => (b.id === id ? { ...b, ...upd } : b)));
  const deleteBooking = (id) => setBookings((p) => p.filter((b) => b.id !== id));
  const refreshBookings = async () => {
    const result = await bookingService.getMyBookings();
    if (result.success) setBookings(result.bookings);
  };

  // --- Favorites ---
  const addFavorite = (id) => setFavorites((p) => (p.includes(id) ? p : [...p, id]));
  const removeFavorite = (id) => setFavorites((p) => p.filter((f) => f !== id));
  const isFavorite = (id) => favorites.includes(id);

  return (
    <AppContext.Provider
      value={{
        user, isAuthenticated, loading, authChecked,
        login, register, logout, updateProfile,
        bookings, addBooking, updateBooking, deleteBooking, refreshBookings,
        favorites, addFavorite, removeFavorite, isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
