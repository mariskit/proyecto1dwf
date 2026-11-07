import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Character } from '../types/character'
import { useToast } from './ToastContext'

type ModalMode = 'standard' | 'dark-pattern'

interface FavoritesContextType {
  favorites: Character[]
  isFavorite: (id: number) => boolean
  addFavorite: (character: Character) => void
  removeFavorite: (id: number) => void
  toggleFavorite: (character: Character) => void
  characterPendingRemoval: Character | null
  setCharacterPendingRemoval: (character: Character | null) => void
  confirmRemoval: () => void
  cancelRemoval: () => void
  modalMode: ModalMode
  setModalMode: (mode: ModalMode) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

const STORAGE_KEY = 'rick-and-morty-favorites-v1'

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Which character is currently being confirmed for deletion in the native <dialog>
  const [characterPendingRemoval, setCharacterPendingRemoval] = useState<Character | null>(null)
  
  // Toggle between Standard Confirmation and Dark Pattern Confirmation
  const [modalMode, setModalMode] = useState<ModalMode>('standard')

  const { success, info } = useToast()

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch (err) {
      console.error('Error al guardar favoritos en localStorage:', err)
    }
  }, [favorites])

  const isFavorite = useCallback(
    (id: number) => favorites.some(char => char.id === id),
    [favorites]
  )

  const addFavorite = useCallback(
    (character: Character) => {
      setFavorites(prev => {
        if (prev.some(char => char.id === character.id)) return prev
        return [...prev, character]
      })
      success(`✓ ${character.name} agregado a favoritos`)
    },
    [success]
  )

  const removeFavorite = useCallback(
    (id: number) => {
      const char = favorites.find(c => c.id === id)
      setFavorites(prev => prev.filter(c => c.id !== id))
      if (char) {
        info(`ℹ ${char.name} eliminado de favoritos`)
      }
    },
    [favorites, info]
  )

  const toggleFavorite = useCallback(
    (character: Character) => {
      if (isFavorite(character.id)) {
        // Open confirmation modal
        setCharacterPendingRemoval(character)
      } else {
        addFavorite(character)
      }
    },
    [isFavorite, addFavorite]
  )

  const confirmRemoval = useCallback(() => {
    if (characterPendingRemoval) {
      removeFavorite(characterPendingRemoval.id)
      setCharacterPendingRemoval(null)
    }
  }, [characterPendingRemoval, removeFavorite])

  const cancelRemoval = useCallback(() => {
    setCharacterPendingRemoval(null)
  }, [])

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        characterPendingRemoval,
        setCharacterPendingRemoval,
        confirmRemoval,
        cancelRemoval,
        modalMode,
        setModalMode,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider')
  }
  return context
}
