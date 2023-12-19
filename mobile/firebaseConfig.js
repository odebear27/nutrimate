// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXq8QY58AqBQitgyRjxcdb2DVZ2Njp9O8",
  authDomain: "nutrimate-2023.firebaseapp.com",
  projectId: "nutrimate-2023",
  storageBucket: "nutrimate-2023.appspot.com",
  messagingSenderId: "11710214550",
  appId: "1:11710214550:web:f177cacce91f50276fedb7",
  measurementId: "G-HNXNHSLZXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// if (!firebase.apps.length) {
//   const app = firebase.initializeApp(firebaseConfig);
// }

// export { firebase };
export default app;