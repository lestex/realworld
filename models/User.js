const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"]
    },
    password: {
        type: String,        
        required: [true, "can't be blank"]
    },
    image: String,
    email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"]
    },
    bio: String
}, {timestamps: true});

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, config.secret);
};

UserSchema.methods.toJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    };
};

const User = mongoose.model('User', UserSchema);

/**
 * Validates User object.
 */
function validateUser(user) {
    const schema = {
      username: Joi.string()
               .min(5)
               .max(50)
               .required(),
      email: Joi.string()
                .min(5)
                .max(255)
                .required()
                .email(),
      password: Joi.string()
                   .min(5)
                   .max(255)
                   .required()
    };
  
    return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;
