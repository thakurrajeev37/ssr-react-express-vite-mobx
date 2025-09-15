import React from "react";
import { observer } from "mobx-react";
import { Card, Typography, Button } from "@mui/material";
import { authStore } from "../stores/authStore";

export default observer(function Dashboard() {
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>Dashboard</Typography>
      <Typography align="center" sx={{ mb: 2 }}>
        Welcome, {authStore.user?.email || "User"}!
      </Typography>
      <Button variant="contained" color="secondary" fullWidth onClick={() => authStore.logout()}>
        Logout
      </Button>
    </Card>
  );
});
