'use client'

import { useWMStore } from '@/store/useWMStore'
import { PlaceholderBadge } from '@/components/ui/TeamBadge'
import { ScoreInput } from '@/components/ui/ScoreInput'
import { formatMatchDate } from '@/lib/utils/datetime'

interface BracketMatchProps {
  matchId: string
}

export function BracketMatch({ matchId }: BracketMatchProps) {
  const { getKOMatchWithTeams, highlightedTeamId, scores } = useWMStore()
  const match = getKOMatchWithTeams(matchId)
  if (!match) return null

  const score = scores[matchId]
  const hasResult = score?.home != null && score?.away != null
  const winner = match.winnerId

  const isRelated =
    highlightedTeamId != null &&
    (match.slot1.teamId === highlightedTeamId || match.slot2.teamId === highlightedTeamId)

  const slot1Wins = hasResult && winner != null && winner === match.slot1.teamId
  const slot2Wins = hasResult && winner != null && winner === match.slot2.teamId

  return (
    <div
      className={`rounded-xl p-3 border transition-all ${
        isRelated
          ? 'border-(--primary) bg-(--primary)/5'
          : 'border-white/10 bg-white/5 hover:bg-white/8'
      }`}
    >
      {/* Date + venue */}
      <div className="text-xs text-white/40 mb-2 flex items-center justify-between">
        <span>{formatMatchDate(match.date)}</span>
        <span className="truncate max-w-30 text-right">{match.city}</span>
      </div>

      {/* Teams + Score */}
      <div className="flex items-center gap-2">
        <div className={`flex-1 min-w-0 transition-opacity ${slot2Wins ? 'opacity-40' : ''}`}>
          <PlaceholderBadge label={match.slot1.label} teamId={match.slot1.teamId} />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <ScoreInput matchId={matchId} side="home" />
          <span className="text-white/30 text-sm font-bold">:</span>
          <ScoreInput matchId={matchId} side="away" />
        </div>

        <div className={`flex-1 min-w-0 transition-opacity ${slot1Wins ? 'opacity-40' : ''}`}>
          <PlaceholderBadge label={match.slot2.label} teamId={match.slot2.teamId} align="right" />
        </div>
      </div>

      {/* Result indicator */}
      {hasResult && winner && (
        <div className="mt-1.5 text-center">
          {slot1Wins ? (
            <span className="text-xs text-green-400/70">Heimsieg</span>
          ) : (
            <span className="text-xs text-blue-400/70">Auswärtssieg</span>
          )}
        </div>
      )}
    </div>
  )
}
