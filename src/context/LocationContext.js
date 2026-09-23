import React, { createContext, useCallback, useContext, useState } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext();

export const useLocationAccess = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocationAccess must be used inside <LocationProvider>');
  return ctx;
};

// Rüttenscheid, Essen — center of the neighborhood the seed data is
// grounded in. Used whenever permission is denied/unavailable so
// distance-based features (Nearby map, provider sorting) still have
// something plausible to work with instead of breaking outright.
export const FALLBACK_COORDS = { latitude: 51.4372, longitude: 7.0138 };

// status: 'undetermined' | 'granted' | 'denied'. A browsing app only needs
// a snapshot of where the user is right now (not a live-tracking
// subscription like the field-worker company app), so this fetches once
// per permission grant rather than watching continuously.
export const LocationProvider = ({ children }) => {
  const [status, setStatus] = useState('undetermined');
  const [coords, setCoords] = useState(null);
  const [requesting, setRequesting] = useState(false);

  const requestLocation = useCallback(async () => {
    setRequesting(true);
    try {
      const { status: permStatus } = await Location.requestForegroundPermissionsAsync();
      setStatus(permStatus === 'granted' ? 'granted' : 'denied');
      if (permStatus === 'granted') {
        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      }
      return permStatus;
    } catch (e) {
      setStatus('denied');
      return 'denied';
    } finally {
      setRequesting(false);
    }
  }, []);

  // What screens should actually query with — real coords once granted,
  // the Essen fallback otherwise, so provider-browsing code never has to
  // special-case "no permission yet" itself.
  const effectiveCoords = coords ?? FALLBACK_COORDS;

  return (
    <LocationContext.Provider value={{
      status, coords, effectiveCoords, requesting, requestLocation,
    }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
