import { Search } from 'lucide-react';
import Input from '../../ui/Input';

function DesktopSearch({ isOpen, setIsOpen }) {
  return (
    <div
      className={`relative hidden lg:flex items-center transition-all duration-300 ${
        isOpen ? 'w-70' : 'w-50'
      }`}
    >
      <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder="Search products..."
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="h-9 w-full pl-9 bg-muted/50 focus:bg-background"
      />
    </div>
  );
}

export default DesktopSearch;