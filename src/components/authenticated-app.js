/** @jsxImportSource @emotion/react */

import React from "react";
import { Switch, Route } from "react-router-dom";

import { NotFoundScreen } from "../screens/not-found";
import CreateProfile from "../components/CreateProfile";
import { useAuth } from "../contexts/AuthContext";
import { LoggedInNav } from "./LoggedInNav";
import Discover from "../components/Discover";
import TestComponent from "./TestComponent";

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
      <Route path="/test-route">
        <TestComponent />
      </Route>
      <Route path="/my-profile">
        <CreateProfile />
      </Route>
      <Route path="/discover">
        <Discover />
      </Route>
      <Route path="/user/:firmName">
        <CreateProfile />
      </Route>
      <Route path="*" element={<NotFoundScreen />} />
    </Switch>
  );
}

export { AuthenticatedApp };
