import React from "react";
import { MobileMenu } from "./MobileMenu";
import { Link } from "react-router-dom";
import { Menu } from "./Menu";

import "./Navbar.css";

export const Navbar = () => {
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
      <Menu className="menu-3" />
    </div>
  );
};
