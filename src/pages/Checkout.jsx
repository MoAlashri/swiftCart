import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Lock, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { useState } from 'react';
import { useToast } from '../context/ToastContext';


const inputClass =
  'h-11 w-full rounded-md border border-border bg-transparent px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent';
const labelClass = 'mb-1.5 block text-sm font-medium text-foreground';

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    fullName: user ? `${user.firstName} ${user.lastName}`.trim() : '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [errors, setErrors] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  if (cartItems.length === 0 && !orderPlaced) {
    return <Navigate to="/cart" replace />;
  }

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    const required = ['fullName', 'email', 'address', 'city', 'postalCode', 'country', 'cardNumber', 'cardExpiry', 'cardCvc'];
    required.forEach((field) => {
      if (!form[field].trim()) next[field] = 'Required';
    });
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) next.email = 'Invalid email';
    if (form.cardNumber && form.cardNumber.replace(/\s/g, '').length < 12) next.cardNumber = 'Invalid card number';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please fix the highlighted fields', 'error');
      return;
    }

    setIsPlacingOrder(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const orderId = `SC-${Date.now().toString().slice(-8)}`;
    const order = {
      id: orderId,
      items: cartItems,
      total: orderTotal,
      shippingAddress: { fullName: form.fullName, address: form.address, city: form.city, country: form.country },
      placedAt: new Date().toISOString(),
    };

    sessionStorage.setItem('lastOrder', JSON.stringify(order));

    setOrderPlaced(true);
    showToast(`Order ${orderId} confirmed 🎉`);
    navigate('/order-confirmation', { replace: true });
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-foreground">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Shipping */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <h2 className="text-base font-semibold text-foreground">Shipping information</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="fullName">Full name</label>
                <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} className={inputClass} />
                {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="address">Address</label>
                <input id="address" name="address" value={form.address} onChange={handleChange} className={inputClass} />
                {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="city">City</label>
                <input id="city" name="city" value={form.city} onChange={handleChange} className={inputClass} />
                {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="postalCode">Postal code</label>
                <input id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} className={inputClass} />
                {errors.postalCode && <p className="mt-1 text-xs text-destructive">{errors.postalCode}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="country">Country</label>
                <input id="country" name="country" value={form.country} onChange={handleChange} className={inputClass} />
                {errors.country && <p className="mt-1 text-xs text-destructive">{errors.country}</p>}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-base font-semibold text-foreground">Payment</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">This is a demo store — no real payment is processed.</p>

            <div className="mt-4 grid gap-4">
              <div>
                <label className={labelClass} htmlFor="cardNumber">Card number</label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.cardNumber && <p className="mt-1 text-xs text-destructive">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="cardExpiry">Expiry</label>
                  <input
                    id="cardExpiry"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={form.cardExpiry}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  {errors.cardExpiry && <p className="mt-1 text-xs text-destructive">{errors.cardExpiry}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="cardCvc">CVC</label>
                  <input
                    id="cardCvc"
                    name="cardCvc"
                    placeholder="123"
                    value={form.cardCvc}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  {errors.cardCvc && <p className="mt-1 text-xs text-destructive">{errors.cardCvc}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Order Summary</h2>

          <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                  <img src={item.thumbnail} alt={item.title} className="h-full w-full object-contain p-1" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                    {item.quantity}
                  </span>
                </div>
                <p className="line-clamp-2 flex-1 text-xs text-foreground">{item.title}</p>
                <span className="shrink-0 text-xs font-medium text-foreground">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
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

          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold text-foreground">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>

          <Button type="submit" variant="primary" size="lg" className="mt-5 w-full gap-2" disabled={isPlacingOrder}>
            <Lock className="h-4 w-4" />
            {isPlacingOrder ? 'Placing order...' : `Pay $${orderTotal.toFixed(2)}`}
          </Button>

          <Link to="/cart" className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground">
            Back to cart
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Checkout;