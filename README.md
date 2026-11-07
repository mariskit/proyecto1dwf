# Explorador - Rick & Morty SPA

Aplicación web SPA desarrollada con React, TypeScript, Vite y Tailwind CSS que consume en tiempo real la API pública de Rick & Morty.

## Características

- **Rutas completas con React Router**:
  - `/`: Página de inicio / Hero.
  - `/explorar`: Explorador de personajes con búsqueda y filtro de estado en tiempo real.
  - `/explorar/:id`: Vista de detalle individual con fetch por ID y ruta dinámica (`useParams`).
  - `/favoritos`: Gestión de personajes favoritos con persistencia (`localStorage`).
  - `/contacto`: Formulario controlado con validación en tiempo real y deshabilitación de envío si es inválido.
  - `*`: Página 404 para rutas inexistentes.
- **Estados visibles en la interfaz**:
  - Loading: Indicador de carga.
  - Error: Mensaje de error con botón de reintento.
  - Empty: Estados vacíos para búsquedas sin resultados y favoritos vacíos.
- **Notificaciones Toast**: Alertas automáticas con auto-dismiss para acciones clave.
- **Modales con `<dialog>` nativo**:
  - Confirmación ética accesible con `useRef` y `.showModal()`.
  - Demostración de Dark Pattern (Confirmshaming & Misdirection) con comentarios explicativos en el código (`DarkPatternDialog.tsx`).
- **Modo Oscuro / Claro**: Selector de tema con persistencia.
- **Accesibilidad y Semántica**: Etiquetas semánticas HTML5, `alt`, `role`, `aria-*`, y `htmlFor`.

## Instalación y ejecución local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## Despliegue en Vercel

1. Subir este proyecto a un repositorio público en GitHub:
   ```bash
   git add .
   git commit -m "feat: implementacion completa spa explorador"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```
2. Ir a [vercel.com](https://vercel.com) e iniciar sesión con GitHub.
3. Hacer clic en **"Add New..."** -> **"Project"** e importar el repositorio.
4. Vercel detectará Vite automáticamente. Hacer clic en **"Deploy"**.
