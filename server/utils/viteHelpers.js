import fs from "node:fs";
import path from "node:path";
import express from "express";

// Initialize Vite in middleware mode for development, and return vite instance + HTML template
export async function initViteDevServer(app) {
  const { createServer: createViteServer } = await import("vite");
  const viteInstance = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(viteInstance.middlewares);
  const devTemplate = await fs.promises.readFile(
    path.resolve(process.cwd(), "index.html"),
    "utf-8",
  );
  return { vite: viteInstance, template: devTemplate };
}

// Serve built static assets and return the production HTML template
export async function initProdStatic(app) {
  const distClientDir = path.resolve(process.cwd(), "dist/client");
  app.use(
    "/assets",
    express.static(path.join(distClientDir, "assets"), {
      maxAge: "1y",
      immutable: true,
    }),
  );
  app.use(express.static(distClientDir, { index: false, maxAge: "1h" }));
  const prodTemplate = await fs.promises.readFile(
    path.join(distClientDir, "index.html"),
    "utf-8",
  );
  return { template: prodTemplate };
}
