import firebase from 'firebase/compat/app'
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAq11WYNwKN80gs7cj5qDwB-hQlm6iBKPo",
  authDomain: "socialbook-d490e.firebaseapp.com",
  projectId: "socialbook-d490e",
  storageBucket: "socialbook-d490e.appspot.com",
  messagingSenderId: "12684021317",
  appId: "1:12684021317:web:7b601a66da963d2ab61d2c",
  measurementId: "G-44JJSHGTFD"
};

// Initialize Firebase and Firestore
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore() 

export {firebase}