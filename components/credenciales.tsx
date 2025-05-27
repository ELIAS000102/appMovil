// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2JNCl1BkjpC3tG0aeCGS5F8vgrouhXHM",
  authDomain: "ecomercelogin-91b2e.firebaseapp.com",
  projectId: "ecomercelogin-91b2e",
  storageBucket: "ecomercelogin-91b2e.firebasestorage.app",
  messagingSenderId: "280192194717",
  appId: "1:280192194717:web:56ed34b465048e1788dc74"
};

// Initialize Firebase
const appFireBase = initializeApp(firebaseConfig);
export default appFireBase;