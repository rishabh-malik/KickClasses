var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyAbEvVDqojZxxiHY7tijKhj__ml5a7mdEk",
    authDomain: "hack-d622e.firebaseapp.com",
    databaseURL: "https://hack-d622e.firebaseio.com",
    projectId: "hack-d622e",
    storageBucket: "",
    messagingSenderId: "834161010109"
};
firebase.initializeApp(config);
 export const dbref =  firebase.database()