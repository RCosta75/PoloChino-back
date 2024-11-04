var express = require("express");
var router = express.Router();

const Polo = require("../models/polos");
const Review = require("../models/reviews")

// recuperer tout les POLOS
router.get('/get' , (req,res) => 
    {
    Polo.find()
    .populate('comments')
    .then((data) => {
        res.json({result : true, polos : data})
    })
})

module.exports = router;