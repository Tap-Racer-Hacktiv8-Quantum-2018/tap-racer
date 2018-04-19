import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBh-xGVWgVVULGN_L2LNF0KSDOPqGztx8I",
  authDomain: "tap-racer.firebaseapp.com",
  databaseURL: "https://tap-racer.firebaseio.com",
  projectId: "tap-racer",
  storageBucket: "tap-racer.appspot.com",
  messagingSenderId: "204725348244"
};

firebase.initializeApp(config);

export const db = firebase.database();