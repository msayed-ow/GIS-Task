const admin = require('firebase-admin');

var serviceAccount = require('../firebase/firebase-config.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//create firebase object

const db = admin.firestore();

module.exports = db;