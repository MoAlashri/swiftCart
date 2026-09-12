import { Smartphone, Shirt, Home as HomeIcon, Watch, Sparkles, Dumbbell } from 'lucide-react';

export const NAV_LINKS = [{ name: 'Home', path: '/' }];

export const SHOP_CATEGORIES = [
  { name: 'Electronics', path: '/shop?cat=electronics', icon: Smartphone },
  { name: 'Fashion', path: '/shop?cat=fashion', icon: Shirt },
  { name: 'Home & Living', path: '/shop?cat=home', icon: HomeIcon },
  { name: 'Watches', path: '/shop?cat=watches', icon: Watch },
  { name: 'Beauty', path: '/shop?cat=beauty', icon: Sparkles },
  { name: 'Sports', path: '/shop?cat=sports', icon: Dumbbell },
];

export const PROMO_MESSAGES = [
  'Free shipping on orders over $50',
  'New season arrivals — up to 30% off',
  'Use code SWIFT10 for 10% off your first order',
];