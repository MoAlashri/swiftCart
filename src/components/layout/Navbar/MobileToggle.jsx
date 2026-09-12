import { Menu, X } from 'lucide-react';

function MobileToggle({ isOpen, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle menu"
      className="md:hidden p-2 -ml-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors rounded-md"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}

export default MobileToggle;