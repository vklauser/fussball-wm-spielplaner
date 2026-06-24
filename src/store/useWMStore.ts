'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Score } from '@/types'
import { GROUPS, GROUP_MATCHES_BY_GROUP, TEAM_MAP } from '@/lib/data/groups'
import { ALL_KO_MATCHES, BRACKET_FLOW, LOSER_FLOW } from '@/lib/data/bracket'
import { calculateStandings } from '@/lib/logic/standings'
import { ThirdPlaceEntry, resolveThirdPlaceSlots } from '@/lib/logic/thirdPlace'
import { KOMatch } from '@/types'

interface WMStore {
  // ── Scores ──
  scores: Record<string, Score>
  setScore: (matchId: string, side: 'home' | 'away', value: number | null) => void
  resetScores: () => void

  // ── Date fixes from openfootball ──
  dateFixes: Record<string, string>

  // ── Highlighting ──
  highlightedTeamId: string | null
  setHighlightedTeam: (teamId: string | null) => void

  // ── Computed (derived) ──
  getGroupStandings: (group: string) => ReturnType<typeof calculateStandings>
  getKOTeamId: (slotLabel: string) => string | null
  getKOMatchWithTeams: (matchId: string) => KOMatch
  getKOWinner: (matchId: string) => string | null
  getKOLoser: (matchId: string) => string | null

  // ── API ──
  apiLoaded: boolean
  loadApiData: () => Promise<void>
}

// Build KO match lookup once
const KO_MATCH_MAP: Record<string, KOMatch> = Object.fromEntries(
  ALL_KO_MATCHES.map((m) => [m.id, { ...m }])
)

export const useWMStore = create<WMStore>()(
  persist(
    (set, get) => ({
      scores: {},
      dateFixes: {},
      highlightedTeamId: null,
      apiLoaded: false,

      setScore: (matchId, side, value) => {
        set((state) => ({
          scores: {
            ...state.scores,
            [matchId]: {
              ...state.scores[matchId],
              home: state.scores[matchId]?.home ?? null,
              away: state.scores[matchId]?.away ?? null,
              [side]: value,
            },
          },
        }))
      },

      resetScores: () => set({ scores: {}, dateFixes: {}, apiLoaded: false }),

      setHighlightedTeam: (teamId) =>
        set((state) => ({
          highlightedTeamId: state.highlightedTeamId === teamId ? null : teamId,
        })),

      getGroupStandings: (group) => {
        const { scores } = get()
        const matches = GROUP_MATCHES_BY_GROUP[group] ?? []
        return calculateStandings(matches, scores)
      },

      getKOTeamId: (slotLabel) => {
        const { scores, getGroupStandings } = get()

        // 1. Direct group slot (e.g. "1. Gruppe E")
        const directMatch = slotLabel.match(/^(\d)\. Gruppe ([A-L])$/)
        if (directMatch) {
          const place = parseInt(directMatch[1]) - 1
          const group = directMatch[2]
          const standings = getGroupStandings(group)
          return standings[place]?.teamId ?? null
        }

        // 2. Third-place slot (e.g. "3. A/B/C/D/F")
        if (slotLabel.startsWith('3. ') && slotLabel.includes('/')) {
          const allThirds: ThirdPlaceEntry[] = GROUPS.map((g) => {
            const standings = getGroupStandings(g)
            return { group: g, standing: standings[2] }
          }).filter((e) => e.standing != null)
          const map = resolveThirdPlaceSlots(allThirds)
          return map[slotLabel] ?? null
        }

        // 3. KO slot "Sieger r32_L1" / "Verlierer sf_L"
        const winnerMatch = slotLabel.match(/^Sieger (.+)$/)
        if (winnerMatch) {
          return get().getKOWinner(winnerMatch[1])
        }
        const loserMatch = slotLabel.match(/^Verlierer (.+)$/)
        if (loserMatch) {
          return get().getKOLoser(loserMatch[1])
        }

        return null
      },

      getKOMatchWithTeams: (matchId) => {
        const base = KO_MATCH_MAP[matchId]
        if (!base) return base
        const { getKOTeamId, scores } = get()
        const slot1TeamId = getKOTeamId(base.slot1.label)
        const slot2TeamId = getKOTeamId(base.slot2.label)
        const score = scores[matchId]
        const winnerId = get().getKOWinner(matchId)
        return {
          ...base,
          slot1: { ...base.slot1, teamId: slot1TeamId },
          slot2: { ...base.slot2, teamId: slot2TeamId },
          winnerId,
        }
      },

      getKOWinner: (matchId) => {
        const { scores, getKOTeamId } = get()
        const base = KO_MATCH_MAP[matchId]
        if (!base) return null
        const score = scores[matchId]
        if (score?.home == null || score?.away == null) return null
        const t1 = getKOTeamId(base.slot1.label)
        const t2 = getKOTeamId(base.slot2.label)
        if (!t1 || !t2) return null
        if (score.home > score.away) return t1
        if (score.away > score.home) return t2
        return null // draw = still open (extra time / penalties not modeled)
      },

      getKOLoser: (matchId) => {
        const { getKOWinner, getKOTeamId } = get()
        const base = KO_MATCH_MAP[matchId]
        if (!base) return null
        const winner = getKOWinner(matchId)
        if (!winner) return null
        const t1 = getKOTeamId(base.slot1.label)
        const t2 = getKOTeamId(base.slot2.label)
        return winner === t1 ? t2 : t1
      },

      loadApiData: async () => {
        try {
          const res = await fetch('/api/wm-data')
          if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            console.error('wm-data API error:', err)
            return
          }
          const { scores: apiScores, dateFixes: apiFixes, count } = await res.json()
          // Merge: API fills blanks, manual input wins
          set((state) => {
            const merged: typeof apiScores = { ...(count ? apiScores : {}) }
            for (const [matchId, score] of Object.entries(state.scores)) {
              const s = score as { home: number | null; away: number | null }
              if (s.home != null || s.away != null) {
                merged[matchId] = s
              }
            }
            return { scores: merged, dateFixes: apiFixes ?? {}, apiLoaded: true }
          })
        } catch (e) {
          console.error('loadApiData failed:', e)
        }
      },
    }),
    {
      name: 'wm2026-store',
      partialize: (state) => ({
        scores: state.scores,
      }),
      skipHydration: true,
    }
  )
)
