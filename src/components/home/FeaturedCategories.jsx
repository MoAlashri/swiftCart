import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { staggerContainer, fadeUp } from '../../lib/animations';

const CATEGORY_SLUGS = [
  { slug: 'smartphones', label: 'Electronics' },
  { slug: 'mens-shirts', label: 'Fashion' },
  { slug: 'furniture', label: 'Home & Living' },
  { slug: 'mens-watches', label: 'Watches' },
  { slug: 'beauty', label: 'Beauty' },
  { slug: 'sports-accessories', label: 'Sports' },
];

function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCategoryImages() {
      try {
        const results = await Promise.all(
          CATEGORY_SLUGS.map(async ({ slug, label }) => {
            const res = await fetch(`https://dummyjson.com/products/category/${slug}?limit=1`);
            const json = await res.json();
            return {
              slug,
              label,
              image: json.products?.[0]?.thumbnail || null,
            };
          })
        );
        if (!cancelled) setCategories(results);
      } catch {
        if (!cancelled) setCategories(CATEGORY_SLUGS.map((c) => ({ ...c, image: null })));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadCategoryImages();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Shop by Category</h2>
        <Link to="/shop" className="flex items-center gap-1 text-sm font-medium text-accent hover:underline">
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {(isLoading ? CATEGORY_SLUGS : categories).map(({ slug, label, image }) => (
          <motion.div key={slug} variants={fadeUp}>
            <Link
              to={`/shop?cat=${slug}`}
              className="group block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                {image ? (
                  <img
                    src={image}
                    alt={label}
                    className="h-full w-full object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full animate-pulse bg-muted" />
                )}
              </div>

              <div className="flex items-center justify-between p-3">
                <span className="text-sm font-medium text-foreground">{label}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default FeaturedCategories;