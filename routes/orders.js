const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
        User : { type: mongoose.Schema.Types.ObjectId, ref: "users"},
        Polo : [{ type: mongoose.Schema.Types.ObjectId, ref: "polos"}],
        Date : Date,
        Status : String,
        Fees: Number,
        Total : Number,
    });
  

const Order = mongoose.model('orders', UserSchema);

module.exports = Order;