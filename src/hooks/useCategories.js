import { useState, useEffect } from 'react';

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('https://dummyjson.com/products/categories');
        const json = await res.json();
        if (!cancelled) setCategories(json); // [{ slug, name, url }]
      } catch {
        if (!cancelled) setCategories([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, isLoading };
}