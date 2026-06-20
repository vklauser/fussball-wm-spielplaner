'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { useWMStore } from '@/store/useWMStore'

export function Header() {
  const { resetScores, loadApiData } = useWMStore()
  const [loading, setLoading] = useState(false)

  async function handleReset() {
    setLoading(true)
    resetScores()
    await loadApiData()
    setLoading(false)
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚽</span>
          <div>
            <h1 className="font-bold text-lg leading-tight text-white/90 dark:text-white/90">
              WM 2026 Spielplaner
            </h1>
            <p className="text-xs text-white/50 dark:text-white/50 hidden sm:block">
              USA · Mexiko · Kanada · 11. Juni – 19. Juli
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            disabled={loading}
            title="Zurücksetzen & Live-Daten neu laden"
            className="p-2 rounded-lg text-white/60 hover:text-white/90 hover:bg-white/10 transition-colors disabled:opacity-40"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>
    </header>
  )
}
