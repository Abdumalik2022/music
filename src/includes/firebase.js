import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj4lv0P1W-KFbxzn4dtMQ1-qF5q9u6o7I",
  authDomain: "music-61fcc.firebaseapp.com",
  projectId: "music-61fcc",
  storageBucket: "music-61fcc.appspot.com",
  messagingSenderId: "576225849134",
  appId: "1:576225849134:web:46239e5902ea4da7d8d4bf",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection("users");

export { auth, usersCollection };