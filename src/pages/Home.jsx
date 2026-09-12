import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import PromoBanner from '../components/home/PromoBanner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from  '../components/home/Testimonials';
import Newsletter from  '../components/home/Newsletter';

function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <PromoBanner />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

export default Home;