const firebase = require('firebase/compat/app');
const auth = require('firebase/compat/auth');
const express = require('express');
const validateEmail = require('../middleware/validateEmail');
const firebaseConfig = require("../firebase/firebase-config.json")


const router = express.Router();

router.post('/login', validateEmail(), async (req, res) => {
    try {
        loginWithEmail(req.body.email, req.body.password, res)
    } catch (error) {
        console.log("error ", error.message);
        res.status(400).send({
            result: null,
            error: error.message
        });
    }
});

function loginWithEmail(email, password, res) {
    if (email !== "" && password !== "") {
        console.log("email server  ", email);
        firebase.initializeApp(firebaseConfig)
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                res.status(200).send({
                    result: user,
                    error: null
                });
            })
            .catch((error) => {
                res.status(401).send({
                    result: null,
                    error: "invalid credintional"
                });
            });
    }
};


module.exports = router
