# Tawo — Cali Performance Detailing AI Receptionist

A TypeScript monorepo with:
- **Backend**: Express + SQLite (JavaScript, CommonJS)
- **Frontend**: React 19 + Vite 6 (TypeScript)
- **Shared**: Shared TypeScript types

## Monorepo Structure

```
tawo/
├── packages/
│   ├── backend/     # Express API server (port 8000)
│   │   ├── src/     # Source files (index.js, db.js, services/)
│   │   ├── scripts/ # Database setup script
│   │   └── tests/   # Integration tests
│   ├── frontend/    # React/Vite SPA (port 3000, proxies /api to backend)
│   └── shared/      # Shared TypeScript types
├── docker-compose.yml
├── tsconfig.base.json
└── package.json     # Root workspace config
```

## Getting Started

```bash
# Install dependencies
npm install

# Run the backend
npm run dev:backend

# Build the shared types
npm run build:shared

# Run tests
npm run test:backend
```

## Development

Terminal 1 — Backend API:
```bash
npm run dev:backend
```

Terminal 2 — Frontend dev server (proxies /api to backend):
```bash
npm run dev:frontend
```

## Docker

```bash
docker compose up --build
```

- API: http://localhost:8000
- Frontend: http://localhost:3000

## Database

The app uses SQLite. Initialize the database:
```bash
npm run setup-db -w packages/backend
```

This creates the database file with tables for leads, appointments, and logs.