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
import "./ManageEmailAccessList.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ManageEmailAccessList() {
  const [open, setOpen] = React.useState(false);
  const { login, token } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");

  const isLoading = status === "loading";
  const isSuccess = status === "success";

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

  async function handleAddEmail(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      setError();
      setStatus("loading");

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/user/addEmailToAccessList`,
          { email: email },
          config
        )
        .then(() => {
          console.log("email added");
          //   getUser();

          // handleButtonClick(videoNum);
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
    <div className="manage-email-access-list-container">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Manage Email Access List
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Email Access List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Add Email Address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
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
            <Button onClick={handleAddEmail} color="primary">
              Add Email
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
