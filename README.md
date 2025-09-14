# SSR React + Express + Vite (JS)

Production-ready server-side rendering boilerplate using React 18, Express, and Vite 5.

## Features
- React 18 with hydrateRoot
- Express server with Vite middleware (dev) and prebuilt assets (prod)
- SSR with separate client/server builds
- Security via helmet, compression, and logging via morgan
- Single index.html template with inject points

## Scripts
- `npm run dev` — start Express with Vite middleware (HMR)
- `npm run build` — build client and server bundles
- `npm run preview` — start production server (serves built assets)

## Getting started
1. Install dependencies
2. Start dev server
3. Build and preview production

### Install
```sh
npm install
```

### Dev
```sh
npm run dev
```
Open http://localhost:3000 (Vite client dev server runs behind Express).

### Build
```sh
npm run build
```

### Preview (Production)
```sh
npm run preview
```
Open http://localhost:3000.

## Notes
- For CSP, integrate nonces and set a strict policy in `server/index.js` for production.
- Add routing (e.g., react-router) and data fetching as needed.