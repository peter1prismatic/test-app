/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import "./LoginComponent.css";
// import { Button } from "@material-ui/core";
import { Button, Input, FormGroup } from "./lib";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import { client } from "../utils/api-client";
import { Spinner } from "./lib";

function LoginComponent({ onSubmit, buttonText }) {
  const [status, setStatus] = React.useState("idle");
  const [data, setData] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState(false);

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  const history = useHistory();

  React.useEffect(() => {
    if (!queried) {
      return;
    }
    setStatus("loading");

    const body = { email, password };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    client("login", config).then(
      (responseData) => {
        setData(responseData);
        setStatus("success");
        history.push("/sample-data");
      },
      (errData) => {
        setErrors(errData);
        setStatus("error");
        setQueried(false);
      }
    );
  }, [queried, email, password, history]);

  function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    setQueried(true);
    setEmail(event.target.elements.email.value);
    setPassword(event.target.elements.password.value);
  }

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [errors, setErrors] = useState({});
  // const [query, setQuery] = useState();
  // const [queried, setQueried] = useState(false);
  // const [status, setStatus] = useState("idle");

  // const isLoading = status === "loading";
  // const isSuccess = status === "success";

  // const history = useHistory();

  // console.log(query);

  // useEffect(() => {
  //   if (!queried) {
  //     return;
  //   }
  //   setStatus("loading");
  //   axios
  //     .post(`${process.env.REACT_APP_BASE_URL}/login`, { email, password })
  //     .then((res) => {
  //       console.log(res.data);
  //       setStatus("success");
  //       history.push("/sample-data");
  //     })
  //     .catch((err) => {
  //       setErrors(err.response.data);
  //     });
  // }, [history, queried]);

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   setQuery(event.target.elements.email.value);
  //   setQueried(true);
  //   const { email, password } = event.target.elements;
  // }
  return (
    // <form
    //   css={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "stretch",
    //     "> div": {
    //       margin: "10px auto",
    //       width: "100%",
    //       maxWidth: "300px",
    //     },
    //   }}
    //   onSubmit={handleSubmit}
    // >
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        id="email"
        name="email"
        type="email"
        label="Email"
        className="textField"
        helperText={errors.email}
        error={errors.email ? true : false}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        className="textField"
        helperText={errors.password}
        error={errors.password ? true : false}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      {errors.general && (
        <Typography variant="body2" className="customError">
          {errors.general}
        </Typography>
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="button"
          disabled={isLoading}
        >
          Login
          {isLoading && <CircularProgress size={30} className="progress" />}
        </Button>
      )}
      <br />
      <small>
        dont have an account ? sign up <Link to="/signup">here</Link>
      </small>
    </form>
    // {/* <FormGroup>
    //   <label htmlFor="email">Email</label>
    //   <Input id="email" type="text" />
    // </FormGroup>
    // <FormGroup>
    //   <label htmlFor="password">Password</label>
    //   <Input id="password" type="password" />
    // </FormGroup>
    // <div>
    //   <Button type="submit">{buttonText}</Button>
    // </div> */}
    // </form>
  );
}

export default LoginComponent;
