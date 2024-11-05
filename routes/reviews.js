var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Review = require("../models/reviews");
const Polo = require("../models/polos");


    router.get('/get' , (req,res) => {
        Review.find()
        .populate('user')
        .then((data) => {
            res.json({result : true, data})
        })
    })

    



module.exports = router;