import { useState, useRef } from 'react';
import { providerService } from '../services';

const useSearch = (debounceMs = 300) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const timer = useRef(null);

  const search = (query) => {
    if (timer.current) clearTimeout(timer.current);
    if (!query || query.trim().length === 0) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    timer.current = setTimeout(async () => {
      setError(null);
      const result = await providerService.searchProviders(query);
      if (result.success) setResults(result.providers);
      else { setError(result.error); setResults([]); }
      setLoading(false);
    }, debounceMs);
  };

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    setResults([]); setLoading(false); setError(null);
  };

  return { results, loading, error, search, clear };
};

export default useSearch;
