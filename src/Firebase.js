import firebase from 'firebase'
import "firebase/storage"


const config = {
    apiKey: "AIzaSyDGlsVDlfeFINmGMH6NZ7K0HU8GIb7T7GY",
    authDomain: "baexam-ef57c.firebaseapp.com",
    databaseURL: "https://baexam-ef57c.firebaseio.com",
    projectId: "baexam-ef57c",
    storageBucket: "baexam-ef57c.appspot.com",
    messagingSenderId: "695297053014",
    appId: "1:695297053014:web:995578f44aca8e619146f7"
}

firebase.initializeApp(config);


export default firebase;