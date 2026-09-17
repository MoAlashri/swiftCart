import { createContext, useContext, useState, useCallback, useRef } from 'react';
import ToastContainer from '../components/ui/ToastContainer';

const ToastContext = createContext();

const DEFAULT_DURATION = 3500;

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef(new Map());

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    ({ type = 'info', title, description, duration = DEFAULT_DURATION }) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, type, title, description }]);

      const timeoutId = setTimeout(() => dismissToast(id), duration);
      timeoutsRef.current.set(id, timeoutId);

      return id;
    },
    [dismissToast]
  );

  // اختصارات سريعة
  const success = useCallback((title, description) => showToast({ type: 'success', title, description }), [showToast]);
  const error = useCallback((title, description) => showToast({ type: 'error', title, description }), [showToast]);
  const info = useCallback((title, description) => showToast({ type: 'info', title, description }), [showToast]);

  const value = { showToast, dismissToast, success, error, info };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ToastProvider, useToast };