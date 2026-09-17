import { NavLink, Link } from 'react-router-dom';
import { X, Search, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { NAV_LINKS, SHOP_CATEGORIES } from './data';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Logo from './Logo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MobileMenu({ closeMenu }) {
 const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
    closeMenu();
  };

  return (
    <div className="fixed inset-0 z-60 md:hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={closeMenu}
      />
      <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-background shadow-xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <Logo />
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative border-b border-border p-4">
        <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="h-10 w-full pl-9 bg-muted/50"
        />
      </form>

        <nav className="flex-1 overflow-y-auto px-2 py-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block rounded-md px-3 py-3 text-base font-medium transition-colors ${
                  isActive ? 'text-primary bg-muted' : 'text-muted-foreground hover:bg-muted'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <p className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
            Shop by category
          </p>
          {SHOP_CATEGORIES.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-muted"
            >
              <Icon className="h-4 w-4" />
              {name}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4 space-y-3">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            <span className="flex items-center gap-3">
              {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {isDark ? 'Dark mode' : 'Light mode'}
            </span>
            <span className="text-xs text-muted-foreground/70">Tap to switch</span>
          </button>

          <Link to="/login" onClick={closeMenu}>
            <Button variant="default" className="w-full justify-center gap-2">
              <User className="h-4 w-4" />
              Login / Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;