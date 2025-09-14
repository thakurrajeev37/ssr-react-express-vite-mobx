import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Header() {
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
				</Box>
			</Toolbar>
		</AppBar>
	);
}
