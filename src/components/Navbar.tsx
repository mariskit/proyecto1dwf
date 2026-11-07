import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Compass, Sun, Moon, Menu, X } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { useTheme } from '../context/ThemeContext'

export const Navbar: React.FC = () => {
  const { favorites } = useFavorites()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-sm font-medium transition-colors ${
      isActive
        ? 'text-white border-b-2 border-white'
        : 'text-slate-300 hover:text-white'
    }`

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-slate-800 text-white font-semibold'
        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0e1726] border-b border-slate-800/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo matching reference screenshot: 🌌 Explorador */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:opacity-95 transition-opacity"
            aria-label="Explorador - Ir a inicio"
          >
            <Compass className="w-5 h-5 text-[#00a8e8]" />
            <span className="font-bold text-lg tracking-tight text-white">Explorador</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
            <NavLink to="/" end className={navLinkClass}>
              Inicio
            </NavLink>

            <NavLink to="/explorar" className={navLinkClass}>
              Explorar
            </NavLink>

            <NavLink to="/favoritos" className={navLinkClass}>
              <span className="flex items-center gap-1.5">
                Favoritos
                {favorites.length > 0 && (
                  <span
                    className="inline-flex items-center justify-center px-1.5 py-0.2 text-[11px] font-bold text-white bg-sky-500 rounded-full"
                    aria-label={`${favorites.length} favoritos`}
                  >
                    {favorites.length}
                  </span>
                )}
              </span>
            </NavLink>

            <NavLink to="/contacto" className={navLinkClass}>
              Contacto
            </NavLink>

            {/* Subtle Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-300" />
              )}
            </button>
          </nav>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menú principal"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0e1726] px-4 py-3 space-y-1">
          <NavLink to="/" end onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/explorar" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            Explorar
          </NavLink>
          <NavLink to="/favoritos" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            <span>Favoritos</span>
            {favorites.length > 0 && (
              <span className="px-1.5 py-0.2 text-[11px] font-bold text-white bg-sky-500 rounded-full">
                {favorites.length}
              </span>
            )}
          </NavLink>
          <NavLink to="/contacto" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
            Contacto
          </NavLink>
        </div>
      )}
    </header>
  )
}
