'use client'

import { X, Sun, Moon } from 'lucide-react'
import { useWMStore } from '@/store/useWMStore'

const PRESET_COLORS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
]

export function SettingsPanel() {
  const { settingsOpen, toggleSettings, theme, toggleTheme, primaryColor, setPrimaryColor } = useWMStore()

  if (!settingsOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={toggleSettings}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-72 z-50 bg-slate-900/95 dark:bg-slate-900/95 border-l border-white/10 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="font-semibold text-white/90">Einstellungen</h2>
          <button
            onClick={toggleSettings}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Theme toggle */}
          <div>
            <p className="text-xs font-medium text-white/50 uppercase tracking-wide mb-3">Anzeigemodus</p>
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            >
              {theme === 'dark' ? (
                <>
                  <Moon size={18} className="text-blue-400" />
                  <div>
                    <p className="text-white/80 text-sm">Dunkel</p>
                    <p className="text-white/40 text-xs">Tief dunkel</p>
                  </div>
                </>
              ) : (
                <>
                  <Sun size={18} className="text-amber-400" />
                  <div>
                    <p className="text-white/80 text-sm">Hell</p>
                    <p className="text-white/40 text-xs">Heller Farbton</p>
                  </div>
                </>
              )}
            </button>
          </div>

          {/* Primary color */}
          <div>
            <p className="text-xs font-medium text-white/50 uppercase tracking-wide mb-3">Akzentfarbe</p>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  title={color}
                  style={{ backgroundColor: color }}
                  className={`h-10 rounded-lg transition-transform hover:scale-110 ${
                    primaryColor === color
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110'
                      : ''
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/20"
              />
              <span className="text-sm text-white/60 font-mono">{primaryColor}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
