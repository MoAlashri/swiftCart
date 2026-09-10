import { createContext, useContext, useState, useCallback } from "react";



const ToastContext = createContext();

function ToastProvider({children}) {
  const [toasts, setToasts] = useState([]);
    const showToast = useCallback((message, type) => {
      const id = Date.now()
      setToasts(prev => [...prev, {id, message, type}])
      setTimeout(()=> {
        setToasts(prev => prev.filter(toast => toast.id !== id))
      }, 2500)
    }, [])

  return (
    <ToastContext.Provider value= {{toasts, showToast}}>
      {children}
    </ToastContext.Provider>
  )
}


function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export  { ToastProvider, useToast };