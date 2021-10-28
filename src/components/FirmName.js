import React, { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Spinner } from "./lib";
import axios from "axios";

export default function FirmName({ firmName }) {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();
  const history = useHistory();
  const [newFirmName, setNewFirmName] = useState("");
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");

  const isLoading = status === "loading";

  const bearerToken = `Bearer ${token}`;

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "application/json",
      },
    };
  }, [bearerToken]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError();
    setOpen(false);
  };

  async function handleAddNewFirmName(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      setError();
      setStatus("loading");
      console.log("about to send axios call");
      const firmNameId = newFirmName.replace(/\s+/g, "-").toLowerCase();
      console.log(firmNameId);

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/user`,
          { firmNameId: firmNameId },
          config
        )
        .then(() => {
          handleClose();
          history.push(`/user/${firmNameId}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setStatus("error");
    }
    setStatus("success");
  }

  return (
    <div>
      <h2 variant="outlined" color="primary" onClick={handleClickOpen}>
        {firmName}
      </h2>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Firm Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firmName"
            label="Edit Firm Name"
            type="text"
            onChange={(e) => setNewFirmName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        {error && (
          <Typography variant="body2" className="customError">
            {error}
          </Typography>
        )}
        <DialogActions>
          {isLoading ? (
            <Spinner />
          ) : (
            <Button onClick={handleAddNewFirmName} color="primary">
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
