import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [isLoading, setIsLoading] = useState(true);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    const fetchBookedTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/fan/getTickets/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(response.data);
      } catch (error) {
        showSnackbar('Failed to load tickets.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookedTickets();
  }, [userId]); 

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCancelTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
    setConfirmCancelOpen(true);
  };
  const confirmCancel = async () => {
    try {
      const token = localStorage.getItem('token');
      const ticket = tickets.find(ticket => ticket._id === selectedTicketId);
      const futureDate = ticket.matchId.dateTime; 
  
      await axios.delete(`http://localhost:3001/fan/cancelTicket/${selectedTicketId}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { futureDate } 
      });
      
      showSnackbar('Ticket canceled successfully!', 'success');
      setTickets((prev) => prev.filter(ticket => ticket._id !== selectedTicketId));
    } catch (error) {
      console.error('Failed to cancel ticket:', error); 
      showSnackbar('Failed to cancel the ticket. Please try again.', 'error');
    } finally {
      setConfirmCancelOpen(false);
      setSelectedTicketId(null);
    }
  };
  
  return (
    <Box sx={{ padding: 3, width: '70%', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        My Tickets
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List>
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <ListItem key={ticket._id} divider>
                <ListItemText
                  primary={`Match: ${ticket.matchId.homeTeam} vs ${ticket.matchId.awayTeam}`}
                  secondary={`Ticket ID: ${ticket._id} | Date: ${new Date(ticket.matchId.dateTime).toLocaleDateString()}`} // Display date
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleCancelTicket(ticket._id)}
                >
                  Cancel
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography>No tickets booked.</Typography>
          )}
        </List>
      )}

      <Dialog open={confirmCancelOpen} onClose={() => setConfirmCancelOpen(false)}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel this ticket?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmCancelOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={confirmCancel} color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyTickets;
