import * as firebase from "../firebaseConfig";

export const signIn = (email, password) => {
  return firebase.auth.signInWithEmailAndPassword(email, password);
};

export const signInWithGoogle = () => {
  return firebase.auth.signInWithPopup(firebase.googleProvider);
};
