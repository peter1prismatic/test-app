import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import { Spinner } from "./lib";

import { useDispatch } from "react-redux";

import { setUser } from "../store/userSlice";

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
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
      console.log("hellooooo");

      await login(email, password);
      console.log("hellooooo2");

      history.push("/create-profile");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setStatus("error");
    }
    setStatus("success");
  }

  // async function setUser() {
  //   console.log("config...");
  //   console.log(config);
  //   axios
  //     .get(`${process.env.REACT_APP_BASE_URL}/user`, config)
  //     .then((res) => {
  //       console.log("got the user");
  //       console.log(res.data);
  //       console.log("image Url");
  //       console.log(res.data.credentials.imageUrl);
  //       console.log("dispatching...");
  //       dispatch(setUser(res.payload));
  //       // setImageUrl(res.data.credentials.imageUrl);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // axios
  //   .post(`${process.env.REACT_APP_BASE_URL}/login`, { email, password })
  //   .then((res) => {
  //     console.log(res.data);
  //     setStatus("success");
  //     setOpen(false);
  //     history.push("/create-profile");
  //   })
  //   .catch((err) => {
  //     setErrors(err.response.data);
  //     setStatus("error");
  //   });

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
