import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAx3fxYEaTLqffeRRmSqGL37nART-39fjM",
  authDomain: "nextfire-e376a.firebaseapp.com",
  projectId: "nextfire-e376a",
  storageBucket: "nextfire-e376a.appspot.com",
  messagingSenderId: "337047635108",
  appId: "1:337047635108:web:57d9d0d5364e56a7ad1231",
  measurementId: "G-BCRXW9FDEW",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
