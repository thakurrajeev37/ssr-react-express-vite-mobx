import { createHomeStore } from "./homeStore.js";
import { createAboutStore } from "./aboutStore.js";
import { createAppStore } from "./appStore.js";
import { useStore } from "./StoreContext.jsx";
import { observer } from "mobx-react";

export function createRootStores(initial = {}) {
	return {
		app: createAppStore(initial.app || {}),
		home: createHomeStore(initial.home || {}),
		about: createAboutStore(initial.about || {}),
	};
}

// Hooks for individual page stores (used inside components)
export function useHomeStore() {
	return useStore().home;
}
export function useAboutStore() {
	return useStore().about;
}
export function useAppStore() {
	return useStore().app;
}

// Optional HOC if needed in future
export const withStores = (Comp) => observer(Comp);
