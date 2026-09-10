import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-16">
      <Hero />
      <FeaturedCategories />
      {/* السيكشن الجاي هيكون الـ Trending Products */}
    </div>
  );
}