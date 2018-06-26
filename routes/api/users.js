const router = require('express').Router();
const User = require('../../models/User');

router.get('/user', (req, res) => {
    res.send('You got to user');
});

// POST to /api/users for sign up
router.post('/users', (req, res, next) => {
    const user = new User();
  
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.password = req.body.user.password;

    user.save().then(() => { 
        return res.json({user: user.toJSON()});
    }).catch(next);   
});

// POST /api/users/login for log in
router.post('/users/login', function(req, res, next){
    // validate user object
    
    // authenticate user

    // return JWT + user 
    // or validation error
});

module.exports = router;
