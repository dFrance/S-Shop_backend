const mongoose = require('mongoose')

const Product = mongoose.Schema({
    name: { type: String, required: true, },
    description: { type: String, required: true},
    price: { type: Number, required: true},
    quantity: {type: Number, required: true}
}, {
    timestamps: true,
})

module.exports = mongoose.model('product', Product)