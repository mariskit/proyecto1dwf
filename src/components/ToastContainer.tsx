import React from 'react'
import { useToast } from '../context/ToastContext'
import { X } from 'lucide-react'

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div
      role="region"
      aria-label="Notificaciones"
      className="fixed top-16 right-4 sm:right-8 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map(toast => {
        let style = 'bg-slate-800 text-white border-slate-700'

        if (toast.type === 'success') {
          // Exact match to reference screenshot green pill: ✓ Rick Sanchez agregado a favoritos ✕
          style = 'bg-[#1b4332] text-[#d8f3dc] border border-[#2d6a4f]'
        } else if (toast.type === 'error') {
          style = 'bg-rose-950 text-rose-200 border border-rose-800'
        }

        return (
          <div
            key={toast.id}
            role="alert"
            aria-live="polite"
            className={`pointer-events-auto flex items-center justify-between gap-3 px-3 py-1.5 rounded-md shadow-md text-xs font-medium ${style}`}
          >
            <p className="truncate">{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="p-0.5 hover:opacity-75 transition-opacity text-current cursor-pointer"
              aria-label="Cerrar notificación"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
