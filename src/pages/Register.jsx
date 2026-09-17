import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (form.password !== form.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    const result = await register(form);
    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setFormError(result.message);
    }
  };

  const inputClass =
    'h-11 w-full rounded-md border border-border bg-transparent px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary';

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-foreground">Create an account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Join us and start shopping.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-foreground">
                First name
              </label>
              <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-foreground">
                Last name
              </label>
              <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
              Email
            </label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-foreground">
              Username
            </label>
            <input id="username" name="username" value={form.username} onChange={handleChange} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-foreground">
                Confirm
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {formError && <p className="text-sm text-destructive">{formError}</p>}

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;