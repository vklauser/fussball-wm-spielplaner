# ⚽ WM 2026 Spielplaner

Interaktiver Spielplan und K.O.-Bracket für die Fußball-Weltmeisterschaft 2026 (USA · Mexiko · Kanada).

## Features

- **Gruppenphase** — alle 12 Gruppen mit 72 Spielen, Tabellen, H2H-Tiebreaker nach FIFA-Regeln
- **K.O.-Runden** — Sechzehntelfinale bis Finale, sektion-basiertes Layout
- **Live-Daten** — Ergebnisse via [football-data.org](https://www.football-data.org/) API (60s Cache)
- **Manuelle Eingabe** — Scores per Hand eintragen, überschreiben API-Daten
- **Team-Highlighting** — Team anklicken → alle Spiele dieses Teams hervorgehoben
- **Persist** — Eingaben bleiben via localStorage erhalten

## Setup

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. API-Key eintragen
cp .env.local.example .env.local
# .env.local öffnen und NEXT_PUBLIC_FOOTBALL_API_KEY setzen
# Kostenloser Key: https://www.football-data.org/client/register

# 3. Dev-Server starten
npm run dev   # → http://localhost:3000
```

> Ohne API-Key funktioniert die App vollständig mit manueller Score-Eingabe. Live-Daten bleiben leer.

## Stack

| | |
|---|---|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **Styling** | Tailwind CSS 4 |
| **State** | Zustand + `persist` (localStorage-Key: `wm2026-store`) |
| **Datum/Zeit** | date-fns + date-fns-tz (Zeitzone: `Europe/Berlin`) |
| **Icons** | Lucide React + Unicode-Flaggen-Emojis |

## Projektstruktur

```
src/
├── app/
│   ├── api/wm-scores/route.ts   # Proxy → football-data.org
│   ├── page.tsx                 # Haupt-Seite (Gruppen / K.O.-Runde Tabs)
│   └── layout.tsx
├── components/
│   ├── bracket/                 # KOBracket, BracketMatch
│   ├── group/                   # GroupGrid, GroupCard, MatchCard, StandingsTable
│   ├── layout/                  # Header, TabNav
│   └── ui/                      # TeamBadge, ScoreInput, ThemeProvider
├── lib/
│   ├── data/                    # groups.ts (48 Teams, 72 Spiele), bracket.ts (K.O.-Daten)
│   ├── logic/                   # standings.ts, thirdPlace.ts
│   └── utils/                   # datetime.ts
├── store/useWMStore.ts           # Zentraler Zustand
└── types/index.ts
```

## Bekannte Einschränkungen

- Elfmeterschießen nicht modelliert — K.O.-Sieger braucht eine Score-Differenz
- FIFA-Gruppendritte-Mapping (welche Gruppen-Kombination → welcher Bracket-Slot) ist Platzhalter
- football-data.org Free Tier: max. 10 Requests/Minute
