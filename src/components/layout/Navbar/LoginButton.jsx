import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import Button from '../../ui/Button';
import { useAuth } from '../../../context/AuthContext';

function LoginButton() {
  const { user, isAuthenticated, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="hidden items-center gap-2 border-l border-border/50 pl-2 ml-1 sm:flex">
        <img
          src={user.image}
          alt={user.username}
          className="h-8 w-8 rounded-full object-cover"
        />
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex border-l border-border/50 pl-2 ml-1">
      <Link to="/login">
        <Button variant="primary" size="sm" className="h-9 gap-2">
          <User className="h-4 w-4" />
          <span>Login</span>
        </Button>
      </Link>
    </div>
  );
}

export default LoginButton;