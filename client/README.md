# Todo App (React + TS + Express)

This project includes a React + TypeScript client and an Express + MongoDB server.

## Prerequisites

- Node.js 18+ (or newer)
- MongoDB running locally or a cloud connection string

## Quick Start

### 1) Server setup

From the project root, install server dependencies:

```powershell
cd c:\Users\shashitha\Desktop\react_projects\type_b_assignment\server
npm install
```

Create a `.env` file in `server/` (or copy `.env.example`) and update values as needed:

```powershell
copy .env.example .env
```

Start the API server:

```powershell
npm run dev
```

The server runs on `http://localhost:3000` and exposes the TODO API under `/api/todos`.

### 2) Client setup

Install client dependencies:

```powershell
cd c:\Users\shashitha\Desktop\react_projects\type_b_assignment\client
npm install
```

Start the Vite dev server:

```powershell
npm run dev
```

The client runs on `http://localhost:5173` by default.

## Client Folder Structure

- `src/api` – HTTP clients + API wrappers
- `src/features/todos` – feature-specific types, hooks, components, and pages
- `src/App.tsx` – app shell that renders the Todo page

## API Configuration

By default, the UI calls `http://localhost:3000/api`.

To override the API base URL, define a `VITE_API_BASE_URL` value in a `.env` file at `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## React + TypeScript + Vite (Template Notes)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
