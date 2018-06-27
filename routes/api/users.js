const router = require('express').Router();
const {User} = require('../../models/User');

router.post('/users', (req, res, next) => {
    const user = new User();
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.password = req.body.user.password;

    user.save().then(function() { 
        return res.json({user: user.toJSON()});
    })
    .catch((err) => next(err));
});

// POST /api/users/login for log in
router.post('/users/login', function(req, res) {
    // validate user object
    
    // authenticate user

    // return JWT + user 
    // or validation error
    res.send('You got to users/login');
});

module.exports = router;
