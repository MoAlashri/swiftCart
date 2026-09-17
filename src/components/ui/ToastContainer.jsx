import { AnimatePresence } from 'framer-motion';
import Toast from './Toast';

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed top-4 right-4 z-100 flex flex-col gap-2 sm:top-20">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;