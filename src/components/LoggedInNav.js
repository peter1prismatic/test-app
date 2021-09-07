import React from "react";
import { MobileMenu } from "./MobileMenu";
import { Link } from "react-router-dom";
import { Menu } from "./Menu";
import { LoggedInMenu } from "./LoggedInMenu";
// import logo from "/prismatic/Prismatic FINAL LOGO-3.png";

import "./Navbar.css";

export const LoggedInNav = () => {
  return (
    <div className="navbar-container">
      <Link to="/" className="navbar-logo">
        <img
          className="prismatic-logo"
          src="/prismatic/Prismatic FINAL LOGO-3.png"
          alt=""
        />
      </Link>
      <MobileMenu className="mobile-menu-2" />
      <LoggedInMenu className="menu-3" />
    </div>
  );
};
