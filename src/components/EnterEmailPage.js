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

export default function EnterEmailPage() {
  const { signInAnonymously, login } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  function handleClose() {
    history.push("/");
  }

  async function handleAddEmail(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      setError();
      setStatus("loading");
      const firmNameId = window.location.pathname.slice(6);

      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/user/isOnAccessList/${email}/${firmNameId}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.isAuthenticated) {
            signInAnonymously();
          } else {
            setError("This email does not have access to this page");
          }
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
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
      {/* <Button variant="outlined" color="primary">
        Manage Email Access List
      </Button> */}
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          This page is protected. Please enter your email to access.
        </DialogTitle>
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
        </DialogContent>
        {error && (
          <Typography
            variant="body2"
            className="customError"
            style={{ marginLeft: 24, color: "red" }}
          >
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
            <Button onClick={handleAddEmail} color="primary">
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
