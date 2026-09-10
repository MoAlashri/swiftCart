// import { useState, useEffect, useRef, useCallback } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import {
//   ShoppingCart,
//   Sun,
//   Moon,
//   Menu,
//   Search,
//   X,
//   User,
//   Heart,
//   ChevronDown,
//   Smartphone,
//   Shirt,
//   Home as HomeIcon,
//   Watch,
//   Sparkles,
//   Dumbbell,
//   Trash2,
//   ArrowRight,
// } from 'lucide-react';
// import Button from '../ui/Button';
// import Input from '../ui/Input';
// import Badge from '../ui/Badge';
// import { ThemeContext } from '../../context/ThemeContext';

// /* =========================================
//    Static data — منفصلة عن الكومبوننت عشان
//    لو زادت التصنيفات أو اللينكات منزحمش الكود
//    ========================================= */
function Navbar() {
  return (
    <div>
      navbar
    </div>
  )
}

export default Navbar

// const NAV_LINKS = [{ name: 'Home', path: '/' }];

// const SHOP_CATEGORIES = [
//   { name: 'Electronics', path: '/shop?cat=electronics', icon: Smartphone },
//   { name: 'Fashion', path: '/shop?cat=fashion', icon: Shirt },
//   { name: 'Home & Living', path: '/shop?cat=home', icon: HomeIcon },
//   { name: 'Watches', path: '/shop?cat=watches', icon: Watch },
//   { name: 'Beauty', path: '/shop?cat=beauty', icon: Sparkles },
//   { name: 'Sports', path: '/shop?cat=sports', icon: Dumbbell },
// ];

// const PROMO_MESSAGES = [
//   'Free shipping on orders over $50',
//   'New season arrivals — up to 30% off',
//   'Use code SWIFT10 for 10% off your first order',
// ];

// // Mock cart preview data — استبدلها لاحقًا ببيانات الـ cart context/API الحقيقية
// const MOCK_CART_ITEMS = [
//   { id: 1, name: 'Noise Cancelling Headphones', price: 89.0, qty: 1, image: null },
//   { id: 2, name: 'Minimal Leather Watch', price: 129.0, qty: 1, image: null },
//   { id: 3, name: 'Everyday Cotton Tee', price: 24.0, qty: 2, image: null },
// ];

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isShopOpen, setIsShopOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isDark, setIsDark] = useState(false);
//   const [isPromoVisible, setIsPromoVisible] = useState(true);
//   const [promoIndex, setPromoIndex] = useState(0);

//   const shopHoverTimeout = useRef(null);

//   /* ---------- Scroll shrink effect ---------- */
//   useEffect(() => {
//     const onScroll = () => setIsScrolled(window.scrollY > 8);
//     onScroll();
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   /* ---------- Rotating promo messages ---------- */
//   useEffect(() => {
//     const id = setInterval(() => {
//       setPromoIndex((i) => (i + 1) % PROMO_MESSAGES.length);
//     }, 4000);
//     return () => clearInterval(id);
//   }, []);

//   /* ---------- Theme toggle (self-contained; wire to ThemeContext later) ---------- */
//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', isDark);
//   }, [isDark]);

//   /* ---------- Close overlays with Escape ---------- */
//   useEffect(() => {
//     const onKeyDown = (e) => {
//       if (e.key !== 'Escape') return;
//       setIsMobileMenuOpen(false);
//       setIsSearchOpen(false);
//       setIsCartOpen(false);
//       setIsShopOpen(false);
//     };
//     window.addEventListener('keydown', onKeyDown);
//     return () => window.removeEventListener('keydown', onKeyDown);
//   }, []);

//   const closeMenu = () => setIsMobileMenuOpen(false);

//   const handleShopEnter = useCallback(() => {
//     clearTimeout(shopHoverTimeout.current);
//     setIsShopOpen(true);
//   }, []);

//   const handleShopLeave = useCallback(() => {
//     shopHoverTimeout.current = setTimeout(() => setIsShopOpen(false), 150);
//   }, []);

