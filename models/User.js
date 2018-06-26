const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    password: String,
    name: String,    
    email: String
}, {timestamps: true});

UserSchema.methods.toJSON = function() {
    return {
        username: this.username,
        email: this.email
    };
};

const User = mongoose.model('User', UserSchema);

module.exports = User;