import { Score } from '@/types'

const API_BASE = 'https://api.football-data.org/v4'

// Maps football-data.org English team names → our team IDs
const API_NAME_TO_ID: Record<string, string> = {
  // Gruppe A
  'Mexico': 'MEX',
  'South Africa': 'RSA',
  'Korea Republic': 'KOR',
  'Czech Republic': 'CZE',
  'Czechia': 'CZE',
  // Gruppe B
  'Canada': 'CAN',
  'Bosnia and Herzegovina': 'BIH',
  'Qatar': 'QAT',
  'Switzerland': 'SUI',
  // Gruppe C
  'Brazil': 'BRA',
  'Morocco': 'MAR',
  'Haiti': 'HAI',
  'Scotland': 'SCO',
  // Gruppe D
  'United States': 'USA',
  'USA': 'USA',
  'Paraguay': 'PAR',
  'Australia': 'AUS',
  'Turkey': 'TUR',
  'Türkiye': 'TUR',
  // Gruppe E
  'Germany': 'GER',
  'Curaçao': 'CUW',
  'Curacao': 'CUW',
  "Côte d'Ivoire": 'CIV',
  "Cote d'Ivoire": 'CIV',
  'Ivory Coast': 'CIV',
  'Ecuador': 'ECU',
  // Gruppe F
  'Netherlands': 'NED',
  'Japan': 'JPN',
  'Sweden': 'SWE',
  'Tunisia': 'TUN',
  // Gruppe G
  'Belgium': 'BEL',
  'Egypt': 'EGY',
  'Iran': 'IRN',
  'New Zealand': 'NZL',
  // Gruppe H
  'Spain': 'ESP',
  'Cape Verde': 'CPV',
  'Cabo Verde': 'CPV',
  'Saudi Arabia': 'KSA',
  'Uruguay': 'URU',
  // Gruppe I
  'France': 'FRA',
  'Senegal': 'SEN',
  'Iraq': 'IRQ',
  'Norway': 'NOR',
  // Gruppe J
  'Argentina': 'ARG',
  'Algeria': 'ALG',
  'Austria': 'AUT',
  'Jordan': 'JOR',
  // Gruppe K
  'Portugal': 'POR',
  'DR Congo': 'COD',
  'Congo DR': 'COD',
  'Congo': 'COD',
  'Uzbekistan': 'UZB',
  'Colombia': 'COL',
  // Gruppe L
  'England': 'ENG',
  'Croatia': 'CRO',
  'Ghana': 'GHA',
  'Panama': 'PAN',
}

interface ApiMatch {
  id: number
  homeTeam: { name: string; shortName?: string }
  awayTeam: { name: string; shortName?: string }
  score: {
    fullTime: { home: number | null; away: number | null }
    halfTime: { home: number | null; away: number | null }
  }
  status: 'SCHEDULED' | 'TIMED' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'SUSPENDED' | 'POSTPONED' | 'CANCELLED' | 'AWARDED'
  utcDate: string
}

function resolveTeamId(name: string): string | null {
  return API_NAME_TO_ID[name] ?? null
}

// Fetches all WM 2026 group stage matches and returns scores indexed by our match IDs.
// Our match ID format: e.g. "A1" = Group A, match 1 = homeTeamId_awayTeamId lookup
export async function fetchWMScores(): Promise<Record<string, Score>> {
  const key = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY
  if (!key) return {}

  const res = await fetch(`${API_BASE}/competitions/2000/matches?season=2026`, {
    headers: { 'X-Auth-Token': key },
    next: { revalidate: 60 }, // cache for 60s in Next.js
  })

  if (!res.ok) {
    console.error('football-data.org API error:', res.status, await res.text())
    return {}
  }

  const data: { matches: ApiMatch[] } = await res.json()
  const scores: Record<string, Score> = {}

  // Build a lookup: "HOMEID_AWAYID" → our match ID
  // We do this lazily by importing the group matches
  const { GROUP_MATCHES } = await import('@/lib/data/groups')
  const matchLookup: Record<string, string> = {}
  for (const m of GROUP_MATCHES) {
    matchLookup[`${m.homeTeamId}_${m.awayTeamId}`] = m.id
  }

  for (const apiMatch of data.matches) {
    // Only process finished or in-play matches
    if (apiMatch.status !== 'FINISHED' && apiMatch.status !== 'IN_PLAY' && apiMatch.status !== 'PAUSED') {
      continue
    }
    if (apiMatch.score.fullTime.home == null || apiMatch.score.fullTime.away == null) {
      continue
    }

    const homeId = resolveTeamId(apiMatch.homeTeam.name)
    const awayId = resolveTeamId(apiMatch.awayTeam.name)
    if (!homeId || !awayId) {
      console.warn('Unknown team:', apiMatch.homeTeam.name, 'vs', apiMatch.awayTeam.name)
      continue
    }

    const ourMatchId = matchLookup[`${homeId}_${awayId}`]
    if (!ourMatchId) continue

    scores[ourMatchId] = {
      home: apiMatch.score.fullTime.home,
      away: apiMatch.score.fullTime.away,
    }
  }

  return scores
}
