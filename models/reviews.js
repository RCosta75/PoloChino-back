const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    titre : String,
    message: String,
    note: Number,
   });
   
 const Review = mongoose.model('reviews', ReviewSchema);


module.exports = Review;