import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/ui/Button';

function Wishlist() {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
        <Heart className="h-12 w-12 text-muted-foreground/40" />
        <h1 className="mt-4 text-xl font-bold text-foreground">Your wishlist is empty</h1>
        <p className="mt-1 text-sm text-muted-foreground">Save items you love to find them here later.</p>
        <Link to="/shop" className="mt-6">
          <Button variant="primary">Browse products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-foreground">Wishlist</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;