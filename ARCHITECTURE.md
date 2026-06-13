# System & Repository Architecture

This document describes the high-level architecture of the Cali Performance Detailing AI Receptionist platform, its monorepo structure, and core technical conventions.

---

## 1. Repository Layout (Monorepo)

To ensure cohesive development, rapid feature iteration, and shared types/utilities, this project is structured as a monorepo. We use **npm workspaces** to manage packages and applications in a single repository.

### Directory Structure
```text
tawo/
├── .github/                  # GitHub configurations
│   ├── CODEOWNERS            # Automated code review assignments
│   └── PULL_REQUEST_TEMPLATE.md
├── apps/                     # Complete applications
│   ├── api/                  # Backend Node/Express API & Receptionist Engine
│   │   ├── src/
│   │   │   ├── services/     # Third-party integrations (Twilio, Google Calendar)
│   │   │   ├── db.js         # SQLite database connector & models
│   │   │   └── index.js      # Server entrypoint
│   │   └── tests/            # Integration and unit tests for backend
│   └── web/                  # Frontend Customer Portal & Receptionist Dashboard
│       ├── src/
│       │   ├── components/   # Reusable UI component library
│       │   ├── views/        # Client and admin route pages
│       │   └── main.js
│       └── tests/            # Frontend unit & visual regression tests
├── packages/                 # Shared utilities and configurations
│   ├── shared-config/        # Eslint, Prettier, and Jest configurations
│   └── shared-types/         # Shared API request/response types & database schemas
├── CONTRIBUTING.md           # Commit and branching standards
└── ARCHITECTURE.md           # Architectural documentation (this file)
```

---

## 2. Technical Stack & Conventions

Our stack is carefully selected to maintain a lightweight memory footprint while providing high performance, production-quality type-safety, and ease of automated testing.

### Frontend (`apps/web`)
- **Framework:** Vite + React (lightweight, minimal build-time footprint).
- **Styling:** Tailwind CSS (utility-first, highly responsive, rapid prototyping).
- **State Management:** React Context / Zustand (simple, memory-light).
- **Public Server Port:** Served on **port 3000** for production deployment (proxied to API).

### Backend (`apps/api`)
- **Framework:** Node.js + Express (fast, lightweight, highly customizable).
- **Database:** SQLite (local/Turso synced in production via `team-db` sync scripts).
- **Integrations:** Mocked & real integrations with:
  - **Google Calendar API:** For booking detailing slots.
  - **Twilio API:** For SMS/voice automated receptionist interactions.
- **Port:** Runs locally on port `8000` (proxied under port `3000` by the frontend).

### Database Schema Sync & Conventions
We use SQLite as our primary relational database. 
- Schema changes are written as SQL migrations under `apps/api/src/db/migrations`.
- **CRITICAL:** Direct edits to local SQLite databases or `sqlite3` CLI are prohibited. All database operations must go through the provided database connector or synced Turso connections (`team-db` CLI tool in the sandbox).

---

## 3. Key Design Patterns

### Service Layer Pattern (Backend)
All external integrations (e.g., Google Calendar, Twilio) are encapsulated behind a service layer with clear interface definitions. This allows us to easily mock these services during testing or development, keeping tests fast and deterministic.

### Shared Single Origin (Port 3000)
To avoid CORS issues and simplify deployment, the production server serves both the built static frontend assets and proxies `/api/*` requests to the Express server running on a private loopback port. This single-origin surface is hosted on **port 3000**.

### Responsive & Accessible Component Library
All UI components are developed with mobile-first responsiveness in mind and conform to WCAG 2.1 AA accessibility standards (appropriate ARIA attributes, semantic HTML elements, keyboard navigability).
