import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";
import { StoreContext } from "./stores/StoreContext.jsx";
import { createRootStores } from "./stores/rootStores.js";

export async function render(url, { initialStores } = {}) {
	const stores = createRootStores(initialStores || {});

	let status = 200;
	// Render with StaticRouter for SSR
	// Collector for page-level stores created during render
	const appHtml = renderToString(
		<StoreContext.Provider value={stores}>
			<StaticRouter location={url}>
				<App />
			</StaticRouter>
		</StoreContext.Provider>,
	);

	// Naive 404 detection: if NotFound content is present. In real apps, use route-match APIs.
	if (appHtml.includes("Not Found")) status = 404;

	const stateData = { stores: JSON.parse(JSON.stringify(stores)) };
	const stateScript = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(stateData).replace(/</g, "\\u003c")};</script>`;

	return { appHtml, stateScript, status };
}
