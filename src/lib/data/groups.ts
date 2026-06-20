import { Team, Match } from '@/types'

export const TEAMS: Team[] = [
  // Gruppe A
  { id: 'MEX', name: 'Mexiko', flag: '🇲🇽', group: 'A' },
  { id: 'RSA', name: 'Südafrika', flag: '🇿🇦', group: 'A' },
  { id: 'KOR', name: 'Südkorea', flag: '🇰🇷', group: 'A' },
  { id: 'CZE', name: 'Tschechien', flag: '🇨🇿', group: 'A' },
  // Gruppe B
  { id: 'CAN', name: 'Kanada', flag: '🇨🇦', group: 'B' },
  { id: 'BIH', name: 'Bosnien-Herzeg.', flag: '🇧🇦', group: 'B' },
  { id: 'QAT', name: 'Katar', flag: '🇶🇦', group: 'B' },
  { id: 'SUI', name: 'Schweiz', flag: '🇨🇭', group: 'B' },
  // Gruppe C
  { id: 'BRA', name: 'Brasilien', flag: '🇧🇷', group: 'C' },
  { id: 'MAR', name: 'Marokko', flag: '🇲🇦', group: 'C' },
  { id: 'HAI', name: 'Haiti', flag: '🇭🇹', group: 'C' },
  { id: 'SCO', name: 'Schottland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C' },
  // Gruppe D
  { id: 'USA', name: 'USA', flag: '🇺🇸', group: 'D' },
  { id: 'PAR', name: 'Paraguay', flag: '🇵🇾', group: 'D' },
  { id: 'AUS', name: 'Australien', flag: '🇦🇺', group: 'D' },
  { id: 'TUR', name: 'Türkei', flag: '🇹🇷', group: 'D' },
  // Gruppe E
  { id: 'GER', name: 'Deutschland', flag: '🇩🇪', group: 'E' },
  { id: 'CUW', name: 'Curaçao', flag: '🇨🇼', group: 'E' },
  { id: 'CIV', name: 'Elfenbeinküste', flag: '🇨🇮', group: 'E' },
  { id: 'ECU', name: 'Ecuador', flag: '🇪🇨', group: 'E' },
  // Gruppe F
  { id: 'NED', name: 'Niederlande', flag: '🇳🇱', group: 'F' },
  { id: 'JPN', name: 'Japan', flag: '🇯🇵', group: 'F' },
  { id: 'SWE', name: 'Schweden', flag: '🇸🇪', group: 'F' },
  { id: 'TUN', name: 'Tunesien', flag: '🇹🇳', group: 'F' },
  // Gruppe G
  { id: 'BEL', name: 'Belgien', flag: '🇧🇪', group: 'G' },
  { id: 'EGY', name: 'Ägypten', flag: '🇪🇬', group: 'G' },
  { id: 'IRN', name: 'Iran', flag: '🇮🇷', group: 'G' },
  { id: 'NZL', name: 'Neuseeland', flag: '🇳🇿', group: 'G' },
  // Gruppe H
  { id: 'ESP', name: 'Spanien', flag: '🇪🇸', group: 'H' },
  { id: 'CPV', name: 'Kap Verde', flag: '🇨🇻', group: 'H' },
  { id: 'KSA', name: 'Saudi-Arabien', flag: '🇸🇦', group: 'H' },
  { id: 'URU', name: 'Uruguay', flag: '🇺🇾', group: 'H' },
  // Gruppe I
  { id: 'FRA', name: 'Frankreich', flag: '🇫🇷', group: 'I' },
  { id: 'SEN', name: 'Senegal', flag: '🇸🇳', group: 'I' },
  { id: 'IRQ', name: 'Irak', flag: '🇮🇶', group: 'I' },
  { id: 'NOR', name: 'Norwegen', flag: '🇳🇴', group: 'I' },
  // Gruppe J
  { id: 'ARG', name: 'Argentinien', flag: '🇦🇷', group: 'J' },
  { id: 'ALG', name: 'Algerien', flag: '🇩🇿', group: 'J' },
  { id: 'AUT', name: 'Österreich', flag: '🇦🇹', group: 'J' },
  { id: 'JOR', name: 'Jordanien', flag: '🇯🇴', group: 'J' },
  // Gruppe K
  { id: 'POR', name: 'Portugal', flag: '🇵🇹', group: 'K' },
  { id: 'COD', name: 'DR Kongo', flag: '🇨🇩', group: 'K' },
  { id: 'UZB', name: 'Usbekistan', flag: '🇺🇿', group: 'K' },
  { id: 'COL', name: 'Kolumbien', flag: '🇨🇴', group: 'K' },
  // Gruppe L
  { id: 'ENG', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L' },
  { id: 'CRO', name: 'Kroatien', flag: '🇭🇷', group: 'L' },
  { id: 'GHA', name: 'Ghana', flag: '🇬🇭', group: 'L' },
  { id: 'PAN', name: 'Panama', flag: '🇵🇦', group: 'L' },
]

export const TEAM_MAP: Record<string, Team> = Object.fromEntries(
  TEAMS.map((t) => [t.id, t])
)

export const GROUPS: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export function getGroupTeams(group: string): Team[] {
  return TEAMS.filter((t) => t.group === group)
}

// All 72 group stage matches. Dates are in UTC (MESZ = UTC+2, so 21:00 MESZ = 19:00 UTC)
export const GROUP_MATCHES: Match[] = [
  // ── Gruppe A ──
  { id: 'A1', group: 'A', homeTeamId: 'MEX', awayTeamId: 'RSA', date: '2026-06-11T19:00:00Z', venue: 'SoFi Stadium', city: 'Inglewood' },
  { id: 'A2', group: 'A', homeTeamId: 'KOR', awayTeamId: 'CZE', date: '2026-06-12T02:00:00Z', venue: 'MetLife Stadium', city: 'East Rutherford' },
  { id: 'A3', group: 'A', homeTeamId: 'CZE', awayTeamId: 'RSA', date: '2026-06-16T19:00:00Z', venue: 'MetLife Stadium', city: 'East Rutherford' },
  { id: 'A4', group: 'A', homeTeamId: 'MEX', awayTeamId: 'KOR', date: '2026-06-16T16:00:00Z', venue: 'Rose Bowl', city: 'Pasadena' },
  { id: 'A5', group: 'A', homeTeamId: 'CZE', awayTeamId: 'MEX', date: '2026-06-20T23:00:00Z', venue: 'Rose Bowl', city: 'Pasadena' },
  { id: 'A6', group: 'A', homeTeamId: 'RSA', awayTeamId: 'KOR', date: '2026-06-20T23:00:00Z', venue: 'SoFi Stadium', city: 'Inglewood' },

  // ── Gruppe B ──
  { id: 'B1', group: 'B', homeTeamId: 'CAN', awayTeamId: 'BIH', date: '2026-06-12T22:00:00Z', venue: 'BC Place', city: 'Vancouver' },
  { id: 'B2', group: 'B', homeTeamId: 'QAT', awayTeamId: 'SUI', date: '2026-06-13T11:00:00Z', venue: 'Empower Field', city: 'Denver' },
  { id: 'B3', group: 'B', homeTeamId: 'SUI', awayTeamId: 'BIH', date: '2026-06-16T16:00:00Z', venue: 'Empower Field', city: 'Denver' },
  { id: 'B4', group: 'B', homeTeamId: 'CAN', awayTeamId: 'QAT', date: '2026-06-17T17:00:00Z', venue: 'BC Place', city: 'Vancouver' },
  { id: 'B5', group: 'B', homeTeamId: 'SUI', awayTeamId: 'CAN', date: '2026-06-21T19:00:00Z', venue: 'Empower Field', city: 'Denver' },
  { id: 'B6', group: 'B', homeTeamId: 'BIH', awayTeamId: 'QAT', date: '2026-06-21T19:00:00Z', venue: 'BC Place', city: 'Vancouver' },

  // ── Gruppe C ──
  { id: 'C1', group: 'C', homeTeamId: 'BRA', awayTeamId: 'MAR', date: '2026-06-13T22:00:00Z', venue: 'Rose Bowl', city: 'Pasadena' },
  { id: 'C2', group: 'C', homeTeamId: 'HAI', awayTeamId: 'SCO', date: '2026-06-14T11:00:00Z', venue: 'AT&T Stadium', city: 'Arlington' },
  { id: 'C3', group: 'C', homeTeamId: 'SCO', awayTeamId: 'MAR', date: '2026-06-18T00:30:00Z', venue: 'AT&T Stadium', city: 'Arlington' },
  { id: 'C4', group: 'C', homeTeamId: 'BRA', awayTeamId: 'HAI', date: '2026-06-18T19:00:00Z', venue: 'Rose Bowl', city: 'Pasadena' },
  { id: 'C5', group: 'C', homeTeamId: 'SCO', awayTeamId: 'BRA', date: '2026-06-22T23:00:00Z', venue: 'Rose Bowl', city: 'Pasadena' },
  { id: 'C6', group: 'C', homeTeamId: 'MAR', awayTeamId: 'HAI', date: '2026-06-22T23:00:00Z', venue: 'AT&T Stadium', city: 'Arlington' },

  // ── Gruppe D ──
  { id: 'D1', group: 'D', homeTeamId: 'USA', awayTeamId: 'PAR', date: '2026-06-13T01:00:00Z', venue: 'SoFi Stadium', city: 'Inglewood' },
  { id: 'D2', group: 'D', homeTeamId: 'AUS', awayTeamId: 'TUR', date: '2026-06-14T04:00:00Z', venue: 'MetLife Stadium', city: 'East Rutherford' },
  { id: 'D3', group: 'D', homeTeamId: 'USA', awayTeamId: 'AUS', date: '2026-06-17T23:00:00Z', venue: 'SoFi Stadium', city: 'Inglewood' },
  { id: 'D4', group: 'D', homeTeamId: 'TUR', awayTeamId: 'PAR', date: '2026-06-18T03:30:00Z', venue: 'MetLife Stadium', city: 'East Rutherford' },
  { id: 'D5', group: 'D', homeTeamId: 'TUR', awayTeamId: 'USA', date: '2026-06-24T04:00:00Z', venue: 'MetLife Stadium', city: 'East Rutherford' },
  { id: 'D6', group: 'D', homeTeamId: 'PAR', awayTeamId: 'AUS', date: '2026-06-24T04:00:00Z', venue: 'SoFi Stadium', city: 'Inglewood' },

  // ── Gruppe E ──
  { id: 'E1', group: 'E', homeTeamId: 'GER', awayTeamId: 'CUW', date: '2026-06-14T17:00:00Z', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { id: 'E2', group: 'E', homeTeamId: 'CIV', awayTeamId: 'ECU', date: '2026-06-15T13:00:00Z', venue: 'Levi\'s Stadium', city: 'Santa Clara' },
  { id: 'E3', group: 'E', homeTeamId: 'GER', awayTeamId: 'CIV', date: '2026-06-19T20:00:00Z', venue: 'Levi\'s Stadium', city: 'Santa Clara' },
  { id: 'E4', group: 'E', homeTeamId: 'ECU', awayTeamId: 'CUW', date: '2026-06-19T17:00:00Z', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { id: 'E5', group: 'E', homeTeamId: 'ECU', awayTeamId: 'GER', date: '2026-06-23T20:00:00Z', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { id: 'E6', group: 'E', homeTeamId: 'CUW', awayTeamId: 'CIV', date: '2026-06-23T20:00:00Z', venue: 'Levi\'s Stadium', city: 'Santa Clara' },

  // ── Gruppe F ──
  { id: 'F1', group: 'F', homeTeamId: 'NED', awayTeamId: 'JPN', date: '2026-06-15T03:00:00Z', venue: 'Lumen Field', city: 'Seattle' },
  { id: 'F2', group: 'F', homeTeamId: 'SWE', awayTeamId: 'TUN', date: '2026-06-15T17:00:00Z', venue: 'Lumen Field', city: 'Seattle' },
  { id: 'F3', group: 'F', homeTeamId: 'NED', awayTeamId: 'SWE', date: '2026-06-19T03:00:00Z', venue: 'Lumen Field', city: 'Seattle' },
  { id: 'F4', group: 'F', homeTeamId: 'JPN', awayTeamId: 'TUN', date: '2026-06-19T00:00:00Z', venue: 'Lumen Field', city: 'Seattle' },
  { id: 'F5', group: 'F', homeTeamId: 'TUN', awayTeamId: 'NED', date: '2026-06-23T04:00:00Z', venue: 'Lumen Field', city: 'Seattle' },
  { id: 'F6', group: 'F', homeTeamId: 'JPN', awayTeamId: 'SWE', date: '2026-06-23T04:00:00Z', venue: 'Lumen Field', city: 'Seattle' },

  // ── Gruppe G ──
  { id: 'G1', group: 'G', homeTeamId: 'BEL', awayTeamId: 'EGY', date: '2026-06-15T19:00:00Z', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { id: 'G2', group: 'G', homeTeamId: 'IRN', awayTeamId: 'NZL', date: '2026-06-16T01:00:00Z', venue: 'Empower Field', city: 'Denver' },
  { id: 'G3', group: 'G', homeTeamId: 'BEL', awayTeamId: 'IRN', date: '2026-06-19T19:00:00Z', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { id: 'G4', group: 'G', homeTeamId: 'NZL', awayTeamId: 'EGY', date: '2026-06-20T01:00:00Z', venue: 'Empower Field', city: 'Denver' },
  { id: 'G5', group: 'G', homeTeamId: 'NZL', awayTeamId: 'BEL', date: '2026-06-25T03:00:00Z', venue: 'Empower Field', city: 'Denver' },
  { id: 'G6', group: 'G', homeTeamId: 'EGY', awayTeamId: 'IRN', date: '2026-06-25T03:00:00Z', venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },

  // ── Gruppe H ──
  { id: 'H1', group: 'H', homeTeamId: 'ESP', awayTeamId: 'CPV', date: '2026-06-15T16:00:00Z', venue: 'Estadio Azteca', city: 'Mexiko-Stadt' },
  { id: 'H2', group: 'H', homeTeamId: 'KSA', awayTeamId: 'URU', date: '2026-06-16T14:00:00Z', venue: 'Estadio Azteca', city: 'Mexiko-Stadt' },
  { id: 'H3', group: 'H', homeTeamId: 'ESP', awayTeamId: 'KSA', date: '2026-06-19T16:00:00Z', venue: 'Estadio Azteca', city: 'Mexiko-Stadt' },
  { id: 'H4', group: 'H', homeTeamId: 'URU', awayTeamId: 'CPV', date: '2026-06-20T00:00:00Z', venue: 'Estadio Azteca', city: 'Mexiko-Stadt' },
  { id: 'H5', group: 'H', homeTeamId: 'URU', awayTeamId: 'ESP', date: '2026-06-25T19:00:00Z', venue: 'Estadio Azteca', city: 'Mexiko-Stadt' },
  { id: 'H6', group: 'H', homeTeamId: 'CPV', awayTeamId: 'KSA', date: '2026-06-25T19:00:00Z', venue: 'Estadio Azteca', city: 'Mexiko-Stadt' },

  // ── Gruppe I ──
  { id: 'I1', group: 'I', homeTeamId: 'FRA', awayTeamId: 'SEN', date: '2026-06-16T14:00:00Z', venue: 'AT&T Stadium', city: 'Arlington' },
  { id: 'I2', group: 'I', homeTeamId: 'IRQ', awayTeamId: 'NOR', date: '2026-06-16T15:00:00Z', venue: 'Estadio Akron', city: 'Guadalajara' },
  { id: 'I3', group: 'I', homeTeamId: 'FRA', awayTeamId: 'IRQ', date: '2026-06-20T21:00:00Z', venue: 'AT&T Stadium', city: 'Arlington' },
  { id: 'I4', group: 'I', homeTeamId: 'NOR', awayTeamId: 'SEN', date: '2026-06-21T01:00:00Z', venue: 'Estadio Akron', city: 'Guadalajara' },
  { id: 'I5', group: 'I', homeTeamId: 'NOR', awayTeamId: 'FRA', date: '2026-06-24T19:00:00Z', venue: 'Estadio Akron', city: 'Guadalajara' },
  { id: 'I6', group: 'I', homeTeamId: 'SEN', awayTeamId: 'IRQ', date: '2026-06-24T19:00:00Z', venue: 'AT&T Stadium', city: 'Arlington' },

  // ── Gruppe J ──
  { id: 'J1', group: 'J', homeTeamId: 'ARG', awayTeamId: 'ALG', date: '2026-06-17T01:00:00Z', venue: 'MetLife Stadium', city: 'East Rutherford' },
  { id: 'J2', group: 'J', homeTeamId: 'AUT', awayTeamId: 'JOR', date: '2026-06-17T04:00:00Z', venue: 'Levi\'s Stadium', city: 'Santa Clara' },
  { id: 'J3', group: 'J', homeTeamId: 'ARG', awayTeamId: 'AUT', date: '2026-06-21T17:00:00Z', venue: 'MetLife Stadium', city: 'East Rutherford' },
  { id: 'J4', group: 'J', homeTeamId: 'JOR', awayTeamId: 'ALG', date: '2026-06-21T03:00:00Z', venue: 'Levi\'s Stadium', city: 'Santa Clara' },
  { id: 'J5', group: 'J', homeTeamId: 'JOR', awayTeamId: 'ARG', date: '2026-06-26T02:00:00Z', venue: 'Levi\'s Stadium', city: 'Santa Clara' },
  { id: 'J6', group: 'J', homeTeamId: 'ALG', awayTeamId: 'AUT', date: '2026-06-26T02:00:00Z', venue: 'MetLife Stadium', city: 'East Rutherford' },

  // ── Gruppe K ──
  { id: 'K1', group: 'K', homeTeamId: 'POR', awayTeamId: 'COD', date: '2026-06-17T17:00:00Z', venue: 'Estadio BBVA', city: 'Monterrey' },
  { id: 'K2', group: 'K', homeTeamId: 'UZB', awayTeamId: 'COL', date: '2026-06-18T02:00:00Z', venue: 'BC Place', city: 'Vancouver' },
  { id: 'K3', group: 'K', homeTeamId: 'POR', awayTeamId: 'UZB', date: '2026-06-21T17:00:00Z', venue: 'BC Place', city: 'Vancouver' },
  { id: 'K4', group: 'K', homeTeamId: 'COL', awayTeamId: 'COD', date: '2026-06-21T17:00:00Z', venue: 'Estadio BBVA', city: 'Monterrey' },
  { id: 'K5', group: 'K', homeTeamId: 'COL', awayTeamId: 'POR', date: '2026-06-26T01:30:00Z', venue: 'BC Place', city: 'Vancouver' },
  { id: 'K6', group: 'K', homeTeamId: 'COD', awayTeamId: 'UZB', date: '2026-06-26T01:30:00Z', venue: 'Estadio BBVA', city: 'Monterrey' },

  // ── Gruppe L ──
  { id: 'L1', group: 'L', homeTeamId: 'ENG', awayTeamId: 'CRO', date: '2026-06-17T20:00:00Z', venue: 'MetLife Stadium', city: 'East Rutherford' },
  { id: 'L2', group: 'L', homeTeamId: 'GHA', awayTeamId: 'PAN', date: '2026-06-18T16:00:00Z', venue: 'SoFi Stadium', city: 'Inglewood' },
  { id: 'L3', group: 'L', homeTeamId: 'ENG', awayTeamId: 'GHA', date: '2026-06-21T22:00:00Z', venue: 'SoFi Stadium', city: 'Inglewood' },
  { id: 'L4', group: 'L', homeTeamId: 'PAN', awayTeamId: 'CRO', date: '2026-06-21T19:00:00Z', venue: 'MetLife Stadium', city: 'East Rutherford' },
  { id: 'L5', group: 'L', homeTeamId: 'PAN', awayTeamId: 'ENG', date: '2026-06-25T21:00:00Z', venue: 'MetLife Stadium', city: 'East Rutherford' },
  { id: 'L6', group: 'L', homeTeamId: 'CRO', awayTeamId: 'GHA', date: '2026-06-25T21:00:00Z', venue: 'SoFi Stadium', city: 'Inglewood' },
]

export const GROUP_MATCHES_BY_GROUP: Record<string, Match[]> = {}
for (const m of GROUP_MATCHES) {
  if (!GROUP_MATCHES_BY_GROUP[m.group]) GROUP_MATCHES_BY_GROUP[m.group] = []
  GROUP_MATCHES_BY_GROUP[m.group].push(m)
}
