const router = require('express').Router();

router.get('/user', (req, res) => {
    res.send('You got to user');
});

router.get('/userID', (req, res) => {
    res.send('You got to userID');
});

module.exports = router;
