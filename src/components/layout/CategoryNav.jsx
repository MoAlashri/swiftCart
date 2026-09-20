import { Link, useLocation } from 'react-router-dom';
import { SHOP_CATEGORIES } from './Navbar/data';

function CategoryNav() {
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const items = [{ name: 'All Categories', path: '/shop' }, ...SHOP_CATEGORIES];

  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-width:none [&::-webkit-scrollbar]:hidden justify-around">
          {items.map(({ name, path, icon: Icon }) => {
            const isActive = currentPath === path;

            return (
              <Link
                key={path}
                to={path}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default CategoryNav;