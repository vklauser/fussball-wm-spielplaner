import { KOMatch } from '@/types'

// Round of 32 (Sechzehntelfinale) — 16 matches
// Dates are UTC (MESZ = UTC+2)
export const R32_MATCHES: KOMatch[] = [
  // ── Left bracket half ──
  {
    id: 'r32_L1',
    round: 'r32',
    slot1: { teamId: null, label: '2. Gruppe A' },
    slot2: { teamId: null, label: '2. Gruppe B' },
    date: '2026-06-28T19:00:00Z',
    venue: 'SoFi Stadium',
    city: 'Inglewood',
    winnerId: null,
  },
  {
    id: 'r32_L2',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe E' },
    slot2: { teamId: null, label: '3. A/B/C/D/F' },
    date: '2026-06-29T20:30:00Z',
    venue: 'Gillette Stadium',
    city: 'Foxborough',
    winnerId: null,
  },
  {
    id: 'r32_L3',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe F' },
    slot2: { teamId: null, label: '2. Gruppe C' },
    date: '2026-06-30T01:00:00Z',
    venue: 'Estadio Akron',
    city: 'Guadalajara',
    winnerId: null,
  },
  {
    id: 'r32_L4',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe I' },
    slot2: { teamId: null, label: '3. C/D/F/G/H' },
    date: '2026-06-30T21:00:00Z',
    venue: 'MetLife Stadium',
    city: 'East Rutherford',
    winnerId: null,
  },
  {
    id: 'r32_L5',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe D' },
    slot2: { teamId: null, label: '3. B/E/F/I/J' },
    date: '2026-07-02T00:00:00Z',
    venue: 'Levi\'s Stadium',
    city: 'Santa Clara',
    winnerId: null,
  },
  {
    id: 'r32_L6',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe H' },
    slot2: { teamId: null, label: '2. Gruppe J' },
    date: '2026-07-02T19:00:00Z',
    venue: 'SoFi Stadium',
    city: 'Inglewood',
    winnerId: null,
  },
  {
    id: 'r32_L7',
    round: 'r32',
    slot1: { teamId: null, label: '2. Gruppe K' },
    slot2: { teamId: null, label: '2. Gruppe L' },
    date: '2026-07-02T23:00:00Z',
    venue: 'BMO Field',
    city: 'Toronto',
    winnerId: null,
  },
  {
    id: 'r32_L8',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe G' },
    slot2: { teamId: null, label: '3. A/E/H/I/J' },
    date: '2026-07-01T20:00:00Z',
    venue: 'Lumen Field',
    city: 'Seattle',
    winnerId: null,
  },

  // ── Right bracket half ──
  {
    id: 'r32_R1',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe C' },
    slot2: { teamId: null, label: '2. Gruppe F' },
    date: '2026-06-29T17:00:00Z',
    venue: 'NRG Stadium',
    city: 'Houston',
    winnerId: null,
  },
  {
    id: 'r32_R2',
    round: 'r32',
    slot1: { teamId: null, label: '2. Gruppe E' },
    slot2: { teamId: null, label: '2. Gruppe I' },
    date: '2026-06-30T17:00:00Z',
    venue: 'AT&T Stadium',
    city: 'Arlington',
    winnerId: null,
  },
  {
    id: 'r32_R3',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe A' },
    slot2: { teamId: null, label: '3. C/E/F/H/I' },
    date: '2026-07-01T01:00:00Z',
    venue: 'Estadio Azteca',
    city: 'Mexiko-Stadt',
    winnerId: null,
  },
  {
    id: 'r32_R4',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe L' },
    slot2: { teamId: null, label: '3. E/H/I/J/K' },
    date: '2026-07-01T16:00:00Z',
    venue: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    winnerId: null,
  },
  {
    id: 'r32_R5',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe B' },
    slot2: { teamId: null, label: '3. E/F/G/I/J' },
    date: '2026-07-03T03:00:00Z',
    venue: 'BC Place',
    city: 'Vancouver',
    winnerId: null,
  },
  {
    id: 'r32_R6',
    round: 'r32',
    slot1: { teamId: null, label: '2. Gruppe D' },
    slot2: { teamId: null, label: '2. Gruppe G' },
    date: '2026-07-03T18:00:00Z',
    venue: 'AT&T Stadium',
    city: 'Arlington',
    winnerId: null,
  },
  {
    id: 'r32_R7',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe J' },
    slot2: { teamId: null, label: '2. Gruppe H' },
    date: '2026-07-03T22:00:00Z',
    venue: 'Hard Rock Stadium',
    city: 'Miami Gardens',
    winnerId: null,
  },
  {
    id: 'r32_R8',
    round: 'r32',
    slot1: { teamId: null, label: '1. Gruppe K' },
    slot2: { teamId: null, label: '3. D/E/I/J/L' },
    date: '2026-07-04T01:30:00Z',
    venue: 'Arrowhead Stadium',
    city: 'Kansas City',
    winnerId: null,
  },
]

