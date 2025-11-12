import fs from "node:fs";
import path from "node:path";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { healthCheck } from "./controllers/healthController.js";
import authRoutes from "./routes/auth.js";
import userRouter from './routes/user.js';
// SSR moved into dedicated route module
import { createSsrMiddleware } from "./routes/ssrRoute.js";
import { initViteDevServer, initProdStatic } from "./utils/viteHelpers.js";
import { connectMongo } from "./utils/db.js";

const isProd = process.env.NODE_ENV === "production";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function createServer() {
	// Connect to MongoDB
	await connectMongo();
	const app = express();
	// Parse JSON bodies for all requests
	app.use(express.json());

	// Basic security & performance middleware
	app.use(
		helmet({
			contentSecurityPolicy: false, // Keep simple for example; consider enabling with nonces in real apps
		}),
	);
	app.use(compression());
	app.use(morgan(isProd ? "combined" : "dev"));

	let vite;
	let template;



	if (!isProd) {
		({ vite, template } = await initViteDevServer(app));
	} else {
		// Initialize production static assets serving and template loading
		({ template } = await initProdStatic(app));
	}



	// Auth endpoints
	app.use("/api/auth", authRoutes);
	// User profile endpoints
	app.use('/api/user', userRouter);
	// Health endpoints (must come before SSR catch-all)
	app.get("/healthcheck", healthCheck);

	app.use("/", createSsrMiddleware({ vite, template, isProd }));

	// 404 handler (only reached if SSR middleware didn't handle)
	app.use((req, res, next) => {
		if (res.headersSent) return next();
		res.status(404).json({ error: "Not Found", path: req.originalUrl });
	});

	// Central error handler
	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		console.error("Unhandled error:", err);
		if (res.headersSent) return next(err);
		const body = isProd
			? { error: "Internal Server Error" }
			: { error: "Internal Server Error", details: err?.stack || String(err) };
		res.status(err.status || 500).json(body);
	});

	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}`);
	});
}

createServer();
