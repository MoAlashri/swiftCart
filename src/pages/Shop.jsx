import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import useProducts from '../hooks/useProducts';
import useCategories from '../hooks/useCategories';
import ProductCard from '../components/products/ProductCard';
import Skeleton from '../components/ui/Skeleton';
import FilterSidebar from '../components/shop/FilterSidebar';
import SortDropdown from '../components/shop/SortDropdown';
import Pagination from '../components/shop/Pagination';

const PAGE_SIZE = 12;
const DEFAULT_FILTERS = { category: null, minPrice: '', maxPrice: '', minRating: 0 };

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const { products, isLoading, error } = useProducts(searchQuery);
  const { categories } = useCategories();

  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_FILTERS,
    category: searchParams.get('cat') || null,
  }));
  const [sort, setSort] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setSearchInput(searchQuery);
  }

  const filterKey = JSON.stringify({ filters, sort, searchQuery });
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

  const handleFilterChange = (patch) => setFilters((prev) => ({ ...prev, ...patch }));
  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setSort('default');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (trimmed) next.set('search', trimmed);
      else next.delete('search');
      return next;
    });
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('search');
      return next;
    });
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category) result = result.filter((p) => p.category === filters.category);
    if (filters.minPrice !== '') result = result.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice !== '') result = result.filter((p) => p.price <= Number(filters.maxPrice));
    if (filters.minRating > 0) result = result.filter((p) => p.rating >= filters.minRating);

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating-desc': result.sort((a, b) => b.rating - a.rating); break;
      case 'title-asc': result.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: break;
    }

    return result;
  }, [products, filters, sort]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Shop</h1>
          {searchQuery && (
            <p className="mt-1 text-sm text-muted-foreground">
              Search results for <span className="font-medium text-foreground">"{searchQuery}"</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="h-9 w-full rounded-md border border-border bg-transparent pl-9 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>

          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex shrink-0 items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar categories={categories} filters={filters} onChange={handleFilterChange} onReset={handleReset} />
        </div>

        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-[80%] max-w-xs overflow-y-auto bg-background p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Filters</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)}>
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <FilterSidebar categories={categories} filters={filters} onChange={handleFilterChange} onReset={handleReset} />
            </div>
          </div>
        )}

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Loading…' : `${filteredProducts.length} products`}
            </p>
            <SortDropdown value={sort} onChange={setSort} />
          </div>

          {error && <p className="text-sm text-destructive">Couldn't load products: {error}</p>}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {isLoading &&
              Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <Skeleton key={i} className="aspect-3/4 w-full rounded-lg" />
              ))}

            {!isLoading && paginatedProducts.length === 0 && (
              <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
                {searchQuery
                  ? `No results for "${searchQuery}".`
                  : 'No products match your filters.'}
              </p>
            )}

            {!isLoading &&
              paginatedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>

          {!isLoading && totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;