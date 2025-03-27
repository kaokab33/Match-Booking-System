import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { BiX } from "react-icons/bi";

const CreateMatches = (props) => {
  const today = new Date().toISOString().slice(0, 16);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    homeTeam: "",
    awayTeam: "",
    matchVenue: "",
    time: "",
    mainReferee: "",
    linesman1: "",
    linesman2: "",
    role: localStorage.getItem("userType"),
  });

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setPopupVisible(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={togglePopup}>
        Add Match
      </Button>

      <Dialog open={isPopupVisible} onClose={togglePopup}>
        <DialogTitle>
          Fill Match Details
          <Button onClick={togglePopup} style={{ position: "absolute", right: 10, top: 10 }}>
            <BiX />
          </Button>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth
                label="Home Team"
                name="homeTeam"
                value={formData.homeTeam}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Away Team"
                name="awayTeam"
                value={formData.awayTeam}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Match Venue"
                name="matchVenue"
                value={formData.matchVenue}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Date & Time"
                name="time"
                type="datetime-local"
                value={formData.time}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                inputProps={{ min: today }}
              />
              <TextField
                fullWidth
                label="Main Referee"
                name="mainReferee"
                value={formData.mainReferee}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Linesman 1"
                name="linesman1"
                value={formData.linesman1}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Linesman 2"
                name="linesman2"
                value={formData.linesman2}
                onChange={handleChange}
                margin="normal"
              />
            </div>
            <DialogActions>
              <Button variant="outlined" onClick={togglePopup}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateMatches;
