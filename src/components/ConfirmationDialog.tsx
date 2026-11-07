import React, { useEffect, useRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

export const ConfirmationDialog: React.FC = () => {
  const { characterPendingRemoval, confirmRemoval, cancelRemoval, modalMode } = useFavorites()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (characterPendingRemoval && modalMode === 'standard') {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [characterPendingRemoval, modalMode])

  const handleCancel = () => {
    cancelRemoval()
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect()
    if (!dialogDimensions) return
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      handleCancel()
    }
  }

  if (modalMode !== 'standard') return null

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-desc"
      className="fixed inset-0 m-auto p-0 bg-transparent rounded-xl shadow-xl backdrop:bg-black/60 backdrop:backdrop-blur-xs max-w-sm w-11/12 border-0 outline-none"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center text-slate-800 dark:text-slate-100 shadow-xl">
        {/* Warning Icon matching reference screenshot */}
        <div className="w-12 h-12 mx-auto mb-3 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
        </div>

        {/* Modal Title */}
        <h3 id="dialog-title" className="text-lg font-bold text-slate-900 dark:text-white">
          Quitar de favoritos?
        </h3>

        {/* Modal Description */}
        <p id="dialog-desc" className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Estas seguro de que quieres quitar a{' '}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {characterPendingRemoval?.name || 'este personaje'}
          </span>{' '}
          de tus favoritos?
        </p>

        {/* Actions matching reference screenshot */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={confirmRemoval}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
          >
            Quitar
          </button>
        </div>
      </div>
    </dialog>
  )
}
