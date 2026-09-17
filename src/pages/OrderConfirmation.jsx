import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

function OrderConfirmation() {
  const [order, setOrder] = useState(undefined); // undefined = لسه بنقرا

  useEffect(() => {
    const saved = sessionStorage.getItem('lastOrder');
    setOrder(saved ? JSON.parse(saved) : null);
  }, []);

  if (order === undefined) return null; // تجنب flash قبل ما نقرا sessionStorage
  if (order === null) return <Navigate to="/" replace />;

  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <CheckCircle2 className="h-14 w-14 text-success" />
      </motion.div>

      <h1 className="mt-5 text-2xl font-semibold text-foreground">Order confirmed</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Thanks{order.shippingAddress.fullName ? `, ${order.shippingAddress.fullName.split(' ')[0]}` : ''}! We've received your order.
      </p>

      <div className="mt-8 w-full max-w-md rounded-lg border border-border bg-card p-5 text-left shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Order number</span>
          <span className="text-sm font-semibold text-foreground">{order.id}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-sm font-semibold text-foreground">${order.total.toFixed(2)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Shipping to</span>
          <span className="max-w-[60%] truncate text-sm text-foreground">
            {order.shippingAddress.city}, {order.shippingAddress.country}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          {order.items.length} {order.items.length === 1 ? 'item' : 'items'} · arriving in 3-5 business days
        </div>
      </div>

      <Link to="/shop" className="mt-8">
        <Button variant="primary">Continue shopping</Button>
      </Link>
    </div>
  );
}

export default OrderConfirmation;