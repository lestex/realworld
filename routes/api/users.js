const router = require('express').Router();
const User = require('../../models/User');

router.get('/user', (req, res) => {
    res.send('You got to user');
});

// POST to /api/users
router.post('/users', async (req, res, next) => {
    const user = new User();
  
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.password = req.body.user.password;

    try {
        const result = await user.save();

        return res.json({user: result.toJSON()});        
    } catch (error) {
        return next();
    }
});

module.exports = router;
