import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ToastContainer } from './components/ToastContainer'
import { ConfirmationDialog } from './components/ConfirmationDialog'
import { DarkPatternDialog } from './components/DarkPatternDialog'
import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { DetailPage } from './pages/DetailPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
              {/* Header Navigation */}
              <Navbar />

              {/* Main App Content View */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explorar" element={<ExplorePage />} />
                  <Route path="/explorar/:id" element={<DetailPage />} />
                  <Route path="/favoritos" element={<FavoritesPage />} />
                  <Route path="/contacto" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />

              {/* Toast Notifications */}
              <ToastContainer />

              {/* Modals with Native <dialog> + useRef */}
              <ConfirmationDialog />
              <DarkPatternDialog />
            </div>
          </BrowserRouter>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
