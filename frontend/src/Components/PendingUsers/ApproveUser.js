import React, { useState } from "react";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ApproveUser = ({ id, onApprove }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleConfirm = () => {
        console.log(`Approved user with ID: ${id}`);
        onApprove();
        handleClose();
    };

    return (
        <>
            <Button color="success" onClick={handleOpen}>
                <CheckIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Approve User</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to approve this user?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="success">
                        Approve
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ApproveUser;
