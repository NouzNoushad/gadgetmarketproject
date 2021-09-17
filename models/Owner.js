const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({

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
    },
    profession: {
        type: String
    },
    company: {
        type: String
    },
    details: {
        type: String,
    
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('webOwnership', ownerSchema);