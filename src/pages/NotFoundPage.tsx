import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-16">
      
      {/* 404 matching reference screenshot */}
      <h1 className="text-7xl sm:text-8xl font-black text-[#00a8e8] tracking-tight">
        404
      </h1>

      {/* Subtitle */}
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-3">
        Pagina no encontrada
      </h2>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1.5">
        La ruta que buscas no existe en esta aplicacion.
      </p>

      {/* Return button */}
      <div className="mt-6">
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-md bg-[#00a8e8] hover:bg-[#0096d1] text-white text-sm font-medium transition-colors shadow-xs"
        >
          Volver al inicio
        </Link>
      </div>

    </div>
  )
}
