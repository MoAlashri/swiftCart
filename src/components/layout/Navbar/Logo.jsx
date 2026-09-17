import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-1">
    <span className="text-xl font-semibold tracking-tight text-accent">
      Swift
      <span className="text-foreground transition-colors">Cart</span>
    </span>
    </Link>
  );
}

export default Logo;