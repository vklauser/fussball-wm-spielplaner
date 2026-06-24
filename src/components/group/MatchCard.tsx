'use client'

import { useEffect, useState } from 'react'
import { Match } from '@/types'
import { TeamBadge } from '@/components/ui/TeamBadge'
import { ScoreInput } from '@/components/ui/ScoreInput'
import { formatMatchDate } from '@/lib/utils/datetime'
import { useWMStore } from '@/store/useWMStore'

const UPCOMING_WINDOW = 24 * 60 * 60 * 1000 // 24h in ms
const LIVE_WINDOW = 130 * 60 * 1000           // 130 min — 90 + stoppage/extra time

function timeUntil(isoDate: string, now: number): string {
  const diff = new Date(isoDate).getTime() - now
  const h = Math.floor(diff / 3_600_000)
  const m = Math.floor((diff % 3_600_000) / 60_000)
  if (h > 0) return `in ${h}h`
  return `in ${m} min`
}

interface MatchCardProps {
  match: Match
}

export function MatchCard({ match }: MatchCardProps) {
  
  const { dateFixes, highlightedTeamId } = useWMStore()
  const matchDate = dateFixes[match.id] ?? match.date

  const [now, setNow] = useState(0)
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(id)
  }, [])

  const matchTime = new Date(matchDate).getTime()
  const diff = matchTime - now
  const isUpcoming = now > 0 && diff > 0 && diff <= UPCOMING_WINDOW
  const isLive = now > 0 && diff <= 0 && now - matchTime <= LIVE_WINDOW

  const isRelated =
    highlightedTeamId === match.homeTeamId || highlightedTeamId === match.awayTeamId

  return (
    <div
      className={`rounded-xl p-3 border transition-all ${
        isRelated
          ? 'border-(--primary) bg-(--primary)/5'
          : isLive
          ? 'border-emerald-500/60 bg-emerald-500/5'
          : isUpcoming
          ? 'border-amber-400/60 bg-amber-400/5'
          : 'border-white/10 bg-white/5 hover:bg-white/8'
      }`}
    >
      {/* Date + venue */}
      <div className="text-xs text-white/40 mb-2 flex items-center justify-between">
        <span className={isLive ? 'text-emerald-400/80' : isUpcoming ? 'text-amber-300/80' : ''}>
          {formatMatchDate(matchDate)}
        </span>
        <div className="flex items-center gap-1.5">
          {isLive && (
            <span className="text-emerald-400 font-semibold animate-pulse">
              🔴 LIVE
            </span>
          )}
          {isUpcoming && (
            <span className="text-amber-400 font-semibold">
              ⚡ {timeUntil(matchDate, now)}
            </span>
          )}
          <span className="truncate max-w-30 text-right">{match.city}</span>
        </div>
      </div>

      {/* Teams + Score */}
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <TeamBadge teamId={match.homeTeamId} size="sm" />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <ScoreInput matchId={match.id} side="home" />
          <span className="text-white/30 text-sm font-bold">:</span>
          <ScoreInput matchId={match.id} side="away" />
        </div>

        <div className="flex-1 min-w-0">
          <TeamBadge teamId={match.awayTeamId} size="sm" align="right" />
        </div>
      </div>
    </div>
  )
}
