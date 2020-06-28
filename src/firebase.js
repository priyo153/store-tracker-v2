import * as firebase from "firebase";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAhrzTjO7TE4TWm42ksrGE5aZRgY8KwmOk",
  authDomain: "store-tracker-v2.firebaseapp.com",
  databaseURL: "https://store-tracker-v2.firebaseio.com",
  projectId: "store-tracker-v2",
  storageBucket: "store-tracker-v2.appspot.com",
  messagingSenderId: "303059296049",
  appId: "1:303059296049:web:f06f03df92ccf8fe5eda10",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const storesRef = databaseRef.child("stores");
export const ordersRef = databaseRef.child("orders");
