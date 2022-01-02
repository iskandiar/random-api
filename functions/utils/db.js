const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSG_SENDER_ID,
  appId: process.env.APP_ID
};

console.log('firebaseConfig', firebaseConfig)
console.log('process.env', process.env)

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const addRecord = (value) => new Promise((resolve, reject) => {
  db.collection("mapping").add({
    search: value,
  })
    .then((docRef) => {
      // console.log("Document written with ID: ", docRef.id);
      resolve(docRef.id);
    })
    .catch((error) => {
      // console.error("Error adding document: ", error);
      reject(error)
    });
})

module.exports = {
  addRecord
}
