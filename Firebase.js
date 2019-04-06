import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const config ={
  apiKey: "AIzaSyChAdUn39ZgTcMbjq55dJSZSutWS2gXfa0",
  authDomain: "djamware-1e31e.firebaseapp.com",
  databaseURL: "https://djamware-1e31e.firebaseio.com",
  projectId: "djamware-1e31e",
  storageBucket: "djamware-1e31e.appspot.com",
  messagingSenderId: "868885446498"
};
const originalSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
  if (body === '') {
    originalSend.call(this);
  } else {
    originalSend.call(this, body);
  }
};
firebase.initializeApp(config);


export default firebase;
