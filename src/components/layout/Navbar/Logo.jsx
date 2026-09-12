import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-1">
      <span className="text-xl font-bold tracking-tight text-primary">
        Swift
        <span className="text-foreground transition-colors group-hover:text-primary">Cart</span>
      </span>
    </Link>
  );
}

export default Logo;