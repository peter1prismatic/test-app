/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { Button } from "./lib";
import * as mq from "../styles/media-queries";
import * as colors from "../styles/colors";
import { DiscoverBooksScreen } from "../screens/discover";
import { BookScreen } from "../screens/book";
import { NotFoundScreen } from "../screens/not-found";
import CreateProfile from "../components/CreateProfile";
import { useAuth } from "../contexts/AuthContext";
import { LoggedInNav } from "./LoggedInNav";

function AuthenticatedApp() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <React.Fragment>
      <LoggedInNav />
      {/* <div
        css={{
          margin: "0 auto",
          padding: "4em 2em",
          maxWidth: "840px",
          width: "100%",
          display: "grid",
          gridGap: "1em",
          gridTemplateColumns: "1fr 3fr",
          [mq.small]: {
            gridTemplateColumns: "1fr",
            gridTemplateRows: "auto",
            width: "100%",
          },
        }}
      > */}
      {/* <CreateProfile /> */}

      <main css={{ width: "100%" }}>
        <AppRoutes user={currentUser} />
      </main>
      {/* </div> */}
    </React.Fragment>
  );
}

function NavLink(props) {
  return (
    <Link
      css={{
        display: "block",
        padding: "8px 15px 8px 10px",
        margin: "5px 0",
        width: "100%",
        height: "100%",
        color: colors.text,
        borderRadius: "2px",
        borderLeft: "5px solid transparent",
        ":hover": {
          color: colors.indigo,
          textDecoration: "none",
          background: colors.gray10,
        },
      }}
      {...props}
    />
  );
}

function Nav() {
  return (
    <nav
      css={{
        position: "sticky",
        top: "4px",
        padding: "1em 1.5em",
        border: `1px solid ${colors.gray10}`,
        borderRadius: "3px",
        [mq.small]: {
          position: "static",
          top: "auto",
        },
      }}
    >
      <ul
        css={{
          listStyle: "none",
          padding: "0",
        }}
      >
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  );
}

function AppRoutes({ user }) {
  return (
    <Switch>
      <Route path="/create-profile">
        <CreateProfile />
      </Route>
      <Route path="*" element={<NotFoundScreen />} />
    </Switch>
  );
}

export { AuthenticatedApp };