//   const cartCount = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.qty, 0);
//   const cartSubtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <>
//       {isPromoVisible && (
//         <PromoBar
//           message={PROMO_MESSAGES[promoIndex]}
//           onClose={() => setIsPromoVisible(false)}
//         />
//       )}

//       <header
//         className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-300 ${
//           isScrolled ? 'border-border shadow-sm' : 'border-border/40'
//         }`}
//       >
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`flex items-center justify-between gap-4 transition-[height] duration-300 ${
//               isScrolled ? 'h-14' : 'h-16'
//             }`}
//           >
//             <div className="flex items-center gap-4">
//               <MobileToggle isOpen={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen((v) => !v)} />
//               <Logo />
//             </div>

//             <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
//               {NAV_LINKS.map((link) => (
//                 <NavItem key={link.path} to={link.path}>
//                   {link.name}
//                 </NavItem>
//               ))}
//               <div
//                 className="relative"
//                 onMouseEnter={handleShopEnter}
//                 onMouseLeave={handleShopLeave}
//               >
//                 <button
//                   className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//                   onClick={() => setIsShopOpen((v) => !v)}
//                   aria-expanded={isShopOpen}
//                 >
//                   Shop
//                   <ChevronDown
//                     className={`h-3.5 w-3.5 transition-transform duration-200 ${isShopOpen ? 'rotate-180' : ''}`}
//                   />
//                 </button>
//                 {isShopOpen && <ShopMegaMenu onNavigate={() => setIsShopOpen(false)} />}
//               </div>
//             </nav>

//             <div className="flex items-center justify-end gap-1 sm:gap-2 flex-1 md:flex-none">
//               <DesktopSearch isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
//               <IconButton
//                 icon={Search}
//                 label="Search"
//                 className="lg:hidden"
//                 onClick={() => setIsSearchOpen(true)}
//               />
//               <IconButton icon={Heart} label="Wishlist" className="hidden sm:inline-flex" />
//               <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />
//               <CartMenu
//                 isOpen={isCartOpen}
//                 setIsOpen={setIsCartOpen}
//                 items={MOCK_CART_ITEMS}
//                 count={cartCount}
//                 subtotal={cartSubtotal}
//               />
//               <LoginButton />
//             </div>
//           </div>
//         </div>

//         {isMobileMenuOpen && <MobileMenu closeMenu={closeMenu} isDark={isDark} onToggleTheme={() => setIsDark((v) => !v)} />}
//       </header>

//       {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
//     </>
//   );
// }


// const PromoBar = ({ message, onClose }) => (
//   <div className="relative flex h-9 items-center justify-center bg-primary px-10 text-center text-xs font-medium text-primary-foreground">
//     <span key={message} className="animate-in fade-in duration-500">
//       {message}
//     </span>
//     <button
//       onClick={onClose}
//       aria-label="Dismiss announcement"
//       className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-primary-foreground/80 transition-colors hover:text-primary-foreground"
//     >
//       <X className="h-3.5 w-3.5" />
//     </button>
//   </div>
// );

// const Logo = () => (
//   <Link to="/" className="group flex items-center gap-1">
//     <span className="text-xl font-bold tracking-tight text-primary">
//       Swift
//       <span className="text-foreground transition-colors group-hover:text-primary">Cart</span>
//     </span>
//   </Link>
// );

// const NavItem = ({ to, children }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `relative py-1 text-sm font-medium transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-300 ${
//         isActive
//           ? 'text-primary after:w-full'
//           : 'text-muted-foreground after:w-0 hover:after:w-full'
//       }`
//     }
//   >
//     {children}
//   </NavLink>
// );

