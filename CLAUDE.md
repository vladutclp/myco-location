# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working with me

I'm the sole developer and I'm using this project to learn backend and sharpen frontend.
- Backend: I write the code. Explain approaches and review what I wrote; only write backend code when I explicitly ask.
- Tests: I write all tests, frontend and backend. Help me design test cases, but don't write tests, and don't use `repertoire:test-first-loop` or `repertoire:test-designer` to generate them.
- Technical questions default to the `explain` skill: teach the concept directly and tie it to this codebase. Never quiz me unless I invoke `/guide` (Socratic, for things I already know and for reviews of my code).

## Layout

Two independent npm packages, no root `package.json` or workspaces: `client/` (React 19 + Vite + react-leaflet, CSS Modules) and `server/` (Express 5 + Prisma 7 + Postgres + zod). Run npm commands inside the package directory. Product and UI constraints live in `PRODUCT.md` and `DESIGN.md` — read them before UI work (mobile-first, 44px touch targets, don't imply features that don't exist).

## Commands

Client (`cd client`):
- `npm run dev` (port 5173 with `strictPort`; exits if the port is busy, because the server's planned `CORS_ORIGIN` defaults to `http://localhost:5173`) · `npm run lint` (oxlint) · `npm run build` (`tsc -b && vite build` — this is the typecheck, test files included) · `npm test` (`vitest run`, runs once; `npx vitest` for watch mode)
- CI (`.github/workflows/client.js.yml`, Node 24) runs `npm ci && npm run lint && npm run build && npm test` for the client.

Server (`cd server`):
- `npm run dev` (`tsx watch index.ts`; runs TS directly, no build step)
- `npm run lint` (oxlint, config in `server/.oxlintrc.json`)
- Typecheck: `npx tsc` (no script; `noEmit` is set). No CI.

Local setup:
1. `docker compose up -d` (root; postgres:15 on 5432, db `myco-location`, password `pass`)
2. `cd server && npx prisma generate` — required after cloning: the client is generated into `server/generated/prisma`, which is gitignored
3. `npx prisma migrate dev`
4. `npx tsx scripts/seed.ts`
5. `npm run dev`

The server has no tests. Neither package has a formatter. Match the existing style (double quotes, semicolons, trailing commas, 2 spaces).

## Client tests

Vitest + Testing Library (`react`, `user-event`, `jest-dom`) + jsdom + MSW, configured in the `test` block of `client/vite.config.ts`.
- Test files sit next to their source as `*.test.ts(x)`. Shared test helpers go in `src/test/`.
- Vitest globals (`describe`, `it`, `expect`, `vi`) are on, but typed only for test code: `tsconfig.test.json` covers `*.test.ts(x)` and `src/test/`, and `tsconfig.app.json` excludes them. Test-only code anywhere else is typechecked without the globals.
- `src/test/setup.ts` runs before every test file. It starts the MSW server (`src/test/server.ts`) with unhandled requests as errors, and after each test resets handlers and clears sessionStorage. Mock requests per test with `server.use(...)`.
- Render through `customRender` (`src/test/utils.tsx`), which wraps the UI in `<MemoryRouter useTransitions={false}>` and `AuthProvider`.
- `test.env` in `vite.config.ts` sets `VITE_API_BASE_URL` for tests. Without it, importing anything that reaches `src/api/config.ts` throws at import time.

## Environment

- Server env is validated with zod in `server/env.ts` at import time; the process exits on invalid config. Always import `env` from `env.ts`, never read `process.env` directly. Required: `DATABASE_URL` (postgres URL), `JWT_SECRET` (≥32 chars). `JWT_EXPIRES_IN` accepts only `"7d"`.
- Client uses only `VITE_API_BASE_URL`, set in `client/.env` (gitignored; there is no `.env.example`). `parseApiBaseUrl` in `client/src/api/config.ts` validates it when the module loads: it must be an absolute `http(s)` URL, trailing slashes are stripped, and anything else throws `VITE_API_BASE_URL is missing or invalid`. Build request URLs as `${BASE_API}/path`.
- Adding a client env var means declaring it in `ImportMetaEnv` in `client/src/vite-env.d.ts`. `strictImportMetaEnv` makes undeclared `import.meta.env` keys a type error. `vite/client` types come from `tsconfig.app.json` `types`, so that file has no `/// <reference>`. Keep it free of `import`/`export`, or its interfaces stop merging with Vite's global ones.
- Adding a server env var means adding it to the schema in `env.ts`.

## Conventions

- Server imports use explicit `.ts` extensions (`rewriteRelativeImportExtensions`); client imports have no extension.
- Both packages use `verbatimModuleSyntax` and `erasableSyntaxOnly`: use `import type`, no enums or namespaces.
- Client tsconfig is not `strict`; server is.
- Server request validation goes through `validateBody` / `validateParams` / `validateQueryParams` (`src/middleware/validation.ts`) with zod schemas in `src/schemas/*.schema.ts`. Spot schemas use `z.strictObject`, so unknown keys are a 400.
- Error responses from new server code: `res.status(code).json({ message })`. Existing code also uses `error`/`data`; don't copy those.
- All spot queries must be scoped by the authenticated `req.user.id`; `/api/spots` routes are behind `authenticateToken`.
- Client: one folder per component (`Component/Component.tsx` + `Component.module.css`); styling rules in `client/src/styles/README.md`. The JWT is kept in sessionStorage.

## Git

- Branch names: `BE-` (server), `FE-` (client), or `FS-` (full-stack) + kebab-case imperative description, e.g. `BE-validate-configuration-before-accepting-requests`.
- Every branch PRs into `main`.
- Commit messages: short, imperative, sentence case, no conventional-commit prefix ("Validate env variables before accepting requests").

## Repertoire workflows

- Before claiming done, use `repertoire:verification-gate` with `cd client && npm run lint && npm run build && npm test` and/or `cd server && npm run lint && npx tsc`.
- For bugs, use `repertoire:debugging-protocol` to reproduce and find the root cause, then explain it and let me write the fix and the test (per "Working with me").
- For `FS-` work or changes spanning both packages, use `repertoire:plan-writer` (with `repertoire:scout`) before coding.
- Before opening a PR, run `repertoire:antagonist` (security lens for auth/spot changes) — the server has no tests and client test coverage is still thin.
- When committing or writing a PR, use `repertoire:commit-and-pr-author` with the Git conventions above.

## Gotchas

- `server/scripts/seed.ts` inserts passwords unhashed, so seeded users can't log in through `/api/auth/login`.
- `server/prisma.config.ts` and `scripts/seed.ts` read `process.env.DATABASE_URL` directly (they run outside the app, so `env.ts` validation doesn't apply).
- MSW is v3: the unhandled-request option is `onUnhandledFrame`. Most docs and tutorials still show v2's `onUnhandledRequest`, which v3's types reject.
- `checker()` in `client/vite.config.ts` runs only when `command === "serve" && mode !== "test"`. Vitest also starts Vite with `command: "serve"`, so dropping the `mode` check runs a full typecheck inside every test run.