// Round of 16 (Achtelfinale) — 8 matches
export const R16_MATCHES: KOMatch[] = [
  // Left: winner(r32_L1/L2) vs winner(r32_L3/L4), winner(r32_L5/L6) vs winner(r32_L7/L8)
  { id: 'r16_L1', round: 'r16', slot1: { teamId: null, label: 'Sieger r32_L1' }, slot2: { teamId: null, label: 'Sieger r32_L2' }, date: '2026-07-04T21:00:00Z', venue: 'Lincoln Financial Field', city: 'Philadelphia', winnerId: null },
  { id: 'r16_L2', round: 'r16', slot1: { teamId: null, label: 'Sieger r32_L3' }, slot2: { teamId: null, label: 'Sieger r32_L4' }, date: '2026-07-04T17:00:00Z', venue: 'NRG Stadium', city: 'Houston', winnerId: null },
  { id: 'r16_L3', round: 'r16', slot1: { teamId: null, label: 'Sieger r32_L5' }, slot2: { teamId: null, label: 'Sieger r32_L6' }, date: '2026-07-07T00:00:00Z', venue: 'AT&T Stadium', city: 'Arlington', winnerId: null },
  { id: 'r16_L4', round: 'r16', slot1: { teamId: null, label: 'Sieger r32_L7' }, slot2: { teamId: null, label: 'Sieger r32_L8' }, date: '2026-07-07T20:00:00Z', venue: 'Lumen Field', city: 'Seattle', winnerId: null },
  // Right
  { id: 'r16_R1', round: 'r16', slot1: { teamId: null, label: 'Sieger r32_R1' }, slot2: { teamId: null, label: 'Sieger r32_R2' }, date: '2026-07-05T20:00:00Z', venue: 'Hard Rock Stadium', city: 'Miami Gardens', winnerId: null },
  { id: 'r16_R2', round: 'r16', slot1: { teamId: null, label: 'Sieger r32_R3' }, slot2: { teamId: null, label: 'Sieger r32_R4' }, date: '2026-07-06T00:00:00Z', venue: 'Estadio Azteca', city: 'Mexiko-Stadt', winnerId: null },
  { id: 'r16_R3', round: 'r16', slot1: { teamId: null, label: 'Sieger r32_R5' }, slot2: { teamId: null, label: 'Sieger r32_R6' }, date: '2026-07-07T22:00:00Z', venue: 'BC Place', city: 'Vancouver', winnerId: null },
  { id: 'r16_R4', round: 'r16', slot1: { teamId: null, label: 'Sieger r32_R7' }, slot2: { teamId: null, label: 'Sieger r32_R8' }, date: '2026-07-07T00:00:00Z', venue: 'Arrowhead Stadium', city: 'Kansas City', winnerId: null },
]

// Quarter-finals
export const QF_MATCHES: KOMatch[] = [
  { id: 'qf_L1', round: 'qf', slot1: { teamId: null, label: 'Sieger r16_L1' }, slot2: { teamId: null, label: 'Sieger r16_L2' }, date: '2026-07-09T20:00:00Z', venue: 'Gillette Stadium', city: 'Foxborough', winnerId: null },
  { id: 'qf_L2', round: 'qf', slot1: { teamId: null, label: 'Sieger r16_L3' }, slot2: { teamId: null, label: 'Sieger r16_L4' }, date: '2026-07-10T19:00:00Z', venue: 'SoFi Stadium', city: 'Inglewood', winnerId: null },
  { id: 'qf_R1', round: 'qf', slot1: { teamId: null, label: 'Sieger r16_R1' }, slot2: { teamId: null, label: 'Sieger r16_R2' }, date: '2026-07-11T21:00:00Z', venue: 'Hard Rock Stadium', city: 'Miami Gardens', winnerId: null },
  { id: 'qf_R2', round: 'qf', slot1: { teamId: null, label: 'Sieger r16_R3' }, slot2: { teamId: null, label: 'Sieger r16_R4' }, date: '2026-07-12T01:00:00Z', venue: 'Arrowhead Stadium', city: 'Kansas City', winnerId: null },
]

