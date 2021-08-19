import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { motion } from "framer-motion";

import "./MobileMenu.css";

export const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  let menu, menuMask;
  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };

  if (showMenu) {
    menu = (
      <div className="mobile-menu">
        <ul className="mobile-links">
          <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{ delay: 0.1 }}
          >
            About us
          </motion.li>
          <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{ delay: 0.2 }}
          >
            Community
          </motion.li>
          <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{ delay: 0.3 }}
          >
            Services
          </motion.li>
          <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{ delay: 0.4 }}
          >
            Login
          </motion.li>
        </ul>
      </div>
    );

    menuMask = (
      <div className="menu-mask" onClick={() => setShowMenu(false)}></div>
    );
  }

  return (
    <div className="navbar">
      <div className="navbar-container-2">
        <MenuIcon
          className="menu-icon"
          aria-controls="simple-menu"
          aria-haspopup="true"
          style={{ fontSize: 18 }}
          onClick={() => setShowMenu(!showMenu)}
        />

        {menuMask}
        {menu}
      </div>
    </div>
  );
};
