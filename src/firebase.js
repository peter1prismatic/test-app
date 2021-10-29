import firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import "firebase/auth";

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
