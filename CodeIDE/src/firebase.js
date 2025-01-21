// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw-gcVh0rejXIyslGcYBOMIZR62oTjp_c",
  authDomain: "wocide-8eea5.firebaseapp.com",
  projectId: "wocide-8eea5",
  storageBucket: "wocide-8eea5.firebasestorage.app",
  messagingSenderId: "553499416630",
  appId: "1:553499416630:web:1e84ea33bcd305cec36097",
  measurementId: "G-P2S9F9WCTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
const analytics = getAnalytics(app);
export default app;