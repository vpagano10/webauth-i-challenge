
const router = require('express').Router();

const Users = require('./users-model');

// get users
router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200)
                .json(users)
        })
        .catch(err => {
            console.log('Error getting users /GET', err)
            res.status(500)
                .json({ message: 'Error finding users' })
        })
});

module.exports = router;