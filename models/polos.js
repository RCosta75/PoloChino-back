const mongoose = require('mongoose');

const PoloSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    comments: { text: { type: mongoose.Schema.Types.ObjectId, ref: review}, 
}});

const Polo= mongoose.model('polos', PoloSchema);

module.exports = Polo;