// const ShopMegaMenu = ({ onNavigate }) => (
//   <div className="absolute left-1/2 top-full z-50 mt-3 w-[420px] -translate-x-1/2 animate-in fade-in slide-in-from-top-1 duration-200">
//     <div className="overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
//       <div className="grid grid-cols-2 gap-1 p-3">
//         {SHOP_CATEGORIES.map(({ name, path, icon: Icon }) => (
//           <Link
//             key={path}
//             to={path}
//             onClick={onNavigate}
//             className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-popover-foreground transition-colors hover:bg-muted"
//           >
//             <Icon className="h-4 w-4 text-muted-foreground" />
//             {name}
//           </Link>
//         ))}
//       </div>
//       <Link
//         to="/shop"
//         onClick={onNavigate}
//         className="flex items-center justify-between border-t border-border bg-muted/50 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-muted"
//       >
//         View all products
//         <ArrowRight className="h-3.5 w-3.5" />
//       </Link>
//     </div>
//   </div>
// );

// const DesktopSearch = ({ isOpen, setIsOpen }) => (
//   <div
//     className={`relative hidden lg:flex items-center transition-all duration-300 ${
//       isOpen ? 'w-[280px]' : 'w-[200px]'
//     }`}
//   >
//     <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
//     <Input
//       type="search"
//       placeholder="Search products..."
//       onFocus={() => setIsOpen(true)}
//       onBlur={() => setIsOpen(false)}
//       className="h-9 w-full pl-9 bg-muted/50 focus:bg-background"
//     />
//   </div>
// );

// const SearchOverlay = ({ onClose }) => (
//   <div className="fixed inset-0 z-[60] lg:hidden">
//     <div className="absolute inset-0 bg-background/95 backdrop-blur animate-in fade-in duration-200" />
//     <div className="relative z-10 flex items-center gap-2 border-b border-border bg-background px-4 py-3 animate-in slide-in-from-top-2 duration-200">
//       <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
//       {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
//       <Input
//         autoFocus
//         type="search"
//         placeholder="Search products..."
//         className="h-10 flex-1 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
//       />
//       <button
//         onClick={onClose}
//         aria-label="Close search"
//         className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
//       >
//         <X className="h-5 w-5" />
//       </button>
//     </div>
//   </div>
// );

// const IconButton = ({ icon: Icon, label, className = '', onClick, children }) => (
//   <button
//     onClick={onClick}
//     aria-label={label}
//     className={`relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${className}`}
//   >
//     <Icon className="h-5 w-5" />
//     {children}
//   </button>
// );

// const ThemeToggle = ({ isDark, onToggle }) => (
//   <button
//     onClick={onToggle}
//     aria-label="Toggle theme"
//     className="relative overflow-hidden rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
//   >
//     <Sun
//       className={`h-5 w-5 transition-all duration-300 ${
//         isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
//       }`}
//     />
//     <Moon
//       className={`absolute inset-0 m-2 h-5 w-5 transition-all duration-300 ${
//         isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
//       }`}
//     />
//   </button>
// );

// const CartMenu = ({ isOpen, setIsOpen, items, count, subtotal }) => {
//   const ref = useRef(null);

//   useEffect(() => {
//     const onClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
//     };
//     document.addEventListener('mousedown', onClickOutside);
//     return () => document.removeEventListener('mousedown', onClickOutside);
//   }, [setIsOpen]);

//   return (
//     <div ref={ref} className="relative ">
//       <IconButton icon={ShoppingCart} label="Cart" onClick={() => setIsOpen((v) => !v)}>
//         {count > 0 && (
//           <Badge
//             variant="danger"
//             className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center p-0 text-[10px] "
//           >
//             {count}
//           </Badge>
//         )}
//       </IconButton>

//       {isOpen && (
//         <div className="absolute right-0 top-full z-50 mt-3 w-[340px] animate-in fade-in slide-in-from-top-1 duration-200">
//           <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lg">
//             <div className="flex items-center justify-between border-b border-border px-4 py-3">
//               <span className="text-sm font-semibold text-popover-foreground">
//                 Your cart · {count} {count === 1 ? 'item' : 'items'}
//               </span>
//             </div>

