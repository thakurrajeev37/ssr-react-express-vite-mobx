import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Snackbar,
  Alert
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { observer } from "mobx-react";
import { authStore } from "../stores/authStore";
import ProtectedRoute from "../ProtectedRoute";
import axios from "axios";

function validateProfile(profile) {
  const errors = {};
  if (!profile.name) errors.name = "Name is required";
  if (!profile.email) errors.email = "Email is required";
  // Add more validation as needed
  return errors;
}

const Profile = observer(() => {
  const user = authStore.user || {};
  const token = authStore.accessToken;
  const [profile, setProfile] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    bio: user.bio || "",
    avatar: user.avatar || ""
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const fileInputRef = useRef();

  useEffect(() => {
    async function fetchProfile() {
      try {
        console.log("authStore:", authStore);
        const res = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          bio: res.data.bio || "",
          avatar: res.data.avatar || ""
        });
        setAvatarPreview(res.data.avatar || "");
      } catch (err) {
        setSnackbar({ open: true, message: "Failed to load profile.", severity: "error" });
      }
    }
    fetchProfile();
  }, [token]);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setProfile({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      bio: user.bio || "",
      avatar: user.avatar || ""
    });
    setAvatarPreview(user.avatar || "");
    setEditMode(false);
    setErrors({});
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const validationErrors = validateProfile(profile);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.put("/api/user/profile", profile, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditMode(false);
        setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
      } catch (err) {
        setSnackbar({ open: true, message: "Failed to update profile.", severity: "error" });
      }
    } else {
      setSnackbar({ open: true, message: "Please fix validation errors.", severity: "error" });
    }
  };

  return (
    <ProtectedRoute>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", bgcolor: "background.default", p: 4 }}>
        <Card sx={{ maxWidth: 500, width: '100%', p: 3, boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={avatarPreview}
                sx={{ width: 96, height: 96, mb: 2, bgcolor: 'primary.main', fontSize: 40 }}
              >
                {profile.name ? profile.name[0] : 'U'}
              </Avatar>
              {editMode && (
                <Button variant="outlined" component="label" size="small" sx={{ mb: 1 }}>
                  Change Picture
                  <input type="file" accept="image/*" hidden onChange={handleAvatarChange} ref={fileInputRef} />
                </Button>
              )}
            </Box>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{ readOnly: !editMode }}
                required
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{ readOnly: true }}
                required
                fullWidth
              />
              <TextField
                label="Phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                InputProps={{ readOnly: !editMode }}
                fullWidth
              />
              <TextField
                label="Bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                multiline
                minRows={2}
                InputProps={{ readOnly: !editMode }}
                fullWidth
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {!editMode ? (
                  <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ProtectedRoute>
  );
});

export default Profile;
