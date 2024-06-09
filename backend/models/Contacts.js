const mongoose = require('mongoose');

// User table schema
const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phnumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

// Table name will be "user"
const Contacts = mongoose.model('contacts', ContactSchema);

module.exports = Contacts