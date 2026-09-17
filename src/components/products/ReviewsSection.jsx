import { useState } from 'react';
import { Star } from 'lucide-react';
import RatingBreakdown from './RatingBreakdown';

const SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'highest', label: 'Highest Rated' },
  { value: 'lowest', label: 'Lowest Rated' },
];

function ReviewCard({ review }) {
  const initials = review.reviewerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const date = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="border-b border-border py-5 last:border-0">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <span className="text-sm font-medium text-foreground">{review.reviewerName}</span>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <div className="mt-1 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-muted-foreground/30'
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewsSection({ reviews = [] }) {
  const [sort, setSort] = useState('recent');
  const [visibleCount, setVisibleCount] = useState(4);

  if (reviews.length === 0) {
    return (
      <section className="mt-16 border-t border-border pt-10">
        <h2 className="text-xl font-bold text-foreground">Reviews</h2>
        <p className="mt-3 text-sm text-muted-foreground">No reviews yet for this product.</p>
      </section>
    );
  }

  const sorted = [...reviews].sort((a, b) => {
    if (sort === 'highest') return b.rating - a.rating;
    if (sort === 'lowest') return a.rating - b.rating;
    return new Date(b.date) - new Date(a.date);
  });

  const visibleReviews = sorted.slice(0, visibleCount);

  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="text-xl font-bold text-foreground">Reviews</h2>

      <div className="mt-6">
        <RatingBreakdown reviews={reviews} />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-9 rounded-md border border-border bg-transparent px-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-2">
        {visibleReviews.map((review, i) => (
          <ReviewCard key={`${review.reviewerEmail}-${i}`} review={review} />
        ))}
      </div>

      {visibleCount < sorted.length && (
        <button
          onClick={() => setVisibleCount((c) => c + 4)}
          className="mt-4 text-sm font-medium text-accent hover:underline"
        >
          Show more reviews
        </button>         
      )}
    </section>
  );
}

export default ReviewsSection;