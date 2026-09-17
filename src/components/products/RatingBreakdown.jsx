import { Star } from 'lucide-react';

function RatingBreakdown({ reviews }) {
  const total = reviews.length;
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  const average = total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="flex shrink-0 flex-col items-center gap-1 sm:w-32">
        <span className="text-4xl font-bold text-foreground">{average.toFixed(1)}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(average) ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-muted-foreground/30'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{total} reviews</span>
      </div>

      <div className="flex-1 space-y-1.5">
        {counts.map(({ star, count }) => {
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-3">{star}</span>
              <Star className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400" />
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-yellow-400" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-6 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RatingBreakdown;