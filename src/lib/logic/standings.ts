import { Match, Score, GroupStanding } from '@/types'

export function calculateStandings(
  matches: Match[],
  scores: Record<string, Score>
): GroupStanding[] {
  const stats: Record<string, GroupStanding> = {}

  const teamIds = new Set<string>()
  for (const m of matches) {
    teamIds.add(m.homeTeamId)
    teamIds.add(m.awayTeamId)
  }

  for (const id of teamIds) {
    stats[id] = {
      teamId: id,
      played: 0, won: 0, drawn: 0, lost: 0,
      goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0,
    }
  }

  for (const m of matches) {
    const score = scores[m.id]
    if (score?.home == null || score?.away == null) continue

    const h = score.home
    const a = score.away
    const home = stats[m.homeTeamId]
    const away = stats[m.awayTeamId]

    home.played++; away.played++
    home.goalsFor += h; home.goalsAgainst += a
    away.goalsFor += a; away.goalsAgainst += h

    if (h > a) {
      home.won++; home.points += 3; away.lost++
    } else if (h < a) {
      away.won++; away.points += 3; home.lost++
    } else {
      home.drawn++; home.points += 1
      away.drawn++; away.points += 1
    }
  }

  for (const s of Object.values(stats)) {
    s.goalDiff = s.goalsFor - s.goalsAgainst
  }

  const standings = Object.values(stats)

  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor

    // Head-to-head between tied teams
    const tiedIds = standings
      .filter(s => s.points === a.points && s.goalDiff === a.goalDiff && s.goalsFor === a.goalsFor)
      .map(s => s.teamId)

    if (tiedIds.length > 1 && tiedIds.includes(a.teamId) && tiedIds.includes(b.teamId)) {
      const h2hMatches = matches.filter(
        m => tiedIds.includes(m.homeTeamId) && tiedIds.includes(m.awayTeamId)
      )
      const h2hScore = (id: string) => {
        let pts = 0, gd = 0, gf = 0
        for (const m of h2hMatches) {
          const score = scores[m.id]
          if (score?.home == null || score?.away == null) continue
          if (m.homeTeamId === id) {
            if (score.home > score.away) pts += 3
            else if (score.home === score.away) pts += 1
            gd += score.home - score.away
            gf += score.home
          } else if (m.awayTeamId === id) {
            if (score.away > score.home) pts += 3
            else if (score.away === score.home) pts += 1
            gd += score.away - score.home
            gf += score.away
          }
        }
        return { pts, gd, gf }
      }
      const ha = h2hScore(a.teamId)
      const hb = h2hScore(b.teamId)
      if (hb.pts !== ha.pts) return hb.pts - ha.pts
      if (hb.gd !== ha.gd) return hb.gd - ha.gd
      if (hb.gf !== ha.gf) return hb.gf - ha.gf
    }

    return a.teamId.localeCompare(b.teamId)
  })

  return standings
}
