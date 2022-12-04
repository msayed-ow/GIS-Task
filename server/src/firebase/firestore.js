const admin = require('firebase-admin');

var serviceAccount = require('../../admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//create firebase object

const db = admin.firestore();

module.exports = db;