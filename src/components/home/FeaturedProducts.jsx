import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import ProductCard from '../products/ProductCard';
import Skeleton from '../ui/Skeleton';
import { staggerContainer, fadeUp } from '../../lib/animations';

function FeaturedProducts() {
  const { data, isloading, error } = useFetch('https://dummyjson.com/products?limit=8');

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Featured Products</h2>
      </div>

      {error && <p className="text-sm text-destructive">Couldn't load products: {error}</p>}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {isloading &&
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-3/4 w-full rounded-lg" />
          ))}

        {!isloading &&
          data?.products?.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}

export default FeaturedProducts;