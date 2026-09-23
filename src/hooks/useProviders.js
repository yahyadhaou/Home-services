import { useState, useEffect, useCallback } from 'react';
import { providerService } from '../services';
import { useLocationAccess } from '../context/LocationContext';

/** `category` here is a backend category CODE (e.g. 'klempner'), not a display label. */
const useProviders = (category = null) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const { effectiveCoords } = useLocationAccess();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await providerService.getProviders(category, effectiveCoords);
    if (result.success) setProviders(result.providers);
    else setError(result.error);
    setLoading(false);
  }, [category, effectiveCoords]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { providers, loading, error, refetch: fetchData };
};

export default useProviders;
