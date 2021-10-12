import * as React from "react";
import { AuthenticatedApp } from "./components/authenticated-app";
import { UnauthenticatedApp } from "./components/unauthenticated-app";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Router>
      <AuthenticatedApp />
    </Router>
  ) : (
    <Router>
      <UnauthenticatedApp />
    </Router>
  );
}

export default App;