//             {items.length === 0 ? (
//               <div className="px-4 py-8 text-center text-sm text-muted-foreground">
//                 Your cart is empty.
//               </div>
//             ) : (
//               <ul className="max-h-72 divide-y divide-border overflow-y-auto">
//                 {items.map((item) => (
//                   <li key={item.id} className="flex items-center gap-3 px-4 py-3">
//                     <div className="h-12 w-12 shrink-0 rounded-md bg-muted" />
//                     <div className="min-w-0 flex-1">
//                       <p className="truncate text-sm font-medium text-popover-foreground">
//                         {item.name}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         Qty {item.qty} · ${item.price.toFixed(2)}
//                       </p>
//                     </div>
//                     <button
//                       aria-label={`Remove ${item.name}`}
//                       className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive"
//                     >
//                       <Trash2 className="h-3.5 w-3.5" />
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             <div className="border-t border-border p-4">
//               <div className="mb-3 flex items-center justify-between text-sm">
//                 <span className="text-muted-foreground">Subtotal</span>
//                 <span className="font-semibold text-popover-foreground">
//                   ${subtotal.toFixed(2)}
//                 </span>
//               </div>
//               <Link to="/cart" onClick={() => setIsOpen(false)}>
//                 <Button variant="default" className="w-full justify-center">
//                   Go to cart
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const LoginButton = () => (
//   <div className="hidden sm:flex border-l border-border/50 pl-2 ml-1">
//     <Link to="/login">
//       <Button variant="default" size="sm" className="h-9 gap-2">
//         <User className="h-4 w-4" />
//         <span>Login</span>
//       </Button>
//     </Link>
//   </div>
// );

// const MobileToggle = ({ isOpen, toggle }) => (
//   <button
//     onClick={toggle}
//     aria-label="Toggle menu"
//     className="md:hidden p-2 -ml-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors rounded-md"
//   >
//     {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//   </button>
// );

// const MobileMenu = ({ closeMenu, isDark, onToggleTheme }) => (
//   <div className="fixed inset-0 z-[60] md:hidden">
//     <div
//       className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
//       onClick={closeMenu}
//     />
//     <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-background shadow-xl animate-in slide-in-from-right duration-300">
//       <div className="flex items-center justify-between border-b border-border px-4 py-4">
//         <Logo />
//         <button
//           onClick={closeMenu}
//           aria-label="Close menu"
//           className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
//         >
//           <X className="h-5 w-5" />
//         </button>
//       </div>

//       <div className="relative border-b border-border p-4">
//         <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//         <Input
//           type="search"
//           placeholder="Search products..."
//           className="h-10 w-full pl-9 bg-muted/50"
//         />
//       </div>

//       <nav className="flex-1 overflow-y-auto px-2 py-2">
//         {NAV_LINKS.map((link) => (
//           <NavLink
//             key={link.path}
//             to={link.path}
//             onClick={closeMenu}
//             className={({ isActive }) =>
//               `block rounded-md px-3 py-3 text-base font-medium transition-colors ${
//                 isActive ? 'text-primary bg-muted' : 'text-muted-foreground hover:bg-muted'
//               }`
//             }
//           >
//             {link.name}
//           </NavLink>
//         ))}

//         <p className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
//           Shop by category
//         </p>
//         {SHOP_CATEGORIES.map(({ name, path, icon: Icon }) => (
//           <Link
//             key={path}
//             to={path}
//             onClick={closeMenu}
//             className="flex items-center gap-3 rounded-md px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-muted"
//           >
//             <Icon className="h-4 w-4" />
//             {name}
//           </Link>
//         ))}
//       </nav>

//       <div className="border-t border-border p-4 space-y-3">
//         <button
//           onClick={onToggleTheme}
//           className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
//         >
//           <span className="flex items-center gap-3">
//             {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
//             {isDark ? 'Dark mode' : 'Light mode'}
//           </span>
//           <span className="text-xs text-muted-foreground/70">Tap to switch</span>
//         </button>

//         <Link to="/login" onClick={closeMenu}>
//           <Button variant="default" className="w-full justify-center gap-2">
//             <User className="h-4 w-4" />
//             Login / Register
//           </Button>
//         </Link>
//       </div>
//     </div>
//   </div>
// );