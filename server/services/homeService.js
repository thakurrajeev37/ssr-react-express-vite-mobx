// Service providing initial Home store data for SSR.
export function getInitialHomeData() {
	return {
		greeting: "Welcome to the Home page",
		visits: 0,
	};
}
