# LwaziConnect — Build Roadmap (0% → 100%)

Goal: turn the current static `index.html` mockup into a real **self-hosted web app** — installed on a school's own server/network, accessed by staff via browser on-site.

## Architecture

- **Backend**: Node.js + Express (REST API), SQLite by default (zero-config, file-based, easy to install), with an option to point to Postgres for larger deployments.
- **Frontend**: React (rebuilt from the current HTML/CSS into components), reusing the existing visual design/theme.
- **Deployment**: Docker Compose bundle (or plain Node install) so school IT can stand it up on a local server/network; accessed from any browser on-site.

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
- Docker Compose bundle + setup wizard for school IT staff.
- Local backup/restore tooling (since data lives on-site, not in the cloud).
- Update mechanism for the self-hosted install.

## Phase 5 — Hardening & Launch (95–100%)
- Multi-tenant safety (per-school data isolation) if one build is shared across schools.
- Security review (auth, input validation, dependency audit).
- Test coverage (unit + end-to-end for critical flows: attendance, fees, messaging).
- Documentation: install guide, admin guide, user guide.

## Open decisions to revisit
- Postgres vs. SQLite-only for self-hosted mode (depends on expected school size).
- Whether one shared license key covers both desktop + self-hosted installs.
- Update/licensing strategy for offline desktop installs.
