// import "./App.css";
// import React, { useState } from "react";

// import { ThemeProvider, createTheme } from "@material-ui/core/styles";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Services from "./pages/Services";
// import Products from "./pages/Products";
// import SignUp from "./pages/SignUp";
// import CreateProfile from "./components/CreateProfile";
// import Login from "./pages/Login";

// import { Navbar } from "./components/Navbar";
// import SampleData from "./pages/SampleData";
// import { AuthProvider } from "./contexts/AuthContext";
// import { Container } from "react-bootstrap";
// import PrivateRoute from "./components/PrivateRoute";
// import ForgotPassword from "./components/ForgotPassword";
// import UpdateProfile from "./components/UpdateProfile";

// const theme = createTheme({
//   palette: {
//     primary: {
//       light: "35c3d1",
//       main: "#03B4C6",
//       dark: "027d8a",
//       contrastText: "#fff",
//     },
//     secondary: {
//       main: "#fff",
//       contrastText: "#0A0656",
//     },
//   },
// });

// function App() {
//   // const [user, setUser] = useState(null);

//   // const login = (form) => auth.login(form).then((u) => setUser(u));
//   // const register = (form) => auth.register(form).then((u) => setUser(u));
//   // const logout = () => {
//   //   auth.logout();
//   //   setUser(null);
//   // };
//   // return user ? (
//   //   <AuthenticatedApp user={user} logout={logout} />
//   // ) : (
//   //   <UnauthenticatedApp login={login} register={register} />
//   // );

//   return (
//     <AuthProvider>
//       <ThemeProvider theme={theme}>
//         <div className="App">
//           <Router>
//             <Navbar />
//             <Switch>
//               <Route path="/" exact component={Home} />
//               <Route path="/services" component={Services} />
//               <Route path="/products" component={Products} />
//               <Route path="/sample-data" component={SampleData} />

//               <Container
//                 className="d-flex align-items-center justify-content-center"
//                 style={{ minHeight: "100vh" }}
//               >
//                 <div className="w-100" style={{ maxWidth: "400px" }}>
//                   <PrivateRoute
//                     path="/create-profile"
//                     component={CreateProfile}
//                   />
//                   <Route path="/signup" component={SignUp} />
//                   <Route path="/login" component={Login} />
//                   <Route path="/forgot-password" component={ForgotPassword} />
//                   <Route path="/update-profile" component={UpdateProfile} />
//                 </div>
//               </Container>
//             </Switch>
//           </Router>
//         </div>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// }

// export default App;

/** @jsxImportSource @emotion/react */

import * as React from "react";
// import * as auth from "auth-provider";
import { auth } from "./firebase";

import { AuthenticatedApp } from "./components/authenticated-app";
import { UnauthenticatedApp } from "./components/unauthenticated-app";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import CreateProfile from "./components/CreateProfile";

function App() {
  // const [user, setUser] = React.useState(null);

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

  // return (
  //   <Router>
  //     {/* <AuthenticatedApp user={user} logout={logout} />

  //       <UnauthenticatedApp login={login} signup={signup} /> */}

  //     <Switch>
  //       <Route exact path="/" component={UnauthenticatedApp} />
  //       <PrivateRoute path="/create-profile" component={CreateProfile} />
  //     </Switch>
  //   </Router>
  // );
}

export default App;
