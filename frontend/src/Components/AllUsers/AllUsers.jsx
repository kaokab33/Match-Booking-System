import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import User from "../PendingUsers/User";
export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = localStorage.getItem("user");
        const role = JSON.parse(data).role;
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/admin/approved", {
          headers: {
            Authorization: `Bearer ${token}`,
            Role: role,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const data = localStorage.getItem("user");
      const role = JSON.parse(data).role;
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/admin/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Role: role,
        },
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId)); 
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress /> 
        </Grid>
      ) : users.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No users found. Please check back later.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card>
                <User user={user} /> 
                <CardActions>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => setSelectedUser(user)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedUser && (
        <Dialog open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete {selectedUser.username}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedUser(null)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(selectedUser._id)}
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
