const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users-model');

// create a user
router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(200)
                .json(saved)
        })
        .catch(err => {
            console.log('Error with register post', err)
            res.status(500)
                .json({ message: 'Error registering new user' })
        })
});

// login
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findById({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200)
                    .json({ message: `${user} has logged in` })
            } else {
                res.status(401)
                    .json({ message: 'YOU SHALL NOT PASS!!' })
            }
        })
        .catch(err => {
            console.log('Error with login POST', err)
            res.status(500)
                .json({ message: 'Error logging into account' })
        })
});

module.exports = router;