export interface Team {
  id: string
  name: string
  flag: string
  group: string
}

export interface Match {
  id: string
  group: string
  homeTeamId: string
  awayTeamId: string
  date: string // ISO 8601 UTC
  venue: string
  city: string
}

export interface Score {
  home: number | null
  away: number | null
}

export interface GroupStanding {
  teamId: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
}

export type KORound =
  | 'r32'
  | 'r16'
  | 'qf'
  | 'sf'
  | 'third'
  | 'final'

export interface KOSlot {
  teamId: string | null
  label: string // e.g. "1. Gruppe E" or "3. A/B/C/D/F"
}

export interface KOMatch {
  id: string
  round: KORound
  slot1: KOSlot
  slot2: KOSlot
  date: string
  venue: string
  city: string
  winnerId: string | null
  // scores stored in the zustand store under ko_<id>
}

export interface BracketNode {
  match: KOMatch
  children?: [BracketNode, BracketNode]
}

export type Theme = 'dark' | 'light'
