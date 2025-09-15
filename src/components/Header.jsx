import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { observer } from "mobx-react";
import { authStore } from "../stores/authStore";

function Header() {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => { setMounted(true); }, []);
	return (
		<AppBar position="static" color="primary" enableColorOnDark>
			<Toolbar variant="regular" sx={{ gap: 2 }}>
				<Typography
					variant="h6"
					component={RouterLink}
					to="/"
					color="inherit"
					sx={{ textDecoration: "none", flexGrow: 1 }}
				>
					SSR App
				</Typography>
				<Box sx={{ display: "flex", gap: 1 }}>
					<Button component={RouterLink} to="/" color="inherit" size="small">
						Home
					</Button>
					<Button
						component={RouterLink}
						to="/about"
						color="inherit"
						size="small"
					>
						About
					</Button>
					{mounted ? (
						<>
							{authStore.isAuthenticated && (
								<Button
									component={RouterLink}
									to="/dashboard"
									color="inherit"
									size="small"
								>
									Dashboard
								</Button>
							)}
							{!authStore.isAuthenticated ? (
								<Button
									component={RouterLink}
									to="/auth"
									color="inherit"
									size="small"
								>
									Login
								</Button>
							) : (
								<Button
									color="inherit"
									size="small"
									onClick={() => authStore.logout()}
								>
									Logout
								</Button>
							)}
						</>
					) : null}
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default observer(Header);
