import React, { useState } from 'react'
import { useToast } from '../context/ToastContext'

interface FormData {
  nombre: string
  email: string
  mensaje: string
}

interface FormErrors {
  nombre?: string
  email?: string
  mensaje?: string
}

export const ContactPage: React.FC = () => {
  const { success } = useToast()

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    mensaje: '',
  })

  // Show errors once user types or interacts
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    nombre: false,
    email: false,
    mensaje: false,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = (data: FormData): FormErrors => {
    const errors: FormErrors = {}

    if (data.nombre.trim().length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
      errors.email = 'Ingresa un email válido (debe contener @ y .)'
    }

    if (data.mensaje.trim().length < 10) {
      errors.mensaje = 'El mensaje debe tener al menos 10 caracteres'
    }

    return errors
  }

  const errors = validate(formData)
  const isFormValid = Object.keys(errors).length === 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ nombre: true, email: true, mensaje: true })

    if (!isFormValid) return

    success('✓ ¡Mensaje enviado con éxito!')
    setIsSubmitted(true)
    setFormData({ nombre: '', email: '', mensaje: '' })
    setTouched({ nombre: false, email: false, mensaje: false })
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      {/* Contact Card matching reference screenshot */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Contacto
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tienes preguntas o sugerencias? Envíanos un mensaje.
          </p>
        </div>

        {isSubmitted && (
          <div
            role="status"
            className="mb-6 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs"
          >
            ✓ Gracias por comunicarte con nosotros. Hemos recibido tu mensaje.
          </div>
        )}

        {/* Form matching reference screenshot */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          
          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre-input"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
            >
              Nombre
            </label>
            <input
              id="nombre-input"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Escribe tu nombre..."
              aria-invalid={touched.nombre && !!errors.nombre}
              aria-describedby={touched.nombre && errors.nombre ? 'nombre-error' : undefined}
              className={`w-full px-3 py-2 rounded-md border text-sm transition-colors bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none ${
                touched.nombre && errors.nombre
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-slate-300 dark:border-slate-700 focus:border-sky-500'
              }`}
            />
            {touched.nombre && errors.nombre && (
              <p id="nombre-error" role="alert" className="text-[11px] text-rose-500 mt-1">
                {errors.nombre}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email-input"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
            >
              Email
            </label>
            <input
              id="email-input"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
              className={`w-full px-3 py-2 rounded-md border text-sm transition-colors bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none ${
                touched.email && errors.email
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-slate-300 dark:border-slate-700 focus:border-sky-500'
              }`}
            />
            {touched.email && errors.email && (
              <p id="email-error" role="alert" className="text-[11px] text-rose-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Mensaje */}
          <div>
            <label
              htmlFor="mensaje-input"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
            >
              Mensaje
            </label>
            <textarea
              id="mensaje-input"
              name="mensaje"
              rows={4}
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí..."
              aria-invalid={touched.mensaje && !!errors.mensaje}
              aria-describedby={touched.mensaje && errors.mensaje ? 'mensaje-error' : undefined}
              className={`w-full px-3 py-2 rounded-md border text-sm transition-colors resize-y bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none ${
                touched.mensaje && errors.mensaje
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-slate-300 dark:border-slate-700 focus:border-sky-500'
              }`}
            />
            {touched.mensaje && errors.mensaje && (
              <p id="mensaje-error" role="alert" className="text-[11px] text-rose-500 mt-1">
                {errors.mensaje}
              </p>
            )}
          </div>

          {/* Botón: Enviar mensaje */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full py-2.5 px-4 rounded-md text-sm font-medium text-white transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-sky-300/60 dark:disabled:bg-sky-900/40 bg-[#00a8e8] hover:bg-[#0096d1]"
          >
            Enviar mensaje
          </button>

        </form>

      </div>
    </div>
  )
}
