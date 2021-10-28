import React, { useMemo } from "react";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { motion } from "framer-motion";
import "./Todo.css";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { deleteTodoAction } from "../store/userSlice";

export default function Document({ doc }) {
  const { token } = useAuth();

  const dispatch = useDispatch();

  const bearerToken = `Bearer ${token}`;

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "application/json",
      },
    };
  }, [bearerToken]);
  const deleteTodo = () => {
    console.log("delete triggered");
    console.log(doc);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/user/removeDocument`,
        { document: doc },
        config
      )
      .then(() => {
        dispatch(deleteTodoAction({ doc }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="todo-container">
      <p className="link">{doc}</p>

      <motion.div>
        <HighlightOffRoundedIcon
          className="icon"
          fontSize="large"
          onClick={deleteTodo}
        />
      </motion.div>
    </div>
  );
}
