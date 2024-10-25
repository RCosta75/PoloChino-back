const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    likes: { type: mongoose.Schema.Types.ObjectId, ref: polos},
    address: {
     street: String,
     city: String,
     zipcode: String,
   },
  });
  

const User = mongoose.model('polos', UserSchema);

module.exports = User;