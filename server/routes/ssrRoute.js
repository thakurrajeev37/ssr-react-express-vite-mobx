import path from "node:path";
import { createInitialStores } from "../initialStores.js";

// Factory to create the SSR middleware with captured dependencies (vite, template, isProd)
export function createSsrMiddleware({ vite, template, isProd }) {
	if (!template) {
		throw new Error("SSR middleware requires an HTML template");
	}
	return async function ssrMiddleware(req, res, next) {
		try {
			const url = req.originalUrl;
			let html = template;
			if (!isProd) {
				html = await vite.transformIndexHtml(url, html);
			}

			let renderModule;
			if (!isProd) {
				renderModule = await vite.ssrLoadModule("/src/entry-server.jsx");
			} else {
				renderModule = await import(
					path.resolve(process.cwd(), "dist/server/entry-server.js")
				);
			}
					const render = renderModule && renderModule.render;
					if (typeof render !== "function") {
						throw new Error("SSR entry did not export a named 'render' function");
					}

			const initialStores = createInitialStores(url);
			const {
				appHtml,
				stateScript = "",
				status = 200,
			} = await render(url, { initialStores });

			const finalHtml = html
				.replace("<!--app-html-->", appHtml)
				.replace("<!--app-state-->", stateScript);

			res
				.status(status)
				.set({
					"Content-Type": "text/html; charset=utf-8",
					"Cache-Control": status === 200 ? "no-store" : "no-store",
				})
				.send(finalHtml);
		} catch (e) {
			if (!isProd && vite) vite.ssrFixStacktrace(e);
			// eslint-disable-next-line no-console
			console.error("SSR render failed:", e);
			if (res.headersSent) return next(e);
			res
				.status(500)
				.type("html")
				.send(
					"<!DOCTYPE html><html><head><title>500</title></head><body><h1>Internal Server Error</h1><p>SSR failure.</p></body></html>",
				);
		}
	};
}
