import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import useFetch from '../../hooks/useFetch';

function Hero() {
  const { data, isLoading } = useFetch(
    'https://dummyjson.com/products?limit=1&sortBy=rating&order=desc'
  );

  const product = data?.products?.[0];

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-8">
          <div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
              Shopping,
              <br />
              the way it
              <br />
              should feel.
            </h1>

            <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-muted-foreground">
              No noise, no guesswork. Just things worth owning, picked and
              priced straight.
            </p>

            <div className="mt-7">
              <Link to="/shop">
                <Button variant="primary" size="lg">
                  Shop the edit
                </Button>
              </Link>
            </div>

            <p className="mt-10 border-t border-border pt-4 text-sm text-muted-foreground">
              194 items available today
            </p>
          </div>

          <div className="relative flex h-105 items-center justify-center rounded-lg border border-border bg-card p-6 shadow-sm md:h-120">
            {isLoading || !product ? (
              <div className="h-full w-full animate-pulse rounded-md bg-muted" />
            ) : (
              <>
                <motion.img
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />

                <div className="absolute bottom-4 left-4 rounded-md border border-border bg-card px-3 py-2 shadow-sm">
                  <p className="max-w-45 truncate text-sm font-medium text-card-foreground">
                    {product.title}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-accent">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;