const RATING_OPTIONS = [4, 3, 2, 1];

function FilterSidebar({ categories, filters, onChange, onReset }) {
  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Filters</h2>
        <button onClick={onReset} className="text-xs text-muted-foreground underline hover:text-foreground">
          Reset
        </button>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-foreground">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="radio"
              name="category"
              checked={!filters.category}
              onChange={() => onChange({ category: null })}
              className="accent-primary"
            />
            All categories
          </label>
          {categories.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-2 text-sm capitalize text-muted-foreground">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.slug}
                onChange={() => onChange({ category: cat.slug })}
                className="accent-primary"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-foreground">Price</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            className="h-9 w-full rounded-md border border-border bg-transparent px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="text-muted-foreground">–</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            className="h-9 w-full rounded-md border border-border bg-transparent px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-foreground">Minimum Rating</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === 0}
              onChange={() => onChange({ minRating: 0 })}
              className="accent-primary"
            />
            Any rating
          </label>
          {RATING_OPTIONS.map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => onChange({ minRating: r })}
                className="accent-primary"
              />
              {r}+ stars
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;