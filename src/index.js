import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAP8J-cqMBK8ZCxsw8Xqe4rIyKbTSF41xg",
    authDomain: "farm-economy.firebaseapp.com",
    databaseURL: "https://farm-economy.firebaseio.com",
    projectId: "farm-economy",
    storageBucket: "farm-economy.appspot.com",
    messagingSenderId: "79374372851",
    appId: "1:79374372851:web:fb67af39a9170779d0cc86"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
