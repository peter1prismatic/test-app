import "./App.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Products from "./pages/Products";
import SignUp from "./pages/SignUp";

import { Navbar } from "./components/Navbar";

const theme = createTheme({
  palette: {
    primary: {
      light: "35c3d1",
      main: "#03B4C6",
      dark: "027d8a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: "#0A0656",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/products" component={Products} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
