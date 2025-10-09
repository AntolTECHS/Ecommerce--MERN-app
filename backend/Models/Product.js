const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    stock: Number,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);