import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import "./DocSend.css";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Todo from "./Todo";

export default function DocSend() {
  const user = useSelector((state) => state.user);

  const { token } = useAuth();

  const bearerToken = `Bearer ${token}`;

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "multipart/form-data",
      },
    };
  }, [bearerToken]);

  return (
    <div>
      <div>
        {user.todos.map((todo) => (
          <Todo key={todo.todoId} todo={todo} />
        ))}
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
