'use client'

import { useWMStore } from '@/store/useWMStore'
import { TEAM_MAP } from '@/lib/data/groups'

interface TeamBadgeProps {
  teamId: string
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'right' | 'center'
  showFlag?: boolean
}

export function TeamBadge({ teamId, size = 'md', align = 'left', showFlag = true }: TeamBadgeProps) {
  const { highlightedTeamId, setHighlightedTeam } = useWMStore()
  const team = TEAM_MAP[teamId]
  if (!team) return <span className="text-white/40 text-sm">?</span>

  const isHighlighted = highlightedTeamId === teamId

  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base font-semibold' : 'text-sm'
  const flagSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl'

  const alignClass = align === 'right' ? 'flex-row-reverse text-right' : align === 'center' ? 'justify-center' : ''

  return (
    <button
      onClick={() => setHighlightedTeam(teamId)}
      title={`${team.name} markieren`}
      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all cursor-pointer w-full ${alignClass} ${
        isHighlighted ? 'team-highlighted' : 'hover:bg-white/5'
      }`}
    >
      {showFlag && <span className={flagSize}>{team.flag}</span>}
      <span className={`${textSize} text-white/90 truncate`}>{team.name}</span>
    </button>
  )
}

interface PlaceholderBadgeProps {
  label: string
  teamId: string | null
  align?: 'left' | 'right' | 'center'
}

export function PlaceholderBadge({ label, teamId, align = 'left' }: PlaceholderBadgeProps) {
  if (teamId) return <TeamBadge teamId={teamId} align={align} />
  return (
    <div className={`px-2 py-1 flex items-center gap-1.5 ${align === 'right' ? 'justify-end' : ''}`}>
      <span className="text-white/25 text-xs italic truncate">{label}</span>
    </div>
  )
}
