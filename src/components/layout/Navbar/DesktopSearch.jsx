import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Input from '../../ui/Input';

function DesktopSearch({ isOpen, setIsOpen }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative hidden lg:flex items-center transition-all duration-300 ${
        isOpen ? 'w-70' : 'w-50'
      }`}
    >
      <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="h-9 w-full pl-9 bg-muted/50 focus:bg-background"
      />
    </form>
  );
}

export default DesktopSearch;