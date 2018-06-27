const {User} = require('../../models/User');

const validUser = new User({
    password: "1234567",
    username: "user1",    
    email: "email@mail.com"
});

User.User

const invalidUser = new User({
    password: "",
    username: "",    
    email: "email@mail.com"    
});

exports.validUser = validUser;
exports.invalidUser = invalidUser;
