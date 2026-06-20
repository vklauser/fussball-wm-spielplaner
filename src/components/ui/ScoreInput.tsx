'use client'

import { useWMStore } from '@/store/useWMStore'

interface ScoreInputProps {
  matchId: string
  side: 'home' | 'away'
}

export function ScoreInput({ matchId, side }: ScoreInputProps) {
  const { scores, setScore } = useWMStore()
  const value = scores[matchId]?.[side]

  return (
    <input
      type="number"
      min={0}
      max={99}
      value={value ?? ''}
      placeholder="–"
      onChange={(e) => {
        const raw = e.target.value
        if (raw === '') {
          setScore(matchId, side, null)
        } else {
          const n = parseInt(raw, 10)
          if (!isNaN(n) && n >= 0 && n <= 99) {
            setScore(matchId, side, n)
          }
        }
      }}
      className="
        w-9 h-9 text-center text-base font-bold rounded-lg
        bg-white/10 border border-white/20 text-white/90
        hover:bg-white/15 focus:bg-white/20 focus:outline-none
        focus:border-[var(--primary)] transition-colors
        placeholder:text-white/30
      "
    />
  )
}
