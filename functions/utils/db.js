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

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const COLLECTION_NAME = "mapping"

const addRecord = (value) => new Promise((resolve, reject) => {
  db.collection(COLLECTION_NAME).add({
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

const getRecord = (id) => new Promise((resolve, reject) => {
  var docRef = db.collection(COLLECTION_NAME).doc(id);

  docRef.get().then((doc) => {
    if (doc.exists) {
      resolve(doc.data())
    } else {
      reject("No such document!");
    }
  }).catch((error) => {
    reject("Error getting document:", error);
  });

})

module.exports = {
  addRecord,
  getRecord
}
