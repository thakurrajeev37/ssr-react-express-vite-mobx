import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, Typography, Box } from "@mui/material";
import Alert from '@mui/material/Alert';
import { authStore } from "../stores/authStore";
export default observer(function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate();

	// Simple email regex for validation
	const validateEmail = value => {
		if (!value) return "Email is required";
		const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
		return re.test(value) ? "" : "Invalid email address";
	};

	const validatePassword = value => {
		if (!value) return "Password is required";
		if (value.length < 6) return "Password must be at least 6 characters";
		return "";
	};

	const handleEmailChange = e => {
		const value = e.target.value;
		setEmail(value);
		setEmailError(validateEmail(value));
	};

	const handlePasswordChange = e => {
		const value = e.target.value;
		setPassword(value);
		setPasswordError(validatePassword(value));
	};

	const handleSubmit = e => {
		e.preventDefault();
		const emailErr = validateEmail(email);
		const passwordErr = validatePassword(password);
		setEmailError(emailErr);
		setPasswordError(passwordErr);
		if (!emailErr && !passwordErr) {
			authStore.login(email, password);
		}
	};

	useEffect(() => {
		if (authStore.isAuthenticated) {
			navigate("/dashboard", { replace: true });
		}
	}, [authStore.isAuthenticated, navigate]);

	const isFormValid = !emailError && !passwordError && email && password;

	return (
		<Card sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 3 }}>
			<Typography variant="h5" align="center" gutterBottom>Login</Typography>
			{authStore.error && (
				<Alert severity="error" sx={{ mb: 2 }}>
					{authStore.error}
				</Alert>
			)}
			<Box component="form" onSubmit={handleSubmit}>
				<TextField
					label="Email"
					type="email"
					fullWidth
					required
					margin="normal"
					value={email}
					onChange={handleEmailChange}
					error={!!emailError}
					helperText={emailError}
				/>
				<TextField
					label="Password"
					type="password"
					fullWidth
					required
					margin="normal"
					value={password}
					onChange={handlePasswordChange}
					error={!!passwordError}
					helperText={passwordError}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					sx={{ mt: 2 }}
					disabled={authStore.loading || !isFormValid}
				>
					Login
				</Button>
			</Box>
		</Card>
	);
});
