import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';

const BANNERS = [
  {
    title: 'Summer Sale',
    subtitle: 'Up to 50% off',
    href: '/shop',
    tone: 'success',
  },
  {
    title: 'Top Brands',
    subtitle: 'Best deals of the week',
    href: '/shop',
    tone: 'accent',
  },
];

const TONE_STYLES = {
  success: 'bg-success/10',
  accent: 'bg-accent/10',
};

function PromoBanners() {
  return (
    <section className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {BANNERS.map((banner) => (
          <div
            key={banner.title}
            className={`flex items-center justify-between rounded-lg border border-border p-6 shadow-sm ${TONE_STYLES[banner.tone]}`}
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground">{banner.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{banner.subtitle}</p>
              <Link to={banner.href} className="mt-4 inline-block">
                <Button variant="secondary" size="sm" className="gap-1.5">
                  Shop now <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PromoBanners;