import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { Spinner } from "./lib";

import { useDispatch } from "react-redux";

import { setUser } from "../store/userSlice";

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const { login, token } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError();
    setOpen(false);
  };

  async function handleLogin(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      setError();
      setStatus("loading");

      await login(email, password);

      history.push("/fetching");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setStatus("error");
    }
    setStatus("success");
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        {error && (
          <Typography variant="body2" className="customError">
            {error}
          </Typography>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {isLoading ? (
            <Spinner />
          ) : (
            <Button onClick={handleLogin} color="primary">
              Login
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
