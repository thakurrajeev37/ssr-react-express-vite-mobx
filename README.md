# SSR React + Express + Vite (JS)

Production-ready server-side rendering boilerplate using React, Express, Vite, MUI and MOBx.

## Features
- React with hydrateRoot
- Express server with Vite middleware (dev) and prebuilt assets (prod)
- SSR with separate client/server builds
- Security via helmet, compression, and logging via pino
- Single index.html template with inject points
- MOBx for state management
- Material UI for design

## Scripts
- `npm run dev` — start Express with Vite middleware (HMR)
- `npm run build` — build client and server bundles
- `npm start` — start production server (serves built assets)

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
npm start
```
Open http://localhost:3000.

## Notes
- For CSP, integrate nonces and set a strict policy in `server/index.js` for production.
- Add routing (e.g., react-router) and data fetching as needed.