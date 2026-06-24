import { NextResponse } from 'next/server'
import { GROUP_MATCHES } from '@/lib/data/groups'
import { Score } from '@/types'

const TEAM_NAME_TO_ID: Record<string, string> = {
  // Gruppe A
  'Mexico': 'MEX',
  'South Africa': 'RSA',
  'South Korea': 'KOR',
  'Czech Republic': 'CZE',
  'Czechia': 'CZE',
  // Gruppe B
  'Canada': 'CAN',
  'Bosnia-Herzegovina': 'BIH',
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
  'Paraguay': 'PAR',
  'Australia': 'AUS',
  'Turkey': 'TUR',
  'Türkiye': 'TUR',
  // Gruppe E
  'Germany': 'GER',
  'Curaçao': 'CUW',
  'Curacao': 'CUW',
  "Côte d'Ivoire": 'CIV',
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
  'Cape Verde Islands': 'CPV',
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
  'Congo DR': 'COD',
  'DR Congo': 'COD',
  'Uzbekistan': 'UZB',
  'Colombia': 'COL',
  // Gruppe L
  'England': 'ENG',
  'Croatia': 'CRO',
  'Ghana': 'GHA',
  'Panama': 'PAN',
}

// homeTeamId_awayTeamId → our match ID
const MATCH_LOOKUP: Record<string, string> = {}
for (const m of GROUP_MATCHES) {
  MATCH_LOOKUP[`${m.homeTeamId}_${m.awayTeamId}`] = m.id
}

// "2026-06-11" + "13:00 UTC-6" → "2026-06-11T19:00:00Z"
function toUtcIso(date: string, time: string): string | null {
  const m = time.match(/^(\d{1,2}):(\d{2})\s+UTC([+-]\d+)$/)
  if (!m) return null
  const localH = parseInt(m[1], 10)
  const localMin = parseInt(m[2], 10)
  const offset = parseInt(m[3], 10) // e.g. -6 for UTC-6
  // UTC = local - offset
  let utcH = localH - offset
  let dayShift = 0
  if (utcH >= 24) { utcH -= 24; dayShift = 1 }
  if (utcH < 0)   { utcH += 24; dayShift = -1 }

  let utcDate = date
  if (dayShift !== 0) {
    const d = new Date(date + 'T00:00:00Z')
    d.setUTCDate(d.getUTCDate() + dayShift)
    utcDate = d.toISOString().slice(0, 10)
  }

  return `${utcDate}T${String(utcH).padStart(2, '0')}:${String(localMin).padStart(2, '0')}:00Z`
}

interface OpenfootballMatch {
  date: string
  time?: string
  team1: string
  team2: string
  group?: string
  score?: { ft?: number[]; ht?: number[] }
}

export async function GET() {
  const res = await fetch(
    'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json',
    { next: { revalidate: 300 } }
  )

  if (!res.ok) {
    return NextResponse.json({ error: `openfootball fetch failed: ${res.status}` }, { status: 502 })
  }

  const { matches }: { matches: OpenfootballMatch[] } = await res.json()

  const dateFixes: Record<string, string> = {}
  const scores: Record<string, Score> = {}

  for (const match of matches) {
    // Only process group stage matches (have a "group" field and two known team names)
    if (!match.group) continue

    const homeId = TEAM_NAME_TO_ID[match.team1]
    const awayId = TEAM_NAME_TO_ID[match.team2]
    if (!homeId || !awayId) continue

    const matchId = MATCH_LOOKUP[`${homeId}_${awayId}`]
    if (!matchId) continue

    // Date fix
    if (match.date && match.time) {
      const utcIso = toUtcIso(match.date, match.time)
      if (utcIso) dateFixes[matchId] = utcIso
    }

    // Score (only if full-time result available)
    if (match.score?.ft && match.score.ft.length === 2) {
      scores[matchId] = { home: match.score.ft[0], away: match.score.ft[1] }
    }
  }

  return NextResponse.json({
    dateFixes,
    scores,
    count: Object.keys(scores).length,
  })
}
