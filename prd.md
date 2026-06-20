
Dieses Product Requirements Document (PRD) dient als Vorlage für die Entwicklung deiner App mit Claude Code. Es strukturiert die Anforderungen so, dass die KI präzise Anweisungen für die Implementierung hat.

---

# Product Requirements Document (PRD): Interaktiver WM 2026 Planer

## 1. Projektübersicht
Ein interaktiver Web-App-Spielplan für die Fußball-Weltmeisterschaft 2026 in den USA, Mexiko und Kanada. Die App ermöglicht es Nutzern, Ergebnisse zu verfolgen, eigene Tipps einzutragen und die Auswirkungen auf Tabellen und die K.O.-Runde in Echtzeit zu visualisieren.

## 2. Kernfunktionen

### 2.1 Daten-Management & API
*   **Initialer Load:** Beim Laden der Seite werden aktuelle Spieldaten (Teams, Termine, Stadien, Live-Ergebnisse) von einer Fußball-API (z.B. API-Football oder Football-Data.org) abgerufen.
*   **Interaktive Eingabe:** Jedes Spiel hat HTML-Input-Felder für den Spielstand.
*   **Reaktivität:** Änderungen an Spielständen aktualisieren sofort:
    1.  Die Gruppentabelle (Punkte, Tordifferenz, etc.).
    2.  Den Aufstieg in die K.O.-Phase (inkl. der komplizierten Regelung für die besten Gruppendritten).
*   **Reset-Funktion:** Ein globaler Reset-Button setzt alle manuellen Eingaben zurück und lädt die echten API-Daten neu.

### 2.2 Visualisierung: Vorrunde (Gruppenphase)
*   **Layout:** 12 Gruppen (A-L).
*   **Card-Layout:** Jedes Spiel wird als Karte dargestellt.
    *   Inhalt: Datum, Wochentag, Uhrzeit (Format: `Europe/Berlin`), Flaggen-Icon, Teamnamen, Score-Inputs.
*   **Tabellen-Ansicht:** Direkt unter den Spielen jeder Gruppe befindet sich die aktuelle Tabelle (Platz, Team, Sp, S, U, N, Tore, Diff, Punkte).

### 2.3 Visualisierung: K.O.-Phase (Bracket)
*   **Layout:** Ein "UML-Diagramm"-ähnliches Bracket (Baumstruktur).
*   **Phasen:** Sechzehntelfinale (Runde der 32), Achtelfinale, Viertelfinale, Halbfinale, Spiel um Platz 3, Finale.
*   **Dynamik:** Teams rücken automatisch in das nächste Feld vor, sobald ein Sieger in der Vorrunde oder der vorherigen K.O.-Runde feststeht.

### 2.4 Interaktivität & UX
*   **Länder-Highlighting:** Wird ein Land angeklickt (oder der Name/Flagge fokussiert), wird dieses Team in der gesamten App (Gruppenphase + K.O.-Baum) optisch hervorgehoben (z.B. durch eine leuchtende Border oder Hintergrundfarbe).
*   **Zeitverschiebung:** Alle Zeitangaben müssen korrekt in die Zeitzone `Europe/Berlin` umgerechnet werden.

## 3. Design & UI (Look & Feel)
*   **Farbkonzept:** "Colorful & Modern".
*   **Theming:**
    *   **Dark Mode (Default):** Dunkler Hintergrund mit radialem Verlauf (Zentrum etwas heller zu den Rändern hin dunkler).
    *   **Light Mode:** Über Settings umschaltbar.
*   **Settings-Button:** Ein persistentes UI-Element (Zahnrad), um:
    1.  Zwischen Light/Dark Mode zu wechseln.
    2.  Die Primärfarbe der App zu wählen (Color Picker).
*   **Komponenten:** Nutzung von modernen UI-Libraries (z.B. Tailwind CSS, Lucide Icons für Flaggen/Symbole).

## 4. Technische Anforderungen (für Claude Code)
*   **Framework:** React oder Next.js (wegen State-Management und einfacher API-Anbindung).
*   **State Management:** Zentraler Store (z.B. Zustand oder Context API), um die Spielstände über alle Ansichten hinweg zu synchronisieren.
*   **Responsiveness:** Die App muss auf Desktop (Bracket-Übersicht) und Mobile (Listen-Ansicht) flüssig funktionieren.
*   **Logik für Gruppendritte:** Implementierung des FIFA-Regelwerks für die 8 besten Gruppendritten aus 12 Gruppen.

## 5. User Stories
1.  "Als User möchte ich das Ergebnis von Deutschland gegen [Gegner] eintragen, um sofort zu sehen, ob sie als Gruppenerster oder -zweiter ins Sechzehntelfinale einziehen."
2.  "Als User möchte ich auf 'Brasilien' klicken, um schnell zu sehen, welchen Weg sie bis ins Finale nehmen müssten."
3.  "Als User möchte ich die App öffnen und sofort die aktuellen Live-Ergebnisse sehen, ohne manuell suchen zu müssen."

---

### Nächste Schritte für die Umsetzung mit Claude:

1.  **Prompt 1 (Setup):** *"Erstelle ein Next.js Projekt mit Tailwind CSS. Implementiere das Grundlayout mit einem radialen Hintergrundverlauf (Dark Mode default) und einem Settings-Button für das Farbschema."*
2.  **Prompt 2 (Daten & API):** *"Erstelle eine Datenstruktur für die 12 Gruppen der WM 2026. Schreibe einen Service, der (Mock-)Daten lädt und die Logik für die Tabellenberechnung (Punkte, Tordifferenz) enthält."*
3.  **Prompt 3 (UI Vorrunde):** *"Erstelle die Gruppenansicht mit Card-Layout für Spiele und dynamischen Tabellen darunter. Füge Flaggen-Icons und Score-Inputs hinzu."*
4.  **Prompt 4 (K.O. Phase):** *"Implementiere das K.O.-System als Bracket-Layout. Die Teams sollen automatisch basierend auf den Gruppentabellen und K.O.-Ergebnissen nachrücken."*
5.  **Prompt 5 (Interaktivität):** *"Implementiere das Highlighting-System: Beim Klick auf ein Team wird dieses in allen Komponenten hervorgehoben."*


