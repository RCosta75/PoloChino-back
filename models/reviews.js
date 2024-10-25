const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
   });
   
 const Review= mongoose.model('reviews', ReviewSchema);


module.exports = Review;