import React, { useState } from "react";
import { Button, TextField, Box, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";

const CreateStadium = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    numberOfRows: 0,
    numberOfSeatsPerRow: 0,
  });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3001/manager/addStadium", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      props.change(response.data); 
      setSnackbarMessage("Stadium created successfully!");
      setOpenSnackbar(true);
      setFormData({ name: "", numberOfRows: 0, numberOfSeatsPerRow: 0 });
    } catch (error) {
      console.error("Error creating stadium:", error);
      setSnackbarMessage("Failed to create stadium. Please try again.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
      props.closeDialog();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        width: '100%',
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <TextField
        label="Stadium Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        margin="normal"
      />

      <TextField
        label="Number of Rows"
        type="number"
        name="numberOfRows"
        value={formData.numberOfRows}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        margin="normal"
        inputProps={{ min: 1 }} 
      />

      <TextField
        label="Seats per Row"
        type="number"
        name="numberOfSeatsPerRow"
        value={formData.numberOfSeatsPerRow}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        margin="normal"
        inputProps={{ min: 1 }} 
      />

      <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setFormData({ name: "", numberOfRows: 0, numberOfSeatsPerRow: 0 });
            props.closeDialog();
          }}
          fullWidth
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default CreateStadium;
