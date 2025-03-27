import React, { useState } from "react";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DisApproveUser = ({ id, onDisapprove }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    console.log(`Disapproved user with ID: ${id}`);
    onDisapprove();
    handleClose();
  };

  return (
    <>
      <Button color="error" onClick={handleOpen}>
        <CloseIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Disapprove User</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to disapprove this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="success">
            Disapprove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DisApproveUser;