// Semi-finals
export const SF_MATCHES: KOMatch[] = [
  { id: 'sf_L', round: 'sf', slot1: { teamId: null, label: 'Sieger qf_L1' }, slot2: { teamId: null, label: 'Sieger qf_L2' }, date: '2026-07-14T19:00:00Z', venue: 'AT&T Stadium', city: 'Arlington', winnerId: null },
  { id: 'sf_R', round: 'sf', slot1: { teamId: null, label: 'Sieger qf_R1' }, slot2: { teamId: null, label: 'Sieger qf_R2' }, date: '2026-07-15T19:00:00Z', venue: 'Mercedes-Benz Stadium', city: 'Atlanta', winnerId: null },
]

// Third place & Final
export const THIRD_PLACE_MATCH: KOMatch = {
  id: 'third',
  round: 'third',
  slot1: { teamId: null, label: 'Verlierer sf_L' },
  slot2: { teamId: null, label: 'Verlierer sf_R' },
  date: '2026-07-18T21:00:00Z',
  venue: 'Hard Rock Stadium',
  city: 'Miami Gardens',
  winnerId: null,
}

export const FINAL_MATCH: KOMatch = {
  id: 'final',
  round: 'final',
  slot1: { teamId: null, label: 'Sieger sf_L' },
  slot2: { teamId: null, label: 'Sieger sf_R' },
  date: '2026-07-19T19:00:00Z',
  venue: 'MetLife Stadium',
  city: 'East Rutherford',
  winnerId: null,
}

// Bracket advancement map: matchId → [parentMatchId, slotIndex (1|2)]
// e.g. winner of r32_L1 goes to r16_L1 slot1
export const BRACKET_FLOW: Record<string, [string, 1 | 2]> = {
  r32_L1: ['r16_L1', 1],
  r32_L2: ['r16_L1', 2],
  r32_L3: ['r16_L2', 1],
  r32_L4: ['r16_L2', 2],
  r32_L5: ['r16_L3', 1],
  r32_L6: ['r16_L3', 2],
  r32_L7: ['r16_L4', 1],
  r32_L8: ['r16_L4', 2],

  r32_R1: ['r16_R1', 1],
  r32_R2: ['r16_R1', 2],
  r32_R3: ['r16_R2', 1],
  r32_R4: ['r16_R2', 2],
  r32_R5: ['r16_R3', 1],
  r32_R6: ['r16_R3', 2],
  r32_R7: ['r16_R4', 1],
  r32_R8: ['r16_R4', 2],

  r16_L1: ['qf_L1', 1],
  r16_L2: ['qf_L1', 2],
  r16_L3: ['qf_L2', 1],
  r16_L4: ['qf_L2', 2],
  r16_R1: ['qf_R1', 1],
  r16_R2: ['qf_R1', 2],
  r16_R3: ['qf_R2', 1],
  r16_R4: ['qf_R2', 2],

  qf_L1: ['sf_L', 1],
  qf_L2: ['sf_L', 2],
  qf_R1: ['sf_R', 1],
  qf_R2: ['sf_R', 2],

  sf_L: ['final', 1],
  sf_R: ['final', 2],
}

// Loser flow for third-place match
export const LOSER_FLOW: Record<string, [string, 1 | 2]> = {
  sf_L: ['third', 1],
  sf_R: ['third', 2],
}

export const ALL_KO_MATCHES: KOMatch[] = [
  ...R32_MATCHES,
  ...R16_MATCHES,
  ...QF_MATCHES,
  ...SF_MATCHES,
  THIRD_PLACE_MATCH,
  FINAL_MATCH,
]
