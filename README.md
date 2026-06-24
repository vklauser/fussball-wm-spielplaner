# ⚽ WM 2026 Spielplaner

Interaktiver Spielplan und K.O.-Bracket für die Fußball-Weltmeisterschaft 2026 (USA · Mexiko · Kanada).

## Features

- **Gruppenphase** — alle 12 Gruppen mit 72 Spielen, Tabellen, H2H-Tiebreaker nach FIFA-Regeln
- **K.O.-Runden** — Sechzehntelfinale bis Finale, sektion-basiertes Layout
- **Live-Daten** — Ergebnisse + korrekte Anstoßzeiten via [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json) (5 min Cache, kein API-Key nötig)
- **Manuelle Eingabe** — Scores per Hand eintragen, überschreiben API-Daten
- **Team-Highlighting** — Team anklicken → alle Spiele dieses Teams hervorgehoben
- **Upcoming/Live-Highlighting** — Spiele in den nächsten 24h (amber), laufende Spiele (grün)
- **Persist** — Eingaben bleiben via localStorage erhalten

## Setup

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Dev-Server starten
npm run dev   # → http://localhost:3000
```

> Kein API-Key nötig. Live-Daten kommen von openfootball/worldcup.json (öffentliches GitHub-Repo).

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
│   ├── api/wm-data/route.ts     # Proxy → openfootball/worldcup.json
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
- openfootball ist kein Real-Time-Feed — Live-Daten haben ~5 Minuten Verzögerung
