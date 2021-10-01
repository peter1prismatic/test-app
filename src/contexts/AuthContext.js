import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    console.log("login attempt");
    return auth.signInWithEmailAndPassword(email, password);
    // .then((data) => {
    //   data.user.getIdToken().then(function (idToken) {
    //     console.log("23");
    //     setToken(idToken);
    //     console.log("25");
    //   });
    // });
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("User:");
      console.log(user);
      setCurrentUser(user);

      if (user) {
        // console.log(user);
        // console.log(user.getIdToken());
        user.getIdToken().then(function (idToken) {
          console.log("token:");
          console.log(idToken);
          setToken(idToken);
        });

        // console.log(token);
      } else {
        setToken(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  const value = {
    currentUser,
    token,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
