const router = require('express').Router();
const {User} = require('../../models/User');

// POST to /api/users/ for sign up
router.post('/users', async (req, res, next) => {
    const user = new User({
        username: req.body.user.username,
        email: req.body.user.email,
        password: req.body.user.password
    });

    user.save().then(function() { 
        return res.json({user: user.toJSON()});
    })
    .catch((err) => next(err));
});

// POST /api/users/login for log in
router.post('/users/login', function(req, res) {
    if(!req.body.user.email){
        return res.status(422).json({errors: {email: "can't be blank"}});
    }
    
    if(!req.body.user.password){
        return res.status(422).json({errors: {password: "can't be blank"}});
    }
    
    // authenticate user

    // return JWT + user 
    // or validation error
    return res.status(200).send('OK')
    
});

module.exports = router;
