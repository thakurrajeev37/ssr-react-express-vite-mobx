import React, { useState } from "react";
import { observer } from "mobx-react";
import { TextField, Button, Card, Typography, Box } from "@mui/material";
import Alert from '@mui/material/Alert';
import { authStore } from "../stores/authStore";
export default observer(function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

	const validateConfirmPassword = value => {
		if (!value) return "Confirm password is required";
		if (value !== password) return "Passwords do not match";
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
		setConfirmPasswordError(validateConfirmPassword(confirmPassword)); // re-validate confirmPassword
	};

	const handleConfirmPasswordChange = e => {
		const value = e.target.value;
		setConfirmPassword(value);
		setConfirmPasswordError(validateConfirmPassword(value));
	};

	const handleSubmit = e => {
		e.preventDefault();
		const emailErr = validateEmail(email);
		const passwordErr = validatePassword(password);
		const confirmPasswordErr = validateConfirmPassword(confirmPassword);
		setEmailError(emailErr);
		setPasswordError(passwordErr);
		setConfirmPasswordError(confirmPasswordErr);
		if (!emailErr && !passwordErr && !confirmPasswordErr) {
			authStore.register(email, password);
		}
	};

	const isFormValid = !emailError && !passwordError && !confirmPasswordError && email && password && confirmPassword;

		return (
			<Card sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 3 }}>
				<Typography variant="h5" align="center" gutterBottom>Register</Typography>
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
					<TextField
						label="Confirm Password"
						type="password"
						fullWidth
						required
						margin="normal"
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
						error={!!confirmPasswordError}
						helperText={confirmPasswordError}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ mt: 2 }}
						disabled={authStore.loading || !isFormValid}
					>
						Register
					</Button>
				</Box>
			</Card>
		);
});
