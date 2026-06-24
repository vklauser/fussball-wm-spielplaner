<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# WM 2026 Spielplaner — Projektübersicht

## Stack
- **Next.js 16** (App Router, TypeScript) — `src/app/`
- **Tailwind CSS 4** — benutze kanonische Syntax: `border-(--primary)/40` statt `border-[var(--primary)]/40`
- **Zustand** mit `persist` Middleware (localStorage-Key: `wm2026-store`)
- **date-fns + date-fns-tz** — Zeitzone immer `Europe/Berlin`
- **Lucide React** für Icons, Unicode-Flaggen-Emojis (kein Package)

## Dev-Server starten
```bash
npm run dev   # http://localhost:3000
```

## Wichtige Dateien

| Datei | Zweck |
|-------|-------|
| `src/lib/data/groups.ts` | 48 Teams, 72 Gruppenspiele (UTC-Timestamps) |
| `src/lib/data/bracket.ts` | 16 Sechzehntelfinale-Paarungen, BRACKET_FLOW/LOSER_FLOW Maps |
| `src/lib/logic/standings.ts` | `calculateStandings()` — Punkte, TD, H2H-Tiebreaker |
| `src/lib/logic/thirdPlace.ts` | Beste 8 Gruppendritte, Bracket-Slot-Zuweisung |
| `src/store/useWMStore.ts` | Zentraler Store: scores, dateFixes, highlightedTeamId |
| `src/app/api/wm-data/route.ts` | Server-Route → Proxy zu openfootball/worldcup.json (GitHub raw) |
| `src/components/ui/ThemeProvider.tsx` | Setzt fixen Radial-Gradient (Blau→Violett) auf `document.body` |

## Architektur-Entscheidungen

### Hintergrund-Gradient
Fixer Radial-Gradient von Blau (`hsl(220,90%,15%)`) über Indigo nach Violett (`hsl(270,65%,4%)`), gesetzt in `ThemeProvider.tsx` via `document.body.style.background` — **nicht** in `globals.css`. Immer Dark-Mode, kein Theme-Toggle. Kein statisches CSS für den Hintergrund schreiben.

### API-Integration
Live-Daten kommen über `/api/wm-data` (Next.js API Route, server-seitig). Die Route fetcht `openfootball/worldcup.json` von GitHub raw, mappt Teamnamen auf FIFA-Codes, parst lokale Anstoßzeiten (z.B. `"13:00 UTC-6"`) zu UTC-ISO-Strings und gibt `{ dateFixes, scores, count }` zurück (5-Minuten-Cache). Kein API-Key nötig.

### Scores und Datumskorrekturen im Store
`scores` ist ein `Record<matchId, { home: number | null, away: number | null }>`. Manuelle Eingaben überschreiben API-Daten. `dateFixes` ist ein `Record<matchId, string>` mit korrigierten UTC-ISO-Timestamps aus openfootball — `MatchCard` benutzt `dateFixes[match.id] ?? match.date` als effektives Datum. Reset löscht Scores und dateFixes.

### K.O.-Bracket-Auflösung
`getKOTeamId(slotLabel)` im Store löst Labels wie `"1. Gruppe E"`, `"3. A/B/C/D/F"` oder `"Sieger r32_L1"` rekursiv auf. Kein Ergebnis-State im Bracket — alles wird on-the-fly aus `scores` + `standings` berechnet.

## Bekannte Einschränkungen
- K.O.-Unentschieden nicht modelliert (Elfmeterschießen fehlt) — Sieger muss Score-Differenz haben
- FIFA-Gruppendritte-Mapping (welche Gruppen-Kombination → welcher Bracket-Slot) ist Platzhalter; offizielle Tabelle noch nicht veröffentlicht
- openfootball/worldcup.json ist kein Real-Time-Feed; API-Route cached 5 Minuten (`next: { revalidate: 300 }`)
