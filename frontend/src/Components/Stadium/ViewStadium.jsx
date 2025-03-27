import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import CreateStadium from "./CreateStadium";
import axios from "axios";

function ViewStadium() {
  const data = localStorage.getItem("user");
  const userType = data ? JSON.parse(data).role : null;
  const [stadiums, setStadiumData] = useState([]); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function changeStadiums(updatedStadium) {
    setStadiumData((prevStadiums) => [...prevStadiums, updatedStadium]);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/manager/allStadium", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStadiumData(response.data);
      } catch (error) {
        console.error("Error fetching stadiums:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Stadiums
      </Typography>

      <Grid container spacing={3}>
        {stadiums.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h5">{item.name}</Typography>
              <Typography variant="body1">Rows: {item.numberOfRows}</Typography>
              <Typography variant="body1">Seats per Row: {item.numberOfSeatsPerRow}</Typography>
              <Typography variant="body1">{item.numberOfRows * item.numberOfSeatsPerRow} total seats</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {userType === "Manager" && (
        <Button
          variant="contained"
          color="success"
          onClick={() => setIsDialogOpen(true)} 
          style={{ marginTop: "20px" }}
        >
          Create Stadium
        </Button>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Create a New Stadium</DialogTitle>
        <DialogContent>
          <CreateStadium change={changeStadiums} closeDialog={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default ViewStadium;
