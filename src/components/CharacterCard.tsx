import React from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import type { Character } from '../types/character'
import { useFavorites } from '../context/FavoritesContext'
import { translateStatus, translateSpecies, translateLocationName } from '../utils/translations'

interface CharacterCardProps {
  character: Character
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(character.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(character)
  }

  return (
    <article
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
      aria-label={`Tarjeta del personaje ${character.name}`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Link to={`/explorar/${character.id}`} tabIndex={-1} aria-hidden="true">
          <img
            src={character.image}
            alt={`Retrato oficial de ${character.name}`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Favorite Star Button matching reference screenshot */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={favorited ? `Quitar ${character.name} de favoritos` : `Agregar ${character.name} a favoritos`}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
        >
          <Star
            className={`w-4 h-4 ${
              favorited ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
            }`}
          />
        </button>
      </div>

      {/* Card Content matching reference screenshot */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Character Name */}
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            <Link to={`/explorar/${character.id}`} className="hover:underline">
              {character.name}
            </Link>
          </h3>

          {/* Details */}
          <div className="mt-2 space-y-0.5 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <span className="font-medium text-slate-700 dark:text-slate-300">Estado:</span>{' '}
              <span>{translateStatus(character.status)}</span>
            </p>
            <p>
              <span className="font-medium text-slate-700 dark:text-slate-300">Especie:</span>{' '}
              <span>{translateSpecies(character.species)}</span>
            </p>
          </div>
        </div>

        {/* Origin Badge pill */}
        <div>
          <span className="inline-block max-w-full truncate px-2.5 py-0.5 text-[11px] font-medium rounded bg-[#e0f2fe] text-[#0284c7] dark:bg-sky-950 dark:text-sky-300">
            {translateLocationName(character.origin.name)}
          </span>
        </div>
      </div>
    </article>
  )
}
