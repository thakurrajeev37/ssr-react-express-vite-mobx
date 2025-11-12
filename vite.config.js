import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => {
	const isSSR = Boolean(isSsrBuild);
			return {
				plugins: [react()],
				publicDir: "public",
				build: {
					ssr: isSSR ? "src/entry-server.jsx" : false,
					manifest: !isSSR,
					outDir: isSSR ? "dist/server" : "dist/client",
					rollupOptions: isSSR
						? {
								input: "src/entry-server.jsx",
							}
						: {
								input: "index.html",
							},
				},
				server: {
					port: 5173,
				},
				ssr: { noExternal: [] },
			};
});
