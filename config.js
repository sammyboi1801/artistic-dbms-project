
const firebaseConfig = {
    apiKey: "AIzaSyAJ8eKQC9WhdtD7zmog9PuCFgG6GNxAxI4",
    authDomain: "artistic-b3097.firebaseapp.com",
    projectId: "artistic-b3097",
    storageBucket: "artistic-b3097.appspot.com",
    messagingSenderId: "43471530908",
    appId: "1:43471530908:web:37050a723af59fd93cf659",
    measurementId: "G-PDHDKLL0QE"
};
firebase.initializeApp(firebaseConfig);

const auth=firebase.auth();
const db=firebase.firestore();
var storage = firebase.storage();
