import { NextResponse } from 'next/server'
import { GROUP_MATCHES } from '@/lib/data/groups'
import { Score } from '@/types'

const API_NAME_TO_ID: Record<string, string> = {
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

// Build lookup once: "HOMEID_AWAYID" → our match ID
const MATCH_LOOKUP: Record<string, string> = {}
for (const m of GROUP_MATCHES) {
  MATCH_LOOKUP[`${m.homeTeamId}_${m.awayTeamId}`] = m.id
}

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'No API key configured' }, { status: 500 })
  }

  const res = await fetch(
    'https://api.football-data.org/v4/competitions/2000/matches?season=2026',
    {
      headers: { 'X-Auth-Token': apiKey },
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({ error: `API error ${res.status}: ${text}` }, { status: 502 })
  }

  const data: { matches: Array<{
    homeTeam: { name: string }
    awayTeam: { name: string }
    score: { fullTime: { home: number | null; away: number | null } }
    status: string
  }> } = await res.json()

  const scores: Record<string, Score> = {}

  for (const match of data.matches) {
    if (match.status !== 'FINISHED' && match.status !== 'IN_PLAY' && match.status !== 'PAUSED') continue
    if (match.score.fullTime.home == null || match.score.fullTime.away == null) continue

    const homeId = API_NAME_TO_ID[match.homeTeam.name]
    const awayId = API_NAME_TO_ID[match.awayTeam.name]
    if (!homeId || !awayId) continue

    const matchId = MATCH_LOOKUP[`${homeId}_${awayId}`]
    if (!matchId) continue

    scores[matchId] = {
      home: match.score.fullTime.home,
      away: match.score.fullTime.away,
    }
  }

  return NextResponse.json({ scores, count: Object.keys(scores).length })
}
