import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

function PromoBanner() {
  return (
    <section className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-primary px-6 py-8 text-center text-primary-foreground sm:flex-row sm:text-left">
        <div>
          <h3 className="text-xl font-bold">Get 20% off your first order</h3>
          <p className="mt-1 text-sm text-primary-foreground/80">
            Use code <span className="font-semibold">WELCOME20</span> at checkout
          </p>
        </div>
        <Link to="/shop">
          <Button variant="secondary" className="gap-2">
            Shop Deals <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default PromoBanner;