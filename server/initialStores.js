// Factory for initial MobX store state used during SSR
// Separated from server/index.js for clarity & testability.
import { getInitialAboutData } from "./services/aboutService.js";
import { getInitialAppData } from "./services/appService.js";
import { getInitialHomeData } from "./services/homeService.js";

export function createInitialStores(url) {
	const now = new Date();
	return {
		app: getInitialAppData({ url, now }),
		home: getInitialHomeData(),
		about: getInitialAboutData(),
	};
}
