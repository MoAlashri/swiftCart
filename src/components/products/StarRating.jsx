import { Star } from 'lucide-react';

function StarRating({ rating = 0, size = 'sm' }) {
  const sizeClass = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const fullStars = Math.round(rating);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < fullStars ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-muted-foreground/40'
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export default StarRating;