const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('You got to profile');
});

router.get('/me', (req, res) => {
    res.send('You got to profile me');
});

module.exports = router;
