/** @jsxImportSource @emotion/react */

import React from "react";
import { Switch, Route } from "react-router-dom";

import { NotFoundScreen } from "../screens/not-found";
import CreateProfile from "../components/CreateProfile";
import { useAuth } from "../contexts/AuthContext";
import { LoggedInNav } from "./LoggedInNav";
import Discover from "../components/Discover";
import TestComponent from "./TestComponent";
import CheckUser from "./CheckUser";
import Footer from "./Footer";
import MainSection from "./MainSection";

function AuthenticatedApp() {
  const { currentUser } = useAuth();

  return (
    <React.Fragment>
      <LoggedInNav />

      <main css={{ width: "100%" }}>
        <AppRoutes user={currentUser} />
      </main>
    </React.Fragment>
  );
}

function AppRoutes({ user }) {
  return (
    <Switch>
      <Route path="/fetching">
        <TestComponent />
      </Route>
      <Route path="/my-profile">
        <CreateProfile />
      </Route>
      <Route path="/discover">
        <Discover />
      </Route>
      <Route path="/user/:firmNameId">
        <CheckUser />
      </Route>
      <Route path="*">
        <MainSection />
      </Route>
    </Switch>
  );
}

export { AuthenticatedApp };
