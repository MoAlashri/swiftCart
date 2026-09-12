import { Search, X } from 'lucide-react';
import Input from '../../ui/Input';

function SearchOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 z-60 lg:hidden">
      <div className="absolute inset-0 bg-background/95 backdrop-blur animate-in fade-in duration-200" />
      <div className="relative z-10 flex items-center gap-2 border-b border-border bg-background px-4 py-3 animate-in slide-in-from-top-2 duration-200">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <Input
          autoFocus
          type="search"
          placeholder="Search products..."
          className="h-10 flex-1 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
        />
        <button
          onClick={onClose}
          aria-label="Close search"
          className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default SearchOverlay;