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

// function LoginForm({ onSubmit, submitButton }) {
//   const { isLoading, isError, error, run } = useAsync();
//   function handleSubmit(event) {
//     event.preventDefault();
//     const { email, password } = event.target.elements;
//     console.log(email.value);
//     console.log("hi");
//     run(onSubmit(email.value, password.value));
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       css={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "stretch",
//         "> div": {
//           margin: "10px auto",
//           width: "100%",
//           maxWidth: "300px",
//         },
//       }}
//     >
//       <FormGroup>
//         <label htmlFor="email">Email</label>
//         <Input id="email" />
//       </FormGroup>
//       <FormGroup>
//         <label htmlFor="password">Password</label>
//         <Input id="password" type="password" />
//       </FormGroup>
//       <div>
//         {React.cloneElement(
//           submitButton,
//           { type: "submit" },
//           ...(Array.isArray(submitButton.props.children)
//             ? submitButton.props.children
//             : [submitButton.props.children]),
//           isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null
//         )}
//       </div>
//       {isError ? "error" : null}
//     </form>
//   );
// }

function UnauthenticatedApp() {
  console.log("unauthenticated app");
  return (
    <>
      <Navbar />

      <Switch>
        <Route exact path="/">
          <MainSection />
        </Route>
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
    </>
    // <>
    //   <Navbar />
    //   <div
    //     css={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       width: "100%",
    //       height: "100vh",
    //     }}
    //   >
    //     <Logo width="80" height="80" />
    //     <h1>Bookshelf</h1>
    //     <div
    //       css={{
    //         display: "grid",
    //         gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    //         gridGap: "0.75rem",
    //       }}
    //     >
    //       <Modal>
    //         <ModalOpenButton>
    //           <Button variant="primary">Login</Button>
    //         </ModalOpenButton>
    //         <ModalContents aria-label="Login form" title="Login">
    //           <LoginForm
    //             onSubmit={login}
    //             submitButton={<Button variant="primary">Login</Button>}
    //           />
    //         </ModalContents>
    //       </Modal>
    //       <Modal>
    //         <ModalOpenButton>
    //           <Button variant="secondary">Register</Button>
    //         </ModalOpenButton>
    //         <ModalContents aria-label="Registration form" title="Register">
    //           <LoginForm
    //             onSubmit={signup}
    //             submitButton={<Button variant="secondary">Register</Button>}
    //           />
    //         </ModalContents>
    //       </Modal>
    //     </div>
    //   </div>
    // </>
  );
}

export { UnauthenticatedApp };
