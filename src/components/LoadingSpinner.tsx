import React from 'react'

interface LoadingSpinnerProps {
  message?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando datos...',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="py-16 sm:py-24 flex flex-col items-center justify-center gap-4 text-center"
    >
      {/* Cyan dual-ring circular spinner matching reference screenshot */}
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-4 border-sky-400/20 border-t-sky-400 animate-spin" />
      </div>
      <p className="text-sm font-medium text-slate-400 tracking-wide">{message}</p>
      <span className="sr-only">Cargando contenido</span>
    </div>
  )
}

