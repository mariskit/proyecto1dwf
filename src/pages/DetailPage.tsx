import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Character } from '../types/character'
import { useFavorites } from '../context/FavoritesContext'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import {
  translateStatus,
  translateSpecies,
  translateGender,
  translateLocationName,
} from '../utils/translations'
import { Star } from 'lucide-react'

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { isFavorite, toggleFavorite } = useFavorites()

  const [character, setCharacter] = useState<Character | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCharacterDetail = async () => {
    if (!id) return
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      if (response.status === 404) {
        throw new Error('Personaje no encontrado')
      }
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      const data: Character = await response.json()
      setCharacter(data)
    } catch (err) {
      console.error('Error fetching character details:', err)
      setError('No se pudo cargar la información del personaje. Verifica tu conexión e intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacterDetail()
  }, [id])

  const favorited = character ? isFavorite(character.id) : false

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-4">
      
      {/* Back button matching reference screenshot: ← Volver a explorar */}
      <div>
        <Link
          to="/explorar"
          className="text-xs font-medium text-[#00a8e8] hover:underline inline-flex items-center gap-1"
        >
          ← Volver a explorar
        </Link>
      </div>

      {/* Loading state */}
      {isLoading && <LoadingSpinner message="Cargando datos..." />}

      {/* Error state */}
      {!isLoading && error && (
        <ErrorMessage
          title="No se pudo cargar la información."
          message={error}
          onRetry={fetchCharacterDetail}
        />
      )}

      {/* Detail Card matching reference screenshot */}
      {!isLoading && !error && character && (
        <article
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row"
          aria-labelledby="character-name-heading"
        >
          {/* Character Image */}
          <div className="md:w-1/2 aspect-square bg-slate-100 dark:bg-slate-800">
            <img
              src={character.image}
              alt={`Fotografía oficial de ${character.name}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Character Information */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Name */}
              <h1
                id="character-name-heading"
                className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
              >
                {character.name}
              </h1>

              {/* Attributes matching reference screenshot */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <p>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Estado:</span>{' '}
                  <span>{translateStatus(character.status)}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Especie:</span>{' '}
                  <span>{translateSpecies(character.species)}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Género:</span>{' '}
                  <span>{translateGender(character.gender)}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Origen:</span>{' '}
                  <span>{translateLocationName(character.origin.name)}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Ubicación:</span>{' '}
                  <span>{translateLocationName(character.location.name)}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Episodios:</span>{' '}
                  <span>{character.episode.length}</span>
                </p>
              </div>
            </div>

            {/* Action button */}
            <div>
              <button
                type="button"
                onClick={() => toggleFavorite(character)}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  favorited
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'bg-[#00a8e8] hover:bg-[#0096d1] text-white'
                }`}
              >
                <Star className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                <span>{favorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span>
              </button>
            </div>
          </div>
        </article>
      )}

    </div>
  )
}
