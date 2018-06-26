const User = require('../../models/User');

const validUser = new User({
    password: "1234567",
    name: "user1",    
    image: "http://some.url/image.jpg",
    email: "email@mail.com",
    bio: "The bio"
});

module.exports = validUser;
