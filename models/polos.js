const mongoose = require('mongoose');

const PoloSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    matiere : String,
    image : String,
    marque : String,
    coupe : String,
    product : String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews"}],
});

const Polo= mongoose.model('polos', PoloSchema);

module.exports = Polo;