import { X } from 'lucide-react';

function PromoBar({ message, onClose }) {
  return (
    <div className="relative flex h-9 items-center justify-center bg-accent px-10 text-center text-xs font-medium text-white">
      <span key={message} className="animate-in fade-in duration-500">
        {message}
      </span>
      <button
        onClick={onClose}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/80 transition-colors hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default PromoBar;