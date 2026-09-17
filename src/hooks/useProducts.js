import useFetch from './useFetch';

export default function useProducts(searchQuery = '') {
  const url = searchQuery
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`
    : 'https://dummyjson.com/products?limit=0';

  const { data, isLoading, error } = useFetch(url);

  return {
    products: data?.products ?? [],
    isLoading: isLoading,
    error,
  };
}