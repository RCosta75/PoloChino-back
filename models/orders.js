const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
        User : { type: mongoose.Schema.Types.ObjectId, ref: "users"},
        Polo : [{ type: mongoose.Schema.Types.ObjectId, ref: "polos"}],
        Date : String,
        Status : String,
        Fees: Number,
        Total : Number,
    });
  

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;