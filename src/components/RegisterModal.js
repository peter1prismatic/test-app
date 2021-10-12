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

export default function RegisterModal() {
  const [open, setOpen] = React.useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
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

  async function handleRegister(e) {
    e.preventDefault();

    setStatus("loading");

    try {
      setError();
      setStatus("loading");
      console.log("hellooooo");

      await signup(email, password);
      console.log("hellooooo2");
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/signup`, {
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);

          history.push("/my-profile");
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
          setStatus("error");
        });
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setStatus("error");
    }
    setStatus("success");
  }

  // axios
  //   .post(`${process.env.REACT_APP_BASE_URL}/signup`, {
  //     email,
  //     password,
  //   })
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
  // }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Register
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
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
            <Button onClick={handleRegister} color="primary">
              Register
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
