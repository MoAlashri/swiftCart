import { useState, useEffect, useCallback, useRef } from 'react';

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const fetchData = useCallback(async (abortcontroller) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        ...optionsRef.current,
        signal: abortcontroller?.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted', url);
      } else {
        setError(error.message || 'Something went wrong fetching data');
      }
    } finally {
      setIsLoading(false);
    }
  }, [url]); // ✅ بس url في الـ dependencies

  useEffect(() => {
    if (!url) return;
    const abortcontroller = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(abortcontroller);
    return () => {
      abortcontroller.abort();
    };
  }, [fetchData, url]);

  return { data, isloading, error };
}