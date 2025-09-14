import React from "react";

export const StoreContext = React.createContext(null);

export function useStore() {
	const store = React.useContext(StoreContext);
	if (!store) {
		throw new Error("useStore must be used within a StoreProvider");
	}
	return store;
}
