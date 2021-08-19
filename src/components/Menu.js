import React from "react";
import { Button } from "@material-ui/core";

import "./Menu.css";

export const Menu = () => {
  return (
    <div className="menu-5">
      <ul className="ul-menu">
        <li className="menu-6">About us</li>
        <li>Community</li>
        <li>Services</li>
      </ul>
      <Button variant="contained" color="secondary">
        Log in
      </Button>
      <Button variant="contained" color="primary">
        Request Access
      </Button>
    </div>
  );
};
