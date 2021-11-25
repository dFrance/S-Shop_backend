const mongoose = require('mongoose')

const User = mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true},
    password: { type: String, required: true},
}, {
    timestamps: true,
})

module.exports = mongoose.model('user', User)