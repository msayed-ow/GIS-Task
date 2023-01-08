const express = require('express');
const axios = require("axios");

const usersSchema = require('../schemas/user/schema');
const validate = require('../middleware/validate');
const db = require('../firebase/firestore');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const usersRef = db.collection("users")
        const usersArray = [];

        let snapshot = await usersRef.get();

        snapshot.forEach(element => {
            usersArray.push(element.data())
        });

        res.status(200).send({
            result: usersArray,
            error: null
        })
    } catch (error) {
        res.status(400).send({
            result: null,
            error: error.message
        })
    }

});

router.post('/add', validate(usersSchema), (req, res, next) => {
    try {

        const userRef = db.collection("users").doc(req.body.id.toString())
        userRef.create(req.body).catch(error => {
            res.status(400).send({
                result: null,
                error: error.message
            });
        });
        const response = userRef.get().then(docSnapshot => {
            res.status(200).send({
                result: req.body,
                error: null
            })
        });
    } catch (error) {
        res.statusCode=400;
        return next(new Error(error.message))
    }
});

//reset users
router.put('/reset', (req, res) => {

    try {

        axios.get('https://jsonplaceholder.typicode.com/users')

            .then(users => {

                const batch = db.batch();

                users.data.forEach(user => {
                    const usersRef = db.collection('users').doc(user.id.toString());
                    batch.set(usersRef, user);
                });

                batch.commit().catch(error => {
                    res.status(400).send({
                        result: false,
                        error: error.message
                    })
                });

                res.status(200).send({
                    result: "data saved successfully",
                    error: null
                })

            });

    } catch (error) {
        res.status(400).send({
            result: false,
            error: error.message
        })

    };
})

//remove user from firebase 
router.delete('/:id', (req, res) => {
    try {

        if (isNaN(req.params.id)) {
            res.status(400).send({
                result: false,
                error: 'Missing Params: ID'
            })
            return;
        }

        const userRef = db.collection("users").doc(req.params.id)
        const response = userRef.get().then(docSnapshot => {
            if (docSnapshot.exists) {
                userRef.delete()
                res.status(200).send({
                    result: "user delete succssfully",
                    error: null
                })
            } else {
                res.status(400).send({
                    result: false,
                    error: "user not found"
                })
            }
        });

    } catch (error) {
        res.status(400).send({
            result: false,
            error: error.message
        })
    };
});

//update user 
router.put('/update', validate(usersSchema), (req, res) => {
    try {
        const userRef = db.collection("users").doc(req.body.id.toString())

        const response = userRef.get().then(docSnapshot => {
            if (docSnapshot.exists) {
                userRef.update(req.body).then(object => {
                    res.status(200).send({
                        result: req.body,
                        error: null
                    })
                });

            } else {
                res.status(400).send({
                    result: false,
                    error: "user not found"
                })
            }

        });
    } catch (error) {
        res.status(400).send({
            result: false,
            error: error.message
        })
    }
});

module.exports = router;