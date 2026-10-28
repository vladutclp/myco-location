# React + TypeScript + Vite

## Local development

Run these from `client/`.

### Environment

Create `client/.env` (it's gitignored):

```
VITE_API_BASE_URL=http://localhost:8080/api
```

`src/api/config.ts` checks this value when the app loads. It must be an absolute `http` or `https` URL, and trailing slashes are removed. If it's missing or invalid, the page stays blank and the console shows `VITE_API_BASE_URL is missing or invalid`.

Tests get the value from `test.env` in `vite.config.ts`, so they don't need a `.env`.

To add a new variable, declare it in `ImportMetaEnv` in `src/vite-env.d.ts`. `strictImportMetaEnv` is on, so reading an undeclared `import.meta.env` key is a type error.

### Dev server port

`npm run dev` always serves on http://localhost:5173 (`server.port` with `strictPort: true` in `vite.config.ts`). If the port is taken, Vite exits with "Port 5173 is already in use" instead of moving to another port. Free the port (`lsof -i :5173` shows what's using it) and start again.

The port is pinned because of CORS. The browser treats `localhost:5173` and `localhost:5174` as different origins, and the server's planned `CORS_ORIGIN` setting (default `http://localhost:5173`) allows only one. On any other port, the browser would block every API response, and requests would fail as generic network errors. Today `server/src/server.ts` still calls `cors()` without an origin, so this applies once the server restricts CORS. If you change the client port, set `CORS_ORIGIN` on the server to match.

## Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
