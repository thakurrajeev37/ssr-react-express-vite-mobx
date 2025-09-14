// Service responsible for providing initial About store data for SSR
// In future this could fetch from a DB or external API.

export function getInitialAboutData() {
	return {
		info: "About page data loaded (ssr rendering)",
		loaded: true,
	};
}
