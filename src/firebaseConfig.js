import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCAZl1Igibdl_2wZenkHoK1wAk0uNpRTk0",
  authDomain: "blackjack-proj.firebaseapp.com",
  databaseURL:
    "https://blackjack-proj-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blackjack-proj",
  storageBucket: "blackjack-proj.appspot.com",
  messagingSenderId: "596930501686",
  appId: "1:596930501686:web:6c66d4ac5add9e9adf0c97",
  measurementId: "G-PQ2WRZGLPR",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
//export const firestore = firebase.firestore();
