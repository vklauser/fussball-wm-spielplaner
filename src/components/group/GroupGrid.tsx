'use client'

import { GROUPS } from '@/lib/data/groups'
import { GroupCard } from './GroupCard'

export function GroupGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {GROUPS.map((g) => (
        <GroupCard key={g} group={g} />
      ))}
    </div>
  )
}
