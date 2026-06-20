'use client'

import { BracketMatch } from './BracketMatch'
import {
  R32_MATCHES,
  R16_MATCHES,
  QF_MATCHES,
  SF_MATCHES,
  THIRD_PLACE_MATCH,
  FINAL_MATCH,
} from '@/lib/data/bracket'

interface RoundSectionProps {
  title: string
  icon: string
  matchIds: string[]
  colorFrom: string
  center?: boolean
}

function RoundSection({ title, icon, matchIds, colorFrom, center }: RoundSectionProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-linear-to-b ${colorFrom} to-transparent overflow-hidden`}
    >
      <div className="px-4 py-3 border-b border-white/10">
        <span className="text-lg font-black text-(--primary)">
          {icon} {title}
        </span>
      </div>
      <div className={`p-3 gap-3 ${center ? 'flex flex-wrap justify-center' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
        {matchIds.map((id) => (
          <div key={id} className={center ? 'w-full sm:w-72' : ''}>
            <BracketMatch matchId={id} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ThirdPlaceSection() {
  return (
    <div className="rounded-2xl border border-white/10 bg-linear-to-b from-slate-500/15 to-transparent overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10">
        <span className="text-lg font-black text-white/60">🥉 Spiel um Platz 3</span>
      </div>
      <div className="p-3 flex justify-center">
        <div className="w-full max-w-sm">
          <BracketMatch matchId={THIRD_PLACE_MATCH.id} />
        </div>
      </div>
    </div>
  )
}

function FinaleSection() {
  return (
    <div className="rounded-2xl border border-yellow-500/30 bg-linear-to-b from-yellow-500/20 to-transparent overflow-hidden">
      <div className="px-4 py-3 border-b border-yellow-500/20">
        <span className="text-lg font-black text-yellow-400">🏆 Finale</span>
      </div>
      <div className="p-3 flex justify-center">
        <div className="w-full max-w-sm">
          <BracketMatch matchId={FINAL_MATCH.id} />
        </div>
      </div>
    </div>
  )
}

export function KOBracket() {
  const r32Ids = R32_MATCHES.map((m) => m.id)
  const r16Ids = R16_MATCHES.map((m) => m.id)
  const qfIds = QF_MATCHES.map((m) => m.id)
  const sfIds = SF_MATCHES.map((m) => m.id)

  return (
    <div className="space-y-6">
      <RoundSection
        title="Sechzehntelfinale"
        icon="⚔️"
        matchIds={r32Ids}
        colorFrom="from-blue-500/20"
      />
      <RoundSection
        title="Achtelfinale"
        icon="⚔️"
        matchIds={r16Ids}
        colorFrom="from-emerald-500/20"
      />
      <RoundSection
        title="Viertelfinale"
        icon="⚔️"
        matchIds={qfIds}
        colorFrom="from-purple-500/20"
      />
      <RoundSection
        title="Halbfinale"
        icon="⚔️"
        matchIds={sfIds}
        colorFrom="from-orange-500/20"
        center
      />
      <ThirdPlaceSection />
      <FinaleSection />
    </div>
  )
}
