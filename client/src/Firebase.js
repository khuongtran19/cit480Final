import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0sErWy5tTgIXSNzbu3xhzGXRTYkmZF44",
    authDomain: "csuncit480.firebaseapp.com",
    databaseURL: "https://csuncit480-default-rtdb.firebaseio.com",
    projectId: "csuncit480",
    storageBucket: "csuncit480.appspot.com",
    messagingSenderId: "922329528523",
    appId: "1:922329528523:web:a73591da301460d57c434e",
    measurementId: "G-J5C8ZM7694"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;