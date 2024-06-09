const mongoose = require('mongoose');

// User table schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Table name will be "user"
const User = mongoose.model('user', UserSchema);

module.exports = User