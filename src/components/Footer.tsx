import React from 'react'
import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Compass className="w-4 h-4 text-sky-500" />
            <span>Explorador</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-sky-500 transition-colors">
              Inicio
            </Link>
            <Link to="/explorar" className="hover:text-sky-500 transition-colors">
              Explorar
            </Link>
            <Link to="/favoritos" className="hover:text-sky-500 transition-colors">
              Favoritos
            </Link>
            <Link to="/contacto" className="hover:text-sky-500 transition-colors">
              Contacto
            </Link>
          </div>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Explorador.
          </p>

        </div>
      </div>
    </footer>
  )
}
