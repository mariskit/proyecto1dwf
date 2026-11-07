import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center px-4 py-24 sm:py-36 bg-[#0e1726] text-white">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Title matching reference screenshot */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          Descubre el <span className="text-[#00a8e8]">Universo</span>
        </h1>

        {/* Subtitle matching reference screenshot */}
        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
          Explora datos fascinantes de tu API favorita. Busca, filtra y guarda tus favoritos.
        </p>

        {/* CTA Button matching reference screenshot */}
        <div className="pt-4">
          <Link
            to="/explorar"
            className="inline-block px-7 py-3 rounded-lg bg-[#00a8e8] hover:bg-[#0096d1] text-white font-medium text-sm transition-colors shadow-sm"
          >
            Explorar ahora
          </Link>
        </div>
      </div>
    </div>
  )
}
