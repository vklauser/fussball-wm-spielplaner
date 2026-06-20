'use client'

import { Match } from '@/types'
import { TeamBadge } from '@/components/ui/TeamBadge'
import { ScoreInput } from '@/components/ui/ScoreInput'
import { formatMatchDate } from '@/lib/utils/datetime'
import { useWMStore } from '@/store/useWMStore'

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  const { scores, highlightedTeamId } = useWMStore()
  const score = scores[match.id]
  const hasResult = score?.home != null && score?.away != null

  const isRelated =
    highlightedTeamId === match.homeTeamId || highlightedTeamId === match.awayTeamId

  return (
    <div
      className={`rounded-xl p-3 border transition-all ${
        isRelated
          ? 'border-[var(--primary)] bg-[var(--primary)]/5'
          : 'border-white/10 bg-white/5 hover:bg-white/8'
      }`}
    >
      {/* Date + venue */}
      <div className="text-xs text-white/40 mb-2 flex items-center justify-between">
        <span>{formatMatchDate(match.date)}</span>
        <span className="truncate max-w-[120px] text-right">{match.city}</span>
      </div>

      {/* Teams + Score */}
      <div className="flex items-center gap-2">
        {/* Home team */}
        <div className="flex-1 min-w-0">
          <TeamBadge teamId={match.homeTeamId} size="sm" />
        </div>

        {/* Score inputs */}
        <div className="flex items-center gap-1.5 shrink-0">
          <ScoreInput matchId={match.id} side="home" />
          <span className="text-white/30 text-sm font-bold">:</span>
          <ScoreInput matchId={match.id} side="away" />
        </div>

        {/* Away team */}
        <div className="flex-1 min-w-0">
          <TeamBadge teamId={match.awayTeamId} size="sm" align="right" />
        </div>
      </div>

      {/* Result indicator */}
      {hasResult && (
        <div className="mt-1.5 text-center">
          {score!.home! > score!.away! ? (
            <span className="text-xs text-green-400/70">Heimsieg</span>
          ) : score!.home! < score!.away! ? (
            <span className="text-xs text-blue-400/70">Auswärtssieg</span>
          ) : (
            <span className="text-xs text-yellow-400/70">Unentschieden</span>
          )}
        </div>
      )}
    </div>
  )
}
