import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { TextField } from "@material-ui/core";
import Button from "@mui/material/Button";

import "./DocSend.css";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Document from "./Document";
import { useDispatch } from "react-redux";
import { addDocument } from "../store/userSlice";

export default function DocSend() {
  const user = useSelector((state) => state.user);
  const [newDocument, setNewDocument] = useState();
  const dispatch = useDispatch();

  const { token } = useAuth();
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

  async function handleAddNewFirmName(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      setError();
      setStatus("loading");

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/user/addDocument`,
          { document: newDocument },
          config
        )
        .then(() => {
          dispatch(addDocument(newDocument));
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
      <div>
        {user.credentials.documents &&
          user.credentials.documents.map((doc) => (
            <Document key={uuidv4()} doc={doc} />
          ))}
        <TextField
          autoFocus
          margin="dense"
          id="firmName"
          label="Paste docsend link"
          type="text"
          onChange={(e) => setNewDocument(e.target.value)}
          fullWidth
        />
        <Button onClick={handleAddNewFirmName} color="primary">
          Submit
        </Button>
      </div>

      {/* <div className="todo">
        <li className="list">
          {todo.complete ? (
            <CheckCircleRoundedIcon
              className="icon"
              onClick={completeTodo}
              fontSize="large"
            />
          ) : (
            <CheckCircleOutlineRoundedIcon
              className="icon"
              onClick={completeTodo}
              fontSize="large"
            />
          )}
          <motion.div>
            <HighlightOffRoundedIcon
              className="icon"
              onClick={deleteTodo}
              fontSize="large"
            />
          </motion.div>
          <h5 className={todo.complete ? "complete" : "pending  "}>
            {todo.title}
          </h5>
        </li>
      </div> */}
    </div>
  );
}
