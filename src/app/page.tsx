'use client'

import { useState, useEffect } from 'react'
import { TabNav, Tab } from '@/components/layout/TabNav'
import { GroupGrid } from '@/components/group/GroupGrid'
import { KOBracket } from '@/components/bracket/KOBracket'
import { useWMStore } from '@/store/useWMStore'

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('groups')
  const { highlightedTeamId, setHighlightedTeam, loadApiData, apiLoaded } = useWMStore()

  useEffect(() => {
    loadApiData()
  }, [])

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-6 space-y-6">
      {/* Highlighted team banner */}
      {highlightedTeamId && (
        <div
          className="flex items-center justify-between px-4 py-2 rounded-xl border border-(--primary)/40 bg-(--primary)/10 text-sm text-white/80"
        >
          <span>Team markiert — klicke erneut zum Entmarkieren</span>
          <button
            onClick={() => setHighlightedTeam(null)}
            className="text-white/50 hover:text-white/80 text-xs underline"
          >
            Alle aufheben
          </button>
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <TabNav active={activeTab} onChange={setActiveTab} />
        {apiLoaded && (
          <span className="text-xs text-green-400/70 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
            Live-Daten geladen
          </span>
        )}
      </div>

      {activeTab === 'groups' && <GroupGrid />}
      {activeTab === 'bracket' && <KOBracket />}
    </div>
  )
}
