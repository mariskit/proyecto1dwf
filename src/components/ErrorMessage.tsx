import React from 'react'
import { AlertTriangle } from 'lucide-react'

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'No se pudo cargar la informacion.',
  message = 'Verifica tu conexion e intenta de nuevo.',
  onRetry,
}) => {
  return (
    <div
      role="alert"
      className="py-16 max-w-sm mx-auto flex flex-col items-center justify-center text-center px-4"
    >
      <div className="mb-3 text-amber-500">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        {title}
      </h3>
      <p className="text-xs text-slate-500 mt-1">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
