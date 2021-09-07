import React, { useState } from "react";
// import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Button } from "./lib";

import "./Menu.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useAuth } from "../contexts/AuthContext";

export const LoggedInMenu = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="menu-5">
      <ul className="ul-menu">
        <li className="menu-6">About us</li>
        <li>Community</li>
        <li>Services</li>
      </ul>
      {/* <Link to="/login" className="login-link">
        <Button variant="contained" color="secondary" className="login-btn">
          Log in
        </Button>
      </Link> */}

      <div
        className="logged-in-div"
        css={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "white",
        }}
      >
        <span style={{ padding: "10px" }}>{currentUser.email}</span>

        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};
