import React, { useMemo } from "react";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { motion } from "framer-motion";
import "./Todo.css";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodoAction } from "../store/userSlice";

export default function Todo({ todo }) {
  const { token } = useAuth();

  const dispatch = useDispatch();

  const bearerToken = `Bearer ${token}`;

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "multipart/form-data",
      },
    };
  }, [bearerToken]);
  const deleteTodo = () => {
    console.log("delete triggered");
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/todo/${todo.todoId}`, config)
      .then(() => {
        console.log("todo deleted");

        // getUser();
      })
      .catch((err) => {
        console.log("Todo delete failed");
        console.log(err);
        console.log(err.message);
      });
    dispatch(deleteTodoAction({ todo }));
  };
  return (
    <div className="todo-container">
      <p className="link">{todo.body}</p>

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
