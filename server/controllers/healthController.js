// Basic health check (liveness) controller
// Could be extended to include dependency checks.
export function healthCheck(req, res) {
	res.json({
		status: "ok",
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	});
}
