import React from 'react'
import { useFavorites } from '../context/FavoritesContext'
import { CharacterCard } from '../components/CharacterCard'
import { EmptyState } from '../components/EmptyState'

export const FavoritesPage: React.FC = () => {
  const { favorites, modalMode, setModalMode } = useFavorites()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header matching reference screenshot */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Mis Favoritos
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {favorites.length} {favorites.length === 1 ? 'item guardado' : 'items guardados'}
          </p>
        </div>

        {/* Subtle toggle for testing Confirmation Modal types */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-md text-xs">
          <span className="text-slate-400 px-1 hidden sm:inline">Modal:</span>
          <button
            type="button"
            onClick={() => setModalMode('standard')}
            className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
              modalMode === 'standard'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Estándar
          </button>
          <button
            type="button"
            onClick={() => setModalMode('dark-pattern')}
            className={`px-2 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
              modalMode === 'dark-pattern'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Dark Pattern
          </button>
        </div>
      </div>

      {/* Empty State when no favorites */}
      {favorites.length === 0 ? (
        <EmptyState
          iconType="star"
          title="No tienes favoritos guardados"
          actionLabel="Explorar y agregar algunos"
          actionTo="/explorar"
        />
      ) : (
        /* Grid of Saved Favorites */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}

    </div>
  )
}
