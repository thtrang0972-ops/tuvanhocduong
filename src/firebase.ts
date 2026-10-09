// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6E_640cybzMfyVtkZJMth-QmAYqU91_E",
  authDomain: "nhabep-cd518.firebaseapp.com",
  databaseURL: "https://nhabep-cd518-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nhabep-cd518",
  storageBucket: "nhabep-cd518.firebasestorage.app",
  messagingSenderId: "266586165160",
  appId: "1:266586165160:web:02c4117fb26bb2b09d979d",
  measurementId: "G-9673GTZPCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
