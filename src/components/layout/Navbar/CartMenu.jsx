import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';
import IconButton from './IconButton';

function CartMenu({ isOpen, setIsOpen }) {
  const { cartItems, totalItems, totalPrice, removeFromCart } = useCart();
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [setIsOpen]);

  return (
    <div ref={ref} className="relative">
      <IconButton icon={ShoppingCart} label="Cart" onClick={() => setIsOpen((v) => !v)}>
        {totalItems > 0 && (
          <Badge
            variant="danger"
            className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
          >
            {totalItems}
          </Badge>
        )}
      </IconButton>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-85 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lg">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold text-popover-foreground">
                Your cart · {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                Your cart is empty.
              </div>
            ) : (
              <ul className="max-h-72 divide-y divide-border overflow-y-auto">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="h-12 w-12 shrink-0 rounded-md bg-muted overflow-hidden">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-popover-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty {item.quantity} · ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-border p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-popover-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Link to="/cart" onClick={() => setIsOpen(false)}>
                <Button variant="default" className="w-full justify-center">
                  Go to cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartMenu;