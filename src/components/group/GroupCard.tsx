'use client'

import { GROUP_MATCHES_BY_GROUP } from '@/lib/data/groups'
import { useWMStore } from '@/store/useWMStore'
import { MatchCard } from './MatchCard'
import { StandingsTable } from './StandingsTable'

interface GroupCardProps {
  group: string
}

const GROUP_COLORS: Record<string, string> = {
  A: 'from-blue-500/20',
  B: 'from-emerald-500/20',
  C: 'from-yellow-500/20',
  D: 'from-red-500/20',
  E: 'from-purple-500/20',
  F: 'from-orange-500/20',
  G: 'from-cyan-500/20',
  H: 'from-pink-500/20',
  I: 'from-lime-500/20',
  J: 'from-teal-500/20',
  K: 'from-indigo-500/20',
  L: 'from-rose-500/20',
}

export function GroupCard({ group }: GroupCardProps) {
  const { getGroupStandings } = useWMStore()
  const matches = GROUP_MATCHES_BY_GROUP[group] ?? []
  const standings = getGroupStandings(group)
  const colorFrom = GROUP_COLORS[group] ?? 'from-slate-500/20'

  return (
    <div className={`rounded-2xl border border-white/10 bg-linear-to-b ${colorFrom} to-transparent overflow-hidden flex flex-col`}>
      {/* Group header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
        <span className="text-lg font-black text-[var(--primary)]">Gruppe {group}</span>
      </div>

      <div className="p-3 flex flex-col flex-1">
        {/* Match cards */}
        <div className="space-y-2">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>

        {/* Standings — immer am unteren Rand */}
        <div className="mt-auto pt-2">
          <StandingsTable standings={standings} />
        </div>
      </div>
    </div>
  )
}
