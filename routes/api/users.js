const router = require('express').Router();
const Joi = require('joi');
const User = require('../../models/User');

router.get('/user', (req, res) => {
    res.send({ response: 'You got to user'});
});

// POST to /api/users for sign up
router.post('/users', (req, res, next) => {
    const user = new User();
  
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.password = req.body.user.password;

    user.save().then(function() { 
        return res.json({user: user.toJSON()});
    })
    .catch(next);   
});

// POST /api/users/login for log in
router.post('/users/login', function(req, res) {
    // validate user object
    
    // authenticate user

    // return JWT + user 
    // or validation error
    res.send('You got to users/login');
});

// const schema = {
//     username: Joi.string(),
//     email: Joi.email(),
//     password: Joi.string()
// };

module.exports = router;
