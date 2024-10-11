// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth,GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDggs0l4b3jNXjZbOihxPJbKqAfLA_QDTY",
  authDomain: "langsworld-ec066.firebaseapp.com",
  projectId: "langsworld-ec066",
  storageBucket: "langsworld-ec066.appspot.com",
  messagingSenderId: "961642554217",
  appId: "1:961642554217:web:f975e6e73707d36884d3f8",
  measurementId: "G-X1G4RJ27K7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export {auth,provider, signInWithPopup};