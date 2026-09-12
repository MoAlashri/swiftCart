import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: وصّلها بـ API حقيقي لاحقًا
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-xl font-bold text-foreground">Stay in the loop</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Subscribe to get updates on new arrivals and exclusive offers.
        </p>

        {submitted ? (
          <p className="mt-4 text-sm font-medium text-primary">Thanks for subscribing! 🎉</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1"
            />
            <Button type="submit" variant="default">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Newsletter;