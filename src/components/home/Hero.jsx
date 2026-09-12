import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Button from '../ui/Button';
import useFetch from '../../hooks/useFetch';

import 'swiper/css';
import 'swiper/css/pagination';

function Hero() {
  const { data, isloading } = useFetch(
    'https://dummyjson.com/products?limit=6&sortBy=rating&order=desc'
  );

  const products = data?.products ?? [];

  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-8">
          {/* نص - زي ما هو من غير تعديل */}
          <div>
            <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Shopping,
              <br />
              the way it
              <br />
              should feel.
            </h1>

            <p className="mt-6 max-w-[34ch] font-sans text-base leading-relaxed text-muted-foreground">
              No noise, no guesswork. Just things worth owning, picked and
              priced straight.
            </p>

            <div className="mt-8">
              <Link to="/shop">
                <Button variant="primary" size="lg" className="rounded-none px-8">
                  Shop the edit
                </Button>
              </Link>
            </div>

            <p className="mt-10 border-t border-border pt-4 font-sans text-sm text-muted-foreground">
              194 items available today
            </p>
          </div>

          <div className="relative">
            {isloading || products.length === 0 ? (
              <div className="h-[420px] w-full animate-pulse bg-muted" />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative"
              >
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  loop
                  className="hero-swiper"
                >
                  {products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="h-[420px] w-full overflow-hidden rounded-md bg-muted md:h-[480px]">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-contain p-8"
                        />
                      </div>

                      <div className="absolute -bottom-5 left-4 max-w-[220px] rounded-sm border border-border bg-card px-4 py-3 shadow-sm md:left-0 z-10">
                        <p className="truncate font-sans text-sm font-medium text-card-foreground">
                          {product.title}
                        </p>
                        <p className="mt-0.5 font-sans text-sm font-semibold text-primary">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;