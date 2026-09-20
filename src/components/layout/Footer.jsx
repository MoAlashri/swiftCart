import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  CreditCard,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';



const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M15 3h-2a5 5 0 0 0-5 5v2H6v4h2v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.9 2h3.1l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3.1l7.3-8.4L2 2h6.4l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="M10 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
  </svg>
);



const FOOTER_COLUMNS = [
  {
    title: 'Shop',
    links: [
      { name: 'Electronics', path: '/shop?cat=electronics' },
      { name: 'Fashion', path: '/shop?cat=fashion' },
      { name: 'Home & Living', path: '/shop?cat=home' },
      { name: 'New Arrivals', path: '/shop?sort=newest' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Sustainability', path: '/sustainability' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Help center', path: '/help' },
      { name: 'Track order', path: '/track-order' },
      { name: 'Shipping & returns', path: '/shipping-returns' },
      { name: 'Contact us', path: '/contact' },
    ],
  },
];

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { name: 'Facebook', href: 'https://facebook.com', icon: FacebookIcon },
  { name: 'Twitter', href: 'https://twitter.com', icon: TwitterIcon },
  { name: 'YouTube', href: 'https://youtube.com', icon: YoutubeIcon },
];

const TRUST_BADGES = [
  { icon: Truck, label: 'Free shipping', sub: 'On orders over $50' },
  { icon: RotateCcw, label: 'Easy returns', sub: '30-day return window' },
  { icon: ShieldCheck, label: 'Secure checkout', sub: '256-bit SSL encryption' },
  { icon: CreditCard, label: 'Flexible payment', sub: 'Cards, wallets & more' },
];

const LEGAL_LINKS = [
  { name: 'Privacy policy', path: '/privacy' },
  { name: 'Terms of service', path: '/terms' },
  { name: 'Cookie settings', path: '/cookies' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitted

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('submitted');
    setEmail('');
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-border bg-background">
      <BackToTop onClick={scrollToTop} />

      <div className="border-b border-border">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
          {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon className="h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <BrandColumn />

          {FOOTER_COLUMNS.map((col) => (
            <LinkColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        <NewsletterBar
          email={email}
          setEmail={setEmail}
          status={status}
          onSubmit={handleSubscribe}
        />
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SwiftCart. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs text-muted-foreground transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}


const BrandColumn = () => (
  <div className="flex flex-col gap-4">
    <Link to="/" className="flex items-center gap-1">
      <span className="text-xl font-semibold tracking-tight text-accent">
        Swift<span className="text-foreground">Cart</span>
      </span>
    </Link>
    <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
      Everyday products, picked and priced for people who don't have time to overthink it.
    </p>

    <ul className="mt-1 space-y-2.5">
      <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
        4 El-Nasr Road, Cairo, Egypt
      </li>
      <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
        <a href="tel:+201024149146" className="transition-colors hover:text-accent">
          +201024149146
        </a>
      </li>
      <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
        <a href="mailto:support@swiftcart.com" className="transition-colors hover:text-accent">
          support@swiftcart.com
        </a>
      </li>
    </ul>
  </div>
);

const LinkColumn = ({ title, links }) => (
  <div>
    <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.path}>
          <Link
            to={link.path}
            className="text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const NewsletterBar = ({ email, setEmail, status, onSubmit }) => (
  <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-lg border border-border bg-card p-6 shadow-sm sm:flex-row sm:items-center">
    <div>
      <h3 className="text-sm font-semibold text-foreground">Get 10% off your first order</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Product drops and offers, once or twice a month — no spam.
      </p>
    </div>

    {status === 'submitted' ? (
      <p className="text-sm font-medium text-accent">You're in — check your inbox to confirm.</p>
    ) : (
      <form onSubmit={onSubmit} className="flex w-full max-w-sm gap-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-10 bg-background"
        />
        <Button type="submit" variant="primary" className="h-10 shrink-0">
          Subscribe
        </Button>
      </form>
    )}
  </div>
);

const SocialLinks = () => (
  <div className="flex items-center gap-1.5">
    {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
      <a
        key={name}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Icon className="h-4 w-4" />
      </a>
    ))}
  </div>
);

const BackToTop = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Back to top"
    className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-accent"
  >
    <ArrowUp className="h-4 w-4" />
  </button>
);