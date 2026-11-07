import React, { useEffect, useRef, useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

/**
 * =========================================================================================
 * ⚠️ IMPLEMENTACIÓN DIDÁCTICA: MODAL CON PATRONES OSCUROS (DARK PATTERNS) ⚠️
 * =========================================================================================
 *
 * Requisito evaluado:
 * "Modal con dark pattern intencional + comentario explicativo en el código"
 *
 * ANÁLISIS DE PATRONES OSCUROS EMPLEADOS EN ESTE COMPONENTE:
 *
 * 1. CONFIRMSHAMING (Manipulación Emocional):
 *    - En lugar de etiquetas de acción neutras ("Cancelar", "Eliminar"), el texto busca
 *      avergonzar o infundir culpa en el usuario:
 *      - Botón deseado por el sistema: "Conservar en favoritos"
 *      - Botón de eliminación: "Sí, quiero eliminarlo y no me importa perder su historial"
 *
 * 2. MISDIRECTION / VISUAL INTERFERENCE (Interferencia Visual):
 *    - El botón para cancelar la eliminación (lo que la plataforma desea para retener datos)
 *      se presenta con el estilo de botón primario llamativo y grande, mientras que el botón
 *      real de confirmación destructiva se minimiza deliberadamente como un enlace de texto
 *      pequeño y de bajo contraste.
 *
 * 3. OBSTRUCTION (Fricción / Obstáculo Artificial):
 *    - Se impone una casilla de verificación previa para permitir la eliminación, forzando
 *      fricción cognitiva innecesaria para una acción habitual.
 *
 * CONTRASTE CON EL DISEÑO ÉTICO:
 * En `ConfirmationDialog.tsx` se encuentra la versión ética recomendada: títulos neutros,
 * pesos visuales estándar (Cancelar = secundario, Eliminar = peligro/rojo), sin coerción emocional.
 * =========================================================================================
 */

export const DarkPatternDialog: React.FC = () => {
  const { characterPendingRemoval, confirmRemoval, cancelRemoval, modalMode } = useFavorites()
  const dialogRef = useRef<HTMLDialogElement>(null)
  
  const [guiltChecked, setGuiltChecked] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (characterPendingRemoval && modalMode === 'dark-pattern') {
      setGuiltChecked(false)
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [characterPendingRemoval, modalMode])

  if (modalMode !== 'dark-pattern') return null

  return (
    <dialog
      ref={dialogRef}
      onCancel={cancelRemoval}
      aria-labelledby="dark-pattern-title"
      aria-describedby="dark-pattern-desc"
      className="fixed inset-0 m-auto p-0 bg-transparent rounded-2xl shadow-xl backdrop:bg-black/60 backdrop:backdrop-blur-xs max-w-md w-11/12 border-0 outline-none"
    >
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-800 dark:text-slate-100 shadow-xl">
        
        {/* Subtle close icon */}
        <button
          type="button"
          onClick={cancelRemoval}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon */}
        <div className="w-12 h-12 mx-auto mb-3 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
        </div>

        {/* Manipulative Heading (Confirmshaming) */}
        <h3 id="dark-pattern-title" className="text-lg font-bold text-center text-slate-900 dark:text-white">
          ¿Seguro que deseas abandonar a {characterPendingRemoval?.name}?
        </h3>

        {/* Persuasive copy (Confirmshaming) */}
        <p id="dark-pattern-desc" className="text-xs text-slate-600 dark:text-slate-300 text-center mt-2 leading-relaxed">
          Este personaje perderá su lugar preferente en tu biblioteca y no podrás acceder rápidamente a sus datos interdimensionales.
        </p>

        {/* Artificial obstacle: required checkbox */}
        <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              id="confirmshame-check"
              checked={guiltChecked}
              onChange={e => setGuiltChecked(e.target.checked)}
              className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
            />
            <span>
              Entiendo que eliminarlo afectará mi registro de personajes guardados.
            </span>
          </label>
        </div>

        {/* Action buttons: Misdirection (Primary highlighted button is Cancel, real Delete is small and disabled) */}
        <div className="mt-6 space-y-2 text-center">
          <button
            type="button"
            onClick={cancelRemoval}
            className="w-full py-2.5 px-4 rounded-md font-medium text-sm text-white bg-[#00a8e8] hover:bg-[#0096d1] transition-colors cursor-pointer shadow-xs"
          >
            Conservar en favoritos
          </button>

          <button
            type="button"
            disabled={!guiltChecked}
            onClick={confirmRemoval}
            className={`text-xs underline py-1 transition-colors inline-block ${
              guiltChecked
                ? 'text-slate-500 hover:text-rose-600 cursor-pointer'
                : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            Sí, eliminar de todas formas
          </button>
        </div>

      </div>
    </dialog>
  )
}
