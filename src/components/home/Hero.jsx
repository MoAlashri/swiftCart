import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import useFetch from '../../hooks/useFetch';

function Hero() {
  const { data, isLoading } = useFetch(
    'https://dummyjson.com/products?limit=5&sortBy=rating&order=desc'
  );
  const products = data?.products ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (products.length < 2) return;
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % products.length), 4000);
    return () => clearInterval(id);
  }, [products.length]);

  const active = products[activeIndex];

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
          {/* البانر الرئيسي */}
          <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="grid items-center gap-6 p-8 sm:grid-cols-2 md:p-12">
              <div>
                <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                  Upgrade your everyday
                </h1>
                <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                  Top brands. Great prices. Picked for people who don't have time to overthink it.
                </p>
                <Link to="/shop" className="mt-6 inline-block">
                  <Button variant="primary" size="lg" className="gap-2">
                    Shop now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="relative flex h-52 items-center justify-center sm:h-64">
                {isLoading || !active ? (
                  <div className="h-full w-full animate-pulse rounded-md bg-muted" />
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={active.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      src={active.thumbnail}
                      alt={active.title}
                      className="h-full w-full object-contain"
                    />
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* نقط التنقل */}
            {products.length > 1 && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 sm:left-8 sm:translate-x-0">
                {products.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeIndex ? 'w-5 bg-accent' : 'w-1.5 bg-border'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* شريط جانبي — New Arrivals */}
          <Link
            to="/shop?sort=newest"
            className="hidden flex-col justify-between rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md lg:flex"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">New Arrivals</p>
              <p className="mt-1 text-xs text-muted-foreground">Just landed this week</p>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-accent">
              Explore <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;