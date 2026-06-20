'use client'

import { GroupStanding } from '@/types'
import { TEAM_MAP } from '@/lib/data/groups'
import { useWMStore } from '@/store/useWMStore'

interface StandingsTableProps {
  standings: GroupStanding[]
}

const PLACE_COLORS = [
  'text-yellow-400',
  'text-slate-300',
  'text-amber-600',
  'text-white/30',
]

export function StandingsTable({ standings }: StandingsTableProps) {
  const { highlightedTeamId, setHighlightedTeam } = useWMStore()

  return (
    <div className="mt-3 rounded-lg overflow-hidden border border-white/10 text-xs">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-white/10 text-white/40 font-medium">
            <th className="py-1.5 pl-2 pr-1 text-left w-5">#</th>
            <th className="py-1.5 px-1 text-left">Team</th>
            <th className="py-1.5 px-1 text-center w-6">Sp</th>
            <th className="py-1.5 px-1 text-center w-6">S</th>
            <th className="py-1.5 px-1 text-center w-6">U</th>
            <th className="py-1.5 px-1 text-center w-6">N</th>
            <th className="py-1.5 px-1 text-center w-10">Tore</th>
            <th className="py-1.5 px-1 text-center w-8">+/-</th>
            <th className="py-1.5 pl-1 pr-2 text-center w-8 font-bold text-white/60">Pkt</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((s, i) => {
            const team = TEAM_MAP[s.teamId]
            const isHighlighted = highlightedTeamId === s.teamId
            const isQualifier = i < 2
            const isLastQualifier = i === 1

            return (
              <tr
                key={s.teamId}
                onClick={() => setHighlightedTeam(s.teamId)}
                className={`cursor-pointer border-b border-white/5 last:border-0 transition-all ${
                  isHighlighted
                    ? 'team-highlighted'
                    : isQualifier
                    ? 'bg-green-500/5 hover:bg-green-500/10'
                    : 'hover:bg-white/5'
                } ${isLastQualifier ? 'border-b border-white/15' : ''}`}
              >
                {/* Platz */}
                <td className="py-1.5 pl-2 pr-1">
                  <span className={`font-bold ${PLACE_COLORS[i] ?? 'text-white/30'}`}>
                    {i + 1}
                  </span>
                </td>

                {/* Team */}
                <td className="py-1.5 px-1 max-w-0">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="text-sm shrink-0">{team?.flag}</span>
                    <span className="truncate text-white/80">{team?.name}</span>
                  </div>
                </td>

                {/* Sp */}
                <td className="py-1.5 px-1 text-center text-white/50">{s.played}</td>

                {/* S */}
                <td className="py-1.5 px-1 text-center text-white/70">{s.won}</td>

                {/* U */}
                <td className="py-1.5 px-1 text-center text-white/50">{s.drawn}</td>

                {/* N */}
                <td className="py-1.5 px-1 text-center text-white/50">{s.lost}</td>

                {/* Tore */}
                <td className="py-1.5 px-1 text-center text-white/50 tabular-nums">
                  {s.goalsFor}:{s.goalsAgainst}
                </td>

                {/* Diff */}
                <td className={`py-1.5 px-1 text-center font-medium tabular-nums ${
                  s.goalDiff > 0 ? 'text-green-400' : s.goalDiff < 0 ? 'text-red-400' : 'text-white/40'
                }`}>
                  {s.goalDiff > 0 ? '+' : ''}{s.goalDiff}
                </td>

                {/* Pkt */}
                <td className="py-1.5 pl-1 pr-2 text-center font-bold text-white/90 tabular-nums">
                  {s.points}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
