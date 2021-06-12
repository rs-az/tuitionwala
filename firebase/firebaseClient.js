// const firebase = require('firebase');
import firebase from 'firebase';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDkSz73aOjBzJV23Ke3Hd_PMUL5aSK1c54',
  authDomain: 'tuitionwala-d500d.firebaseapp.com',
  projectId: 'tuitionwala-d500d',
  storageBucket: 'tuitionwala-d500d.appspot.com',
  messagingSenderId: '181053698175',
  appId: '1:181053698175:web:fa85264d10fdec7ebb4f4a',
};

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
