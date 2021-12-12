const mongoose = require('mongoose');

const UserScheme = mongoose.Schema({
    user_email: {
        type: String,
        unique: true,
        required: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', UserScheme);