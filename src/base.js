import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyD4ifzhQ8vrf4WQETV-GrwYmHu7N40t9mU",
  authDomain: "catch-of-the-day-rh-a0068.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-rh-a0068.firebaseio.com",
  projectId: "catch-of-the-day-rh-a0068",
  storageBucket: "catch-of-the-day-rh-a0068.appspot.com",
  messagingSenderId: "557795419624"
});

const base = Rebase.createClass(app.database());

export default base;