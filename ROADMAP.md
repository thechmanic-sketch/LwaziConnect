# LwaziConnect — Build Roadmap (0% → 100%)

Goal: turn the current static `index.html` mockup into a real, installable School Operating System — available both as a **desktop app** (Electron, offline-capable) and a **self-hosted web app** (installed on a school's own server/network), sharing one core codebase.

## Architecture

- **Backend**: Node.js + Express (REST API), SQLite by default (zero-config, file-based — fits "installable" software), with an option to point to Postgres for larger self-hosted deployments.
- **Frontend**: React (rebuilt from the current HTML/CSS into components), reusing the existing visual design/theme.
- **Desktop packaging**: Electron wraps the same frontend + a bundled local backend + SQLite file — installs as a normal Windows/Mac app, works offline.
- **Self-hosted packaging**: Same backend/frontend served over the school's LAN via Docker Compose (or a plain Node install) for staff to access from browsers on-site.
- **Data layer** shared between both targets so features are built once.

## Phase 0 — Foundation (0–15%)
- Set up monorepo structure: `/backend`, `/frontend`, `/desktop`.
- Scaffold Express API + SQLite schema (schools, users, roles, students, staff).
- Scaffold React app; port the existing sidebar/topbar/theme from `index.html` into components.
- Basic auth (login, roles: admin/teacher/parent/staff) and multi-user session handling.

## Phase 1 — Core Modules (15–40%)
- Student records (enrollment, classes, profiles).
- Attendance tracking (mark, view, reports).
- Staff management.
- Role-based dashboards (as sketched in the mockup's role switcher).

## Phase 2 — Operations (40–65%)
- Fees/billing module (invoices, payment tracking).
- Timetable/scheduling.
- Notifications center (in-app alerts, matching the alert banner in the mockup).
- Reporting/exports (PDF/CSV).

## Phase 3 — Communication (65–80%)
- WhatsApp integration (WhatsApp Business API) for parent notifications.
- SMS/email fallback channel.
- Messaging inbox UI (the `.wa`/`.wp` themed elements already in the mockup).

## Phase 4 — Packaging & Installability (80–95%)
- Electron build pipeline → signed installers for Windows/Mac.
- Self-hosted deployment: Docker Compose bundle + setup wizard for school IT staff.
- Local backup/restore tooling (since data lives on-site, not in the cloud).
- Auto-update mechanism for the desktop app.

## Phase 5 — Hardening & Launch (95–100%)
- Multi-tenant safety (per-school data isolation) if one build is shared across schools.
- Security review (auth, input validation, dependency audit).
- Test coverage (unit + end-to-end for critical flows: attendance, fees, messaging).
- Documentation: install guide, admin guide, user guide.

## Open decisions to revisit
- Postgres vs. SQLite-only for self-hosted mode (depends on expected school size).
- Whether one shared license key covers both desktop + self-hosted installs.
- Update/licensing strategy for offline desktop installs.
