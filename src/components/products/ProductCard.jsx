import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import Button from '../ui/Button';
import StarRating from './StarRating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { id, title, price, thumbnail, images, discountPercentage, rating, category } = product;
const { isInWishlist, toggleWishlist } = useWishlist();
const { success } = useToast();
const isWishlisted = isInWishlist(id);  const [justAdded, setJustAdded] = useState(false);

  const hasDiscount = discountPercentage > 0;
  const finalPrice = hasDiscount ? price - (price * discountPercentage) / 100 : price;
  const secondImage = images?.find((img) => img !== thumbnail);

    const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ id, name: title, price: finalPrice, image: thumbnail }, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
    success('Added to cart', title);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    const wasWishlisted = isInWishlist(id);
    toggleWishlist(product);
    success(wasWishlisted ? 'Removed from wishlist' : 'Added to wishlist', title);
  };
  
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="h-full">
      <Link
        to={`/product/${id}`}
          className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              secondImage ? 'group-hover:opacity-0' : ''
            }`}
          />
          {secondImage && (
            <img
              src={secondImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}

          {hasDiscount && (
            <span className="absolute left-2 top-2 rounded-sm bg-accent px-2 py-0.5 text-xs font-medium text-white">
              -{Math.round(discountPercentage)}%
            </span>
          )}

          <button
            onClick={handleWishlistToggle}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isWishlisted}
            className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 backdrop-blur transition-colors hover:text-red-500"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'
              }`}
            />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-3">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{category}</p>

          <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-medium leading-snug text-foreground">
            {title}
          </h3>

          <div className="mt-1.5">
            <StarRating rating={rating} />
          </div>

          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-foreground">${finalPrice.toFixed(2)}</span>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through">${price.toFixed(2)}</span>
              )}
            </div>

            <Button
              variant={justAdded ? 'primary' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="cart"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;