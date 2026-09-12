import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import Button from '../../ui/Button';

function LoginButton() {
  return (
    <div className="hidden sm:flex border-l border-border/50 pl-2 ml-1">
      <Link to="/login">
        <Button variant="default" size="sm" className="h-9 gap-2">
          <User className="h-4 w-4" />
          <span>Login</span>
        </Button>
      </Link>
    </div>
  );
}

export default LoginButton;