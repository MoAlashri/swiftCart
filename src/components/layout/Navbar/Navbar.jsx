import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Heart, Search } from 'lucide-react';
import { NAV_LINKS, PROMO_MESSAGES } from './data';
import PromoBar from './PromoBar';
import Logo from './Logo';
import NavItem from './NavItem';
import ShopMegaMenu from './ShopMegaMenu';
import DesktopSearch from './DesktopSearch';
import SearchOverlay from './SearchOverlay';
import IconButton from './IconButton';
import ThemeToggle from './ThemeToggle';
import CartMenu from './CartMenu';
import LoginButton from './LoginButton';
import MobileToggle from './MobileToggle';
import MobileMenu from './MobileMenu';

import { Link } from 'react-router-dom';
import Badge from '../../ui/Badge';
import { useWishlist } from '../../../context/WishlistContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  const [promoIndex, setPromoIndex] = useState(0);
  const { totalWishlistItems } = useWishlist();

  const shopHoverTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPromoIndex((i) => (i + 1) % PROMO_MESSAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      setIsMobileMenuOpen(false);
      setIsSearchOpen(false);
      setIsCartOpen(false);
      setIsShopOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleShopEnter = useCallback(() => {
    clearTimeout(shopHoverTimeout.current);
    setIsShopOpen(true);
  }, []);

  const handleShopLeave = useCallback(() => {
    shopHoverTimeout.current = setTimeout(() => setIsShopOpen(false), 150);
  }, []);

  return (
    <>
      {isPromoVisible && (
        <PromoBar message={PROMO_MESSAGES[promoIndex]} onClose={() => setIsPromoVisible(false)} />
      )}

      <header
        className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur transition-shadow duration-200 ${
    isScrolled ? 'shadow-sm' : ''
  }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between gap-4 transition-[height] duration-300 ${
              isScrolled ? 'h-14' : 'h-16'
            }`}
          >
            <div className="flex items-center gap-4">
              <MobileToggle isOpen={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen((v) => !v)} />
              <Logo />
            </div>

            <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavItem key={link.path} to={link.path}>
                  {link.name}
                </NavItem>
              ))}
              <div className="relative" onMouseEnter={handleShopEnter} onMouseLeave={handleShopLeave}>
                <button
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsShopOpen((v) => !v)}
                  aria-expanded={isShopOpen}
                >
                  Shop
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${isShopOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isShopOpen && <ShopMegaMenu onNavigate={() => setIsShopOpen(false)} />}
              </div>
            </nav>

            <div className="flex items-center justify-end gap-1 sm:gap-2 flex-1 md:flex-none">
              <DesktopSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
              <IconButton
                icon={Search}
                label="Search"
                className="lg:hidden"
                onClick={() => setIsSearchOpen(true)}
              />

              <Link
                to="/wishlist"
                className="relative hidden rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
              >
                <Heart className="h-5 w-5" />
                {totalWishlistItems > 0 && (
                  <Badge
                    variant="danger"
                    className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
                  >
                    {totalWishlistItems}
                  </Badge>
                )}
              </Link>

              <ThemeToggle />
              <CartMenu isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
              <LoginButton />
            </div>
          </div>
        </div>

        {isMobileMenuOpen && <MobileMenu closeMenu={closeMenu} />}
      </header>

      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}