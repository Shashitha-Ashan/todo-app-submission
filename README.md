# Todo App (React + TypeScript + Express)

This repository contains:

- `client/` — React + TypeScript + Vite frontend
- `server/` — Express + MongoDB backend

## Prerequisites

- Node.js 18+ (or newer)
- MongoDB running locally or a cloud connection string

## Server setup (Express + MongoDB)

```powershell
cd c:\Users\shashitha\Desktop\react_projects\type_b_assignment\server
npm install
copy .env.example .env
npm run dev
```

The API runs on `http://localhost:3000` and exposes endpoints under `/api/todos`.

## Client setup (React + TS)

```powershell
cd c:\Users\shashitha\Desktop\react_projects\type_b_assignment\client
npm install
npm run dev
```

The client runs on `http://localhost:5173` by default.

### Client API configuration

By default, the UI calls `http://localhost:3000/api`.

To override the API base URL, define a `VITE_API_BASE_URL` value in a `.env` file at `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Useful scripts

### Server

- `npm run dev` — start server with nodemon
- `npm run start` — start server

### Client

- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview production build
