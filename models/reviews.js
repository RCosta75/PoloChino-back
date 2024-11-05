const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user:  String,
    titre : String,
    message: String,
    note: Number,
   });
   
 const Review = mongoose.model('reviews', ReviewSchema);


module.exports = Review;