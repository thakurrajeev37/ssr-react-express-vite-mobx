import fs from "node:fs";
import path from "node:path";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { healthCheck } from "./controllers/healthController.js";
// SSR moved into dedicated route module
import { createSsrMiddleware } from "./routes/ssrRoute.js";

const isProd = process.env.NODE_ENV === "production";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function createServer() {
	const app = express();

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
		const { createServer: createViteServer } = await import("vite");
		vite = await createViteServer({
			server: { middlewareMode: true },
			appType: "custom",
		});
		app.use(vite.middlewares);
		template = fs.readFileSync(
			path.resolve(process.cwd(), "index.html"),
			"utf-8",
		);
	} else {
		// Serve built static assets
		const distClientDir = path.resolve(process.cwd(), "dist/client");
		app.use(
			"/assets",
			express.static(path.join(distClientDir, "assets"), {
				maxAge: "1y",
				immutable: true,
			}),
		);
		// Serve other static files (e.g., copied from public like /logo.svg)
		app.use(express.static(distClientDir, { index: false, maxAge: "1h" }));
		template = fs.readFileSync(path.join(distClientDir, "index.html"), "utf-8");
	}


	// Auth endpoints (API)
	app.post("/api/login", express.json(), (req, res) => {
		const { email, password } = req.body;
		// TODO: Implement real authentication logic
		if (email && password) {
			return res.json({ success: true, message: `Login successful for ${email}` });
		}
		res.status(400).json({ success: false, error: "Missing email or password" });
	});

	app.post("/api/register", express.json(), (req, res) => {
		const { email, password, confirmPassword } = req.body;
		// TODO: Implement real registration logic
		if (!email || !password || !confirmPassword) {
			return res.status(400).json({ success: false, error: "Missing fields" });
		}
		if (password !== confirmPassword) {
			return res.status(400).json({ success: false, error: "Passwords do not match" });
		}
		return res.json({ success: true, message: `Registration successful for ${email}` });
	});

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
