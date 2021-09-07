import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./Menu.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export const Menu = () => {
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

      <span style={{ padding: "10px" }}>
        <LoginModal />
      </span>
      <RegisterModal />
    </div>
  );
};
