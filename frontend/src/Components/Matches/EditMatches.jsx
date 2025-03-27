import { BiX, BiPencil } from "react-icons/bi";
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const EditMatches = (props) => {
  const today = new Date().toISOString().slice(0, 16);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    matchVenue: "",
    time: "",
    mainReferee: "",
    linesman1: "",
    linesman2: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setPopupVisible(false);
  };

  return (
    <div>
      <button onClick={togglePopup}>
        <BiPencil size={23} />
      </button>
      {isPopupVisible && (
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
                <Button onClick={togglePopup} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EditMatches;
