import { Link } from 'react-router-dom';
import { Smartphone, Shirt, Home as HomeIcon, Watch, Sparkles, Dumbbell } from 'lucide-react';

const CATEGORIES = [
  { name: 'Electronics', slug: 'smartphones', icon: Smartphone },
  { name: 'Fashion', slug: 'mens-shirts', icon: Shirt },
  { name: 'Home & Living', slug: 'furniture', icon: HomeIcon },
  { name: 'Watches', slug: 'mens-watches', icon: Watch },
  { name: 'Beauty', slug: 'beauty', icon: Sparkles },
  { name: 'Sports', slug: 'sports-accessories', icon: Dumbbell },
];

function FeaturedCategories() {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-xl font-bold text-foreground">Shop by Category</h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {CATEGORIES.map(({ name, slug, icon: Icon }) => (
          <Link
            key={slug}
            to={`/shop?cat=${slug}`}
            className="group flex flex-col items-center gap-2 rounded-lg border border-border p-3 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="rounded-full bg-accent/10 p-3 transition-colors group-hover:bg-accent/20">
              <Icon className="h-5 w-5 text-accent" />
            </div>
            <span className="text-xs font-medium text-foreground">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCategories;