import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';


function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart();
  const { info } = useToast();


  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
        <h1 className="mt-4 text-xl font-semibold text-foreground">Your cart is empty</h1>
        <p className="mt-1 text-sm text-muted-foreground">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="mt-6">
          <Button variant="primary">Start shopping</Button>
        </Link>
      </div>
    );
  }

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">
          Cart <span className="text-muted-foreground">({totalItems})</span>
        </h1>
        <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive">
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-border bg-card shadow-sm">
          {cartItems.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center gap-4 p-4 ${i !== cartItems.length - 1 ? 'border-b border-border' : ''}`}
            >
              <Link to={`/product/${item.id}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  to={`/product/${item.id}`}
                  className="line-clamp-1 text-sm font-medium text-foreground hover:text-accent"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
              </div>

              <div className="flex h-9 shrink-0 items-center rounded-md border border-border">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-full w-8 items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-40"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="flex h-full w-8 items-center justify-center text-sm font-medium text-foreground">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                  className="flex h-full w-8 items-center justify-center text-muted-foreground hover:bg-muted"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <span className="w-16 shrink-0 text-right text-sm font-semibold text-foreground">
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              <button
                onClick={() =>{
                    removeFromCart(item.id)
                    info('Removed from cart', item.name);
                  }}
                aria-label={`Remove ${item.name}`}
                className="shrink-0 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* ملخص الطلب */}
        <div className="h-fit rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Order Summary</h2>

          <div className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-foreground">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-foreground">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span className="text-foreground">${tax.toFixed(2)}</span>
            </div>
          </div>

          {totalPrice < 50 && (
            <p className="mt-3 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
              Add <span className="font-medium text-accent">${(50 - totalPrice).toFixed(2)}</span> more for free shipping
            </p>
          )}

          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold text-foreground">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>

          <Link to="/checkout">
            <Button variant="primary" size="lg" className="mt-5 w-full">
              Proceed to checkout
            </Button>
          </Link>

          <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;