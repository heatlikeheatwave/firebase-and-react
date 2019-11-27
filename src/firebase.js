import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAzFFgbFEn8dTrbtlHcCj7jjPt8tquHHxw",
  authDomain: "bookshelf-28621.firebaseapp.com",
  databaseURL: "https://bookshelf-28621.firebaseio.com",
  projectId: "bookshelf-28621",
  storageBucket: "bookshelf-28621.appspot.com",
  messagingSenderId: "847233208226",
  appId: "1:847233208226:web:5f755bb97658df3e3becfb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;