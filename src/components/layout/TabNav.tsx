'use client'

export type Tab = 'groups' | 'bracket'

interface TabNavProps {
  active: Tab
  onChange: (tab: Tab) => void
}

export function TabNav({ active, onChange }: TabNavProps) {
  return (
    <nav className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
      {(['groups', 'bracket'] as Tab[]).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
            active === tab
              ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary-glow)]'
              : 'text-white/60 hover:text-white/90 hover:bg-white/5'
          }`}
        >
          {tab === 'groups' ? '🏟 Gruppenphase' : '🏆 K.O.-Runde'}
        </button>
      ))}
    </nav>
  )
}
