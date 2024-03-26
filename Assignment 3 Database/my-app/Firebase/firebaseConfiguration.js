import firebase from 'firebase/app';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAU5T5aN24Qx-jXS03dpWWZqJRUyJf7jjM",
    authDomain: "cse4500-assignment3.firebaseapp.com",
    projectId: "cse4500-assignment3",
    storageBucket: "cse4500-assignment3.appspot.com",
    messagingSenderId: "959098254154",
    appId: "1:959098254154:web:277735d4fbcd7f1aa147b3",
    measurementId: "G-J5TKFG54WW"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);

  export const firestoreDb = firebase.sirestore();