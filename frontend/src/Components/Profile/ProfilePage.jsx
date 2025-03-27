import React, { useState } from "react";
import { Container, Grid, TextField, Button, Typography, Snackbar } from "@mui/material";
import axios from 'axios';

const ProfilePage = (props) => {
    const [username, setUsername] = useState(props.data.username);
    const [email, setEmail] = useState(props.data.email);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleUsernameUpdate = async () => {
        const body = {
            username,
            userId: props.data._id,
        };

        try {
            const response = await axios.put('http://localhost:3001/fan/edit', body, { 
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });

            setSuccessMessage("Username updated successfully!");
            localStorage.setItem("user", JSON.stringify(response.data.user));
        } catch (error) {
            setErrorMessage(error.response?.data?.msg || "Server error: " + error.message);
        }
    };

    const handleEmailUpdate = async () => {
        const body = {
            email,
            userId: props.data._id,
        };

        try {
            const response = await axios.put('http://localhost:3001/fan/edit', body, { 
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });

            setSuccessMessage("Email updated successfully!");
            localStorage.setItem("user", JSON.stringify(response.data.user));
        } catch (error) {
            setErrorMessage(error.response?.data?.msg || "Server error: " + error.message);
        }
    };

    const handlePasswordUpdate = async () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage("New passwords do not match");
            return;
        }

        const body = {
            password: newPassword,
            userId: props.data._id,
        };

        try {
            const response = await axios.put('http://localhost:3001/fan/edit', body, { 
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });

            setNewPassword("");
            setConfirmPassword("");
            setSuccessMessage("Password updated successfully!");
        } catch (error) {
            setErrorMessage(error.response?.data?.msg || "Server error: " + error.message);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Edit Profile
            </Typography>
            
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        type="button" 
                        variant="contained" 
                        color="success" 
                        onClick={handleUsernameUpdate}
                    >
                        Update Username
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        type="button" 
                        variant="contained" 
                        color="success" 
                        onClick={handleEmailUpdate}
                    >
                        Update Email
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        type="button" 
                        variant="contained" 
                        color="success" 
                        onClick={handlePasswordUpdate}
                    >
                        Change Password
                    </Button>
                </Grid>
            </Grid>

            <Snackbar
                open={Boolean(errorMessage)}
                autoHideDuration={6000}
                onClose={() => setErrorMessage("")}
                message={errorMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
            <Snackbar
                open={Boolean(successMessage)}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage("")}
                message={successMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </Container>
    );
};

export default ProfilePage;
