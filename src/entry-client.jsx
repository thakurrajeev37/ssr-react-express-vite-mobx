import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreContext } from "./stores/StoreContext.jsx";
import { createRootStores } from "./stores/rootStores.js";
import App from "./App.jsx";

const state = window.__INITIAL_STATE__ || {};
const container = document.getElementById("root");

// Prefer hydrateRoot if SSR content exists, else createRoot for CSR
const stores = createRootStores(state.stores || {});
const app = (
	<StoreContext.Provider value={stores}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StoreContext.Provider>
);

if (container.hasChildNodes()) {
	hydrateRoot(container, app);
} else {
	createRoot(container).render(app);
}
