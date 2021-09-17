const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
    },
    message: {
        type: String,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('userRating', ratingSchema);

