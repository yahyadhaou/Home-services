import { useState, useEffect, useCallback } from 'react';
import { providerService } from '../services';

const useProviders = (category = null) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await providerService.getProviders(category);
    if (result.success) setProviders(result.providers);
    else setError(result.error);
    setLoading(false);
  }, [category]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { providers, loading, error, refetch: fetchData };
};

export default useProviders;
