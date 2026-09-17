import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Check, ChevronRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import StarRating from '../components/products/StarRating';
import ImageGallery from '../components/products/ImageGallery';
import QuantitySelector from '../components/products/QuantitySelector';
import ProductCard from '../components/products/ProductCard';
import ReviewsSection from '../components/products/ReviewsSection';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';



function ProductDetails() {
  const { id } = useParams();

  const { data: product, isLoading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  const { data: relatedData } = useFetch(
    product ? `https://dummyjson.com/products/category/${product.category}?limit=5` : null
  );

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success } = useToast();


  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-11 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-sm text-destructive">Couldn't load this product.</p>
        <Link to="/shop" className="mt-4 inline-block text-sm text-primary underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const { title, price, discountPercentage, rating, category, description, stock, brand, images, reviews } = product;

  const hasDiscount = discountPercentage > 0;
  const finalPrice = hasDiscount ? price - (price * discountPercentage) / 100 : price;
  const inStock = stock > 0;
  const isWishlisted = isInWishlist(product.id);

  const relatedProducts = (relatedData?.products || []).filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
  addToCart({ id: product.id, name: title, price: finalPrice, image: images?.[0] }, quantity);
  setJustAdded(true);
  setTimeout(() => setJustAdded(false), 1500);
  success('Added to cart', `${quantity} × ${title}`);
};

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/shop?cat=${category}`} className="capitalize hover:text-foreground">{category}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate text-foreground">{title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <ImageGallery images={images} title={title} />

        <div>
          {brand && <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{brand}</p>}
          <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>

          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={rating} />
            <span className="text-sm text-muted-foreground">·</span>
            <span className={`text-sm font-medium ${inStock ? 'text-green-600' : 'text-destructive'}`}>
              {inStock ? `${stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">${finalPrice.toFixed(2)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">${price.toFixed(2)}</span>
                <Badge variant="danger">-{Math.round(discountPercentage)}%</Badge>
              </>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{description}</p>

          <div className="mt-6 flex items-center gap-4">
            <QuantitySelector quantity={quantity} onChange={setQuantity} max={stock} />

            <Button
              variant="primary"
              size="lg"
              className="flex-1 gap-2"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" /> Add to cart
                </>
              )}
            </Button>

            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border hover:bg-muted"
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Free shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">30-day returns</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      <ReviewsSection reviews={reviews} />

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-xl font-bold text-foreground">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;