import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "./lib";

import { useAuth } from "../contexts/AuthContext";
import "./LoggedInMenu.css";

export const LoggedInMenu = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/");
    } catch {
      console.log("Failed to log out");
    }
  }

  return (
    <div className="menu-5">
      <Link to="/discover" className="login-link">
        <button className="login-btn">Discover</button>
      </Link>
      <Link to="/my-profile" className="login-link">
        <button className="login-btn">My Profile</button>
      </Link>
      )
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
