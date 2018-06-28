const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [
            true,
            'can\'t be blank'
        ]
    },
    password: {
        type: String,        
        required: [
            true,
            'can\'t be blank'
        ]
    },
    image: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [
            true,
            'can\'t be blank'
        ]
    },
    bio: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'already taken.'});

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000, 10)
    }, config.secret);
};

UserSchema.methods.toJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),        
        bio: this.bio,
        image: this.image
    };
};

const User = mongoose.model('User', UserSchema);

exports.User = User; 
