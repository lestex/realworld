const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    password: String,
    name: String,    
    image: String,
    email: String,
    bio: String
}, {timestamps: true});

UserSchema.methods.toJSON = function() {
    return {
        username: this.username,
        email: this.email
    };
};

const User = mongoose.model('User', UserSchema);

module.exports = User;