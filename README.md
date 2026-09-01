# Blaze It Club

The daily-SMS joke app: subscribers opt in with a phone number and receive one shared joke every day at their local 4:20pm. See [CONTEXT.md](./CONTEXT.md) for domain vocabulary and the [build spec](https://github.com/DarinEvanow/blaze-it-club/issues/1) for the full design.

## Stack

- **Next.js** (App Router) on **Vercel**.
- **Postgres** (Vercel Postgres or Neon), accessed via [Drizzle ORM](https://orm.drizzle.team) + [postgres.js](https://github.com/porsager/postgres).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL
npm run db:migrate           # create the subscriber / joke / send_log tables
npm run dev
```

Visit [http://localhost:3000/api/health](http://localhost:3000/api/health) — it returns `{ "status": "ok" }` once the app can read from the database.

## Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Postgres connection string (Vercel Postgres or Neon). See `.env.example`. |

## Database

Schema lives in `src/db/schema.ts`; migrations are generated SQL files in `drizzle/`.

- `npm run db:generate` — diff `src/db/schema.ts` against `drizzle/` and write a new migration file. Run this after changing the schema.
- `npm run db:migrate` — apply pending migrations in `drizzle/` to the database at `DATABASE_URL`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Lint the project. |
| `npm run db:generate` | Generate a migration from schema changes. |
| `npm run db:migrate` | Apply migrations to `DATABASE_URL`. |

## Deployment

Deploys to Vercel from this repo. Manual, one-time setup steps (Vercel project, DNS, Twilio A2P 10DLC registration, provisioning Postgres) are tracked in the [build spec](https://github.com/DarinEvanow/blaze-it-club/issues/1#manual-setup-steps).
