import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SHOP_CATEGORIES } from './data';

function ShopMegaMenu({ onNavigate }) {
  return (
    <div className="absolute left-1/2 top-full z-50 mt-3 w-[420px] -translate-x-1/2 animate-in fade-in slide-in-from-top-1 duration-200">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="grid grid-cols-2 gap-1 p-3">
          {SHOP_CATEGORIES.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-popover-foreground transition-colors hover:bg-muted"
            >
              <Icon className="h-4 w-4 text-muted-foreground" />
              {name}
            </Link>
          ))}
        </div>
        <Link
          to="/shop"
          onClick={onNavigate}
          className="flex items-center justify-between border-t border-border bg-muted/50 px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-muted"
        >
          View all products
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default ShopMegaMenu;
