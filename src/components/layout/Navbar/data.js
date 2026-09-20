// import { path } from 'framer-motion/client';
import { Smartphone, Shirt, Home as HomeIcon, Watch, Sparkles, Dumbbell } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  {name: "Shop", path: "shop"}
];

  export const SHOP_CATEGORIES = [
  { name: 'Electronics', path: '/shop?cat=smartphones', icon: Smartphone },
  { name: 'Fashion', path: '/shop?cat=mens-shirts', icon: Shirt },
  { name: 'Home & Living', path: '/shop?cat=furniture', icon: HomeIcon },
  { name: 'Watches', path: '/shop?cat=mens-watches', icon: Watch },
  { name: 'Beauty', path: '/shop?cat=beauty', icon: Sparkles },
  { name: 'Sports', path: '/shop?cat=sports-accessories', icon: Dumbbell },
];

export const PROMO_MESSAGES = [
  'Free shipping on orders over $50',
  'New season arrivals — up to 30% off',
  'Use code SWIFT10 for 10% off your first order',
];