const router = require('express').Router();

router.get('/user', (req, res) => {
    res.send('You got to user');
});

module.exports = router;
