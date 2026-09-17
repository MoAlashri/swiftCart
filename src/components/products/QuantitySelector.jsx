import { Minus, Plus } from 'lucide-react';

function QuantitySelector({ quantity, onChange, max = 99 }) {
  const decrease = () => onChange(Math.max(1, quantity - 1));
  const increase = () => onChange(Math.min(max, quantity + 1));

  return (
    <div className="flex h-11 w-fit items-center rounded-md border border-border">
      <button
        onClick={decrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex h-full w-10 items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-40"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="flex h-full w-12 items-center justify-center text-sm font-medium text-foreground">
        {quantity}
      </span>
      <button
        onClick={increase}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="flex h-full w-10 items-center justify-center text-muted-foreground hover:bg-muted disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default QuantitySelector;