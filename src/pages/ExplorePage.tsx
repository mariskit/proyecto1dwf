import React, { useState, useEffect, useCallback } from 'react'
import type { Character, ApiResponse, StatusFilter } from '../types/character'
import { CharacterCard } from '../components/CharacterCard'
import { SearchAndFilter } from '../components/SearchAndFilter'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { EmptyState } from '../components/EmptyState'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const ExplorePage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  // Visible UI States
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCharacters = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      params.append('page', currentPage.toString())
      if (activeSearch.trim()) {
        params.append('name', activeSearch.trim())
      }
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }

      const url = `https://rickandmortyapi.com/api/character/?${params.toString()}`
      const response = await fetch(url)

      if (response.status === 404) {
        // Rick & Morty API returns 404 when no results match the filter
        setCharacters([])
        setTotalCount(0)
        setTotalPages(1)
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      setCharacters(data.results || [])
      setTotalCount(data.info.count)
      setTotalPages(data.info.pages)
    } catch (err) {
      console.error('Error fetching characters:', err)
      setError('No se pudo cargar la información. Verifica tu conexión e intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, activeSearch, statusFilter])

  useEffect(() => {
    fetchCharacters()
  }, [fetchCharacters])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    setActiveSearch(searchTerm)
  }

  const handleStatusChange = (status: StatusFilter) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setActiveSearch('')
    setStatusFilter('all')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navy Section matching reference screenshot */}
      <section className="bg-[#0e1726] text-white py-12 px-4 border-b border-slate-800" aria-labelledby="explore-title">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h1
            id="explore-title"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Explorar <span className="text-[#00a8e8]">Personajes</span>
          </h1>
          <p className="text-sm text-slate-300">
            Datos obtenidos en tiempo real desde la API
          </p>

          <div className="pt-4">
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={handleStatusChange}
              onSearchSubmit={handleSearchSubmit}
              onReset={handleResetFilters}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Results Header */}
        {!isLoading && !error && characters.length > 0 && (
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Resultados</h2>
            <span className="text-xs text-slate-500">
              Mostrando {characters.length} de {totalCount} resultados
            </span>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingSpinner message="Cargando datos..." />}

        {/* Error State */}
        {!isLoading && error && (
          <ErrorMessage
            title="No se pudo cargar la información."
            message="Verifica tu conexión e intenta de nuevo."
            onRetry={fetchCharacters}
          />
        )}

        {/* Empty State */}
        {!isLoading && !error && characters.length === 0 && (
          <EmptyState
            iconType="search"
            title="No se encontraron personajes"
            description="Intenta con otros términos de búsqueda."
            actionLabel="Limpiar filtros"
            onActionClick={handleResetFilters}
          />
        )}

        {/* Characters Grid matching reference screenshot */}
        {!isLoading && !error && characters.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map(character => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && totalPages > 1 && (
          <nav
            aria-label="Paginación"
            className="flex items-center justify-center gap-2 pt-6"
          >
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-3.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            <span className="text-xs text-slate-600 dark:text-slate-400 px-3">
              Página {currentPage} de {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-3.5 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </nav>
        )}
      </div>
    </div>
  )
}
