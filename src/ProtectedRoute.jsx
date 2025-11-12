import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import { observer } from "mobx-react";
import { Navigate } from "react-router-dom";
import { authStore } from "./stores/authStore";
export default observer(function ProtectedRoute({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only checkAuth if user is logged in (has accessToken)
    if (authStore.isAuthenticated) {
      authStore.checkAuth();
    }
  }, []);

  if (!mounted) {
    // On SSR, or before client mount, render nothing to avoid mismatch
    return null;
  }
  if (!authStore.isAuthenticated) {
    // Show MUI Alert before redirect
    return (
      <>
        <Alert severity="error" sx={{ mb: 2 }}>
          You must be logged in to access this page.
        </Alert>
        <Navigate to="/auth" replace />
      </>
    );
  }
  return children;
});
