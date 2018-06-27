const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    password: String,
    username: String,    
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
