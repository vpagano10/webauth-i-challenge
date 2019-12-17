const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

// POST     >>>     Test
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201)
                .json(saved)
        })
        .catch(err => {
            console.log('Error with register post', err)
            res.status(500)
                .json({ message: 'Error registering new user' })
        })
});

// POST     >>>     Test
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;

                res.status(200)
                    .json({ message: `${user} has logged in` })
            } else {
                res.status(401)
                    .json({ message: 'You shall not pass!!' })
            }
        })
        .catch(err => {
            console.log('Error with login POST', err)
            res.status(500)
                .json({ message: 'Error logging into account' })
        })
});

// GET     >>>     Test
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500)
                    .json({ message: 'Could not logout' })
            } else {
                res.status(200)
                    .json({ message: 'Successful logout' })
            }
        })
    } else {
        res.status(200)
            .end();
    }
});

module.exports = router;