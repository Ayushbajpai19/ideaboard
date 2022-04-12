// Import the functions you need from the SDKs you need
// import firebase from "firebase/compact/app";
import { initializeApp } from "firebaseapp";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe6HlxZ_7dHCKiboSxlTxb6BIa4P6MuC0",
  authDomain: "ideaboard-591b1.firebaseapp.com",
  projectId: "ideaboard-591b1",
  storageBucket: "ideaboard-591b1.appspot.com",
  messagingSenderId: "107760127590",
  appId: "1:107760127590:web:fc1fe43325d7a435cc67a7",
  measurementId: "G-GCNH8RLLW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = app.auth();