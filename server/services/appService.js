// Service providing initial App store data for SSR.
// Accepts url and Date instance (for testability / determinism if injected).
export function getInitialAppData({ url, now = new Date() } = {}) {
	return {
		message: "From Express backend",
		url,
		time: now.toISOString(),
		footerText: `© ${now.getFullYear()} My SSR App (fetched from server)`,
	};
}
