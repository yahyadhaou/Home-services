import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
};

export const AppProvider = ({ children }) => {
  const [user, setUser]               = useState(null);
  const [isAuthenticated, setIsAuth]   = useState(false);
  const [loading, setLoading]         = useState(false);
  const [bookings, setBookings]       = useState([]);
  const [favorites, setFavorites]     = useState([]);

  // --- Auth ---
  const login = async (email) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setUser({ id: '1', name: 'Max Mustermann', email, phone: '+49 123 456 7890' });
    setIsAuth(true);
    setLoading(false);
    return { success: true };
  };

  const register = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setUser({ id: '1', ...data });
    setIsAuth(true);
    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    setBookings([]);
    setFavorites([]);
  };

  // --- Bookings ---
  const addBooking    = (b)       => setBookings((p) => [...p, { ...b, id: Date.now().toString() }]);
  const updateBooking = (id, upd) => setBookings((p) => p.map((b) => (b.id === id ? { ...b, ...upd } : b)));
  const deleteBooking = (id)      => setBookings((p) => p.filter((b) => b.id !== id));

  // --- Favorites ---
  const addFavorite    = (id) => setFavorites((p) => (p.includes(id) ? p : [...p, id]));
  const removeFavorite = (id) => setFavorites((p) => p.filter((f) => f !== id));
  const isFavorite     = (id) => favorites.includes(id);

  return (
    <AppContext.Provider
      value={{
        user, isAuthenticated, loading,
        login, register, logout,
        bookings, addBooking, updateBooking, deleteBooking,
        favorites, addFavorite, removeFavorite, isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
