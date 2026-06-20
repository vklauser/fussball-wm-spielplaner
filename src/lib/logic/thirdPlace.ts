import { GroupStanding } from '@/types'

export interface ThirdPlaceEntry {
  group: string
  standing: GroupStanding
}

// FIFA WM 2026: best 8 of 12 third-place teams advance.
// The bracket slot they fill depends on which groups they came from.
// This is the official FIFA mapping table for WM 2026:
// (groups of the 8 best thirds → which bracket slot they fill)
// The slot labels in bracket.ts use these group-combination strings.

// Ranking criteria: points → GD → GF → GA fewest → alphabetical
export function rankThirdPlaceTeams(
  thirdPlaceEntries: ThirdPlaceEntry[]
): ThirdPlaceEntry[] {
  return [...thirdPlaceEntries].sort((a, b) => {
    const sa = a.standing
    const sb = b.standing
    if (sb.points !== sa.points) return sb.points - sa.points
    if (sb.goalDiff !== sa.goalDiff) return sb.goalDiff - sa.goalDiff
    if (sb.goalsFor !== sa.goalsFor) return sb.goalsFor - sa.goalsFor
    if (sa.goalsAgainst !== sb.goalsAgainst) return sa.goalsAgainst - sb.goalsAgainst
    return a.group.localeCompare(b.group)
  })
}

// Maps which groups the 8 qualifying thirds came from → which bracket slots they fill.
// Key = sorted group letters of the 8 thirds, Value = slot label → group mapping.
// For WM 2026 the third-place bracket assignments depend on the specific 8 groups.
// This simplified version assigns them in ranked order to the 8 defined "3. X/Y/Z" slots.
// Actual FIFA rules require a more complex lookup table that isn't yet published
// for WM 2026 (it will be set before the tournament ends). We use ranked order as placeholder.
export const THIRD_PLACE_SLOTS = [
  '3. A/B/C/D/F',  // r32_L2 slot2
  '3. C/D/F/G/H',  // r32_L4 slot2
  '3. B/E/F/I/J',  // r32_L5 slot2
  '3. A/E/H/I/J',  // r32_L8 slot2
  '3. C/E/F/H/I',  // r32_R3 slot2
  '3. E/H/I/J/K',  // r32_R4 slot2
  '3. E/F/G/I/J',  // r32_R5 slot2
  '3. D/E/I/J/L',  // r32_R8 slot2
]

export function getBestEightThirds(
  thirdPlaceEntries: ThirdPlaceEntry[]
): ThirdPlaceEntry[] {
  return rankThirdPlaceTeams(thirdPlaceEntries).slice(0, 8)
}

// Returns a map: slotLabel → teamId for the 8 third-place bracket slots
export function resolveThirdPlaceSlots(
  thirdPlaceEntries: ThirdPlaceEntry[]
): Record<string, string> {
  const best8 = getBestEightThirds(thirdPlaceEntries)
  const result: Record<string, string> = {}
  for (let i = 0; i < best8.length && i < THIRD_PLACE_SLOTS.length; i++) {
    result[THIRD_PLACE_SLOTS[i]] = best8[i].standing.teamId
  }
  return result
}
