import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Button from '../components/ui/Button';

function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
      <Compass className="h-12 w-12 text-muted-foreground/40" />
      <h1 className="mt-4 text-4xl font-semibold text-foreground">404</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We couldn't find the page you're looking for.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/">
          <Button variant="primary">Back to home</Button>
        </Link>
        <Link to="/shop">
          <Button variant="secondary">Browse shop</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;