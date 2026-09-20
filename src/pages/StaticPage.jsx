import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { STATIC_PAGES } from '../data/staticPagesContent';

function StaticPage({ slug }) {
  const page = STATIC_PAGES[slug];

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-sm text-muted-foreground">This page doesn't exist yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{page.title}</span>
      </nav>

      <h1 className="text-2xl font-semibold text-foreground">{page.title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{page.intro}</p>

      {page.sections.length > 0 && (
        <div className="mt-8 space-y-6">
          {page.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-base font-semibold text-foreground">{section.heading}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StaticPage;