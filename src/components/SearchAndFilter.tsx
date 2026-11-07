import React from 'react'
import { RotateCcw } from 'lucide-react'
import type { StatusFilter } from '../types/character'

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: StatusFilter
  onStatusChange: (status: StatusFilter) => void
  onSearchSubmit: (e: React.FormEvent) => void
  onReset: () => void
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onSearchSubmit,
  onReset,
}) => {
  return (
    <form
      onSubmit={onSearchSubmit}
      role="search"
      aria-label="Filtro y búsqueda de personajes"
      className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
    >
      {/* Search Input & Button grouped */}
      <div className="flex flex-1 items-stretch rounded-md overflow-hidden shadow-sm">
        <label htmlFor="search-character" className="sr-only">
          Buscar personaje
        </label>
        <input
          id="search-character"
          type="text"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Buscar personaje..."
          className="flex-1 px-3.5 py-2 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-[#00a8e8] hover:bg-[#0096d1] text-white text-sm font-medium transition-colors cursor-pointer"
        >
          Buscar
        </button>
      </div>

      {/* Status Filter Dropdown */}
      <div className="relative min-w-[160px]">
        <label htmlFor="status-select" className="sr-only">
          Filtrar por estado
        </label>
        <select
          id="status-select"
          value={statusFilter}
          onChange={e => onStatusChange(e.target.value as StatusFilter)}
          className="w-full px-3 py-2 bg-white text-slate-800 text-sm rounded-md shadow-sm focus:outline-none appearance-none cursor-pointer pr-8"
        >
          <option value="all">Todos los estados</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-500">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {/* Reset button if search or filter active */}
      {(searchTerm || statusFilter !== 'all') && (
        <button
          type="button"
          onClick={onReset}
          aria-label="Limpiar filtros de búsqueda"
          title="Limpiar filtros"
          className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors flex items-center justify-center shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}
    </form>
  )
}
