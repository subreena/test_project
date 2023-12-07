import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBUR1d8TQ270DwMtUMnbixGQWtirOTxsd8",
    authDomain: "teacher-copilots.firebaseapp.com",
    projectId: "teacher-copilots",
    storageBucket: "teacher-copilots.appspot.com",
    messagingSenderId: "564128887913",
    appId: "1:564128887913:web:9a513cfc425643f283def8",
    measurementId: "G-YE9WY49WRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;