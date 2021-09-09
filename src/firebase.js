import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyD0WJedZI-bu38eA72PYC7Ob0ZerbCufqE",
  authDomain: "learning-bunny-c772e.firebaseapp.com",
  projectId: "learning-bunny-c772e",
  storageBucket: "learning-bunny-c772e.appspot.com",
  messagingSenderId: "728755467034",
  appId: "1:728755467034:web:6a8b96621e92bf2e41f2a3",
  measurementId: "G-XRD421ZKP1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export const firebaseFirestore = firebase.firestore();
export const firebaseStorage = firebase.storage();
export const firebaseAuth = firebase.auth();
