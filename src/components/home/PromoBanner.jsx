import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

function PromoBanner() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-border bg-card px-6 py-8 text-center shadow-sm sm:flex-row sm:text-left">
  <div>
    <h3 className="text-xl font-semibold text-foreground">Get 20% off your first order</h3>
    <p className="mt-1 text-sm text-muted-foreground">
      Use code <span className="font-semibold text-accent">WELCOME20</span> at checkout
    </p>
  </div>
  <Link to="/shop">
    <Button variant="primary" className="gap-2">
      Shop Deals <ArrowRight className="h-4 w-4" />
    </Button>
  </Link>
</div>
  );
}

export default PromoBanner;