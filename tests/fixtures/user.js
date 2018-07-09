const {User} = require('../../models/User');

const validUser = { user: {
    username: "user1",    
    email: "email@mail.com",
    password: "1234567"
}};

const UserNoUsername = { user: {
    username: "",
    email: "email@mail.com",
    password: "12345678"
}};

const UserNoEmail = { user: {
    username: "testUser",
    email: "",
    password: "12345678"
}};

const UserNoPassword = { user: {
    username: "user1",    
    email: "email@mail.com",
    password: ""
}};

const validMongoUser = new User({
    username: "testUser",
    email: "email@mail.com",
    password: "123456"
});

module.exports = {
    validUser,
    UserNoUsername,
    UserNoEmail,
    UserNoPassword,
    validMongoUser
};
