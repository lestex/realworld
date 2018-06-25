const mongoose = require('mongoose');
const {Schema} = mongoose.Schema;

const UserSchema = new Schema({
    password: String,
    name: String,    
    email: String
});

module.exports = UserSchema;