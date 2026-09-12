import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import StarRating from './StarRating';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';


function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { id, title, price, thumbnail, discountPercentage, rating, category } = product;

  const hasDiscount = discountPercentage > 0;
  const finalPrice = hasDiscount ? price - (price * discountPercentage) / 100 : price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ id, name: title, price: finalPrice, image: thumbnail }, 1);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link
        to={`/product/${id}`}
        className="group block h-full overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {hasDiscount && (
          <Badge variant="danger" className="absolute left-2 top-2">
            -{Math.round(discountPercentage)}%
          </Badge>
        )}

        <button
          onClick={(e) => e.preventDefault()}
          aria-label="Add to wishlist"
          className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 backdrop-blur transition-colors hover:text-red-500"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-3">
        <p className="text-xs capitalize text-muted-foreground">{category}</p>
        <h3 className="mt-1 truncate text-sm font-medium text-foreground">{title}</h3>

        <div className="mt-1">
          <StarRating rating={rating} />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">${finalPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">${price.toFixed(2)}</span>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      </Link>
    </motion.div>
    
  );
}

export default ProductCard;

