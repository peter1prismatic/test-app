/** @jsxImportSource @emotion/react */

import * as React from "react";
import { Input, Button, Spinner, FormGroup, ErrorMessage } from "./lib";
import { Modal, ModalContents, ModalOpenButton } from "./modal";
import { Logo } from "./logo";
import { useAsync } from "../utils/hooks";
import { Navbar } from "./Navbar";
import MainSection from "./MainSection";
import LoginModal from "./LoginModal";
import { Switch, Route, Redirect } from "react-router-dom";
import User from "../pages/User";
import StaticProfile from "./Profile/StaticProfile";

function UnauthenticatedApp() {
  console.log("unauthenticated app");
  return (
    <>
      <Navbar />

      <Switch>
        <Route path="/user/:firmName">
          <StaticProfile />
        </Route>
        <Route exact path="/users/:handle" component={User} />
        <Route exact path="/">
          <MainSection />
        </Route>
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    </>
  );
}

export { UnauthenticatedApp };
