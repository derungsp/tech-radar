# Auftrag

Das Projekt im Modul Web Programming Lab ermöglicht es, die gelernten Inhalte aus dem Unterricht direkt anwenden zu können. Der Fokus des Projektes liegt auf die Anwendung von noch nicht bekannten Web Technologien.

## Projektidee

Als Arbeit wird das präsentierte Projekt **"Technologie-Radar"** umgesetzt. Keine eigene Idee.

## Organisatorisches

- Das Projekt wird in **Einzelarbeit** erarbeitet.
- Sie können eigene Projekt-Vorschläge bringen oder das vorgeschlagene Projekt "Technologie-Radar" umsetzen.
- Sie sollten **ca. 60h** in das Projekt investieren (Implementierung, Dokumentation, Präsentation).

## Technologie-Stack

Anstatt Angular wird dieses Projekt mit Next.js (React) mit App Router umgesetzt. Für die Persistenz wird MongoDb mit Prisma verwendet. Weiter werden diverse Libraries für Design, Validation etc. verwendet (Tailwindcss, zod...).

## Ggf. angedachte Abgrenzungen / Änderungen

Es wird versucht, die vorgegebenen Anforderungen zu erfüllen. Keine Änderungen.

# Anforderungen

In der folgenden Tabelle werden die Anforderungen kurz aufgelistet. Die detaillierten Informationen sind als GitHub-Issues zu finden (verlinkt in Tabelle).

| #   | Titel                                        | Link                                                            |
| --- | -------------------------------------------- | --------------------------------------------------------------- |
| 1   | Anmelden Technologie-Radar-Administration    | [User Story 1](https://github.com/derungsp/tech-radar/issues/1) |
| 2   | Technologie erfassen                         | [User Story 2](https://github.com/derungsp/tech-radar/issues/2) |
| 3   | Technologie entwerfen und später publizieren | [User Story 3](https://github.com/derungsp/tech-radar/issues/3) |
| 4   | Technologie ändern                           | [User Story 4](https://github.com/derungsp/tech-radar/issues/4) |
| 5   | Technologie-Einordnung ändern                | [User Story 5](https://github.com/derungsp/tech-radar/issues/5) |
| 6   | Technologien anzeigen                        | [User Story 6](https://github.com/derungsp/tech-radar/issues/6) |
| 7   | Anmelden am Technologie-Radar-Viewer         | [User Story 7](https://github.com/derungsp/tech-radar/issues/7) |

# Fazit & Reflexion

hier kommt das fazit und die reflexion

# Arbeitsjournal

| Datum             | Aufwand (h) | Titel                                                   | Beschreibung                                                                                                                                                                                                                                                                                                                 |
| ----------------- | ----------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 03.02.2025        | 9           | Initialer Aufbau und Authentifikation                   | Next.js 15 (App Router) Projekt initialisiert und mittels NextAuth & MongoDb eine erste Authentifikation für User inkl. Rollen entwickelt. Für die serverseitige Validation wurde zod und als ORM wurde prisma verwendet. Als Entwicklungstools wurden ESLint / Prettier und husky ins Projekt eingebunden und konfiguriert. |
| 04.02.2025        | 8           | Login / Register Seiten, Navbar, RadarChart und Hosting | Es wurden eine Login und Register Seite sowie eine erste Navbar mithilfe von Tailwindcss, framer motion und heroicons entwickelt. Deployment auf Vercel wurde eingerichtet. Erste Versuche eines RadarCharts wurden gemacht.                                                                                                 |
| 05.02.2025        | ...         | ...                                                     | ...                                                                                                                                                                                                                                                                                                                          |
| **Total Aufwand** | **...**     |                                                         |

# Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
