import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-8xl text-foreground">404</p>

        <h1 className="mt-6 font-display text-2xl text-foreground">
          Page not found
        </h1>

        <p className="mt-3 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/">
            <Button variant="primary" size="lg">
              Back to homepage
            </Button>
          </Link>
          <Link
            to="/shop"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Continue shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;