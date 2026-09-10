import { useToast } from '../../context/useToast'

function Toast() {
  const { toasts } = useToast() // دلوقتي array مش قيمة واحدة

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const isError = toast.type === 'error'
        return (
          <div
            key={toast.id}
            className={`px-5 py-3 rounded-lg shadow-lg text-white font-medium
              ${isError ? 'bg-danger' : 'bg-primary'}`}
          >
            {toast.message}
          </div>
        )
      })}
    </div>
  )
}

export default Toast