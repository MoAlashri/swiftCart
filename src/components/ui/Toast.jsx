import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const ICON_COLORS = {
  success: 'text-success',
  error: 'text-destructive',
  info: 'text-accent',
};

function Toast({ toast, onDismiss }) {
  const Icon = ICONS[toast.type] || Info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex w-full max-w-sm items-start gap-3 rounded-lg border border-border bg-card p-3.5 shadow-sm"
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${ICON_COLORS[toast.type]}`} />

      <div className="min-w-0 flex-1">
        {toast.title && <p className="text-sm font-medium text-foreground">{toast.title}</p>}
        {toast.description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{toast.description}</p>
        )}
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export default Toast;