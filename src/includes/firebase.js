import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export { auth, usersCollection, storage, songsCollection, commentsCollection };
