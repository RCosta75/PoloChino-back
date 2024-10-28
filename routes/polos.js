var express = require("express");
var router = express.Router();

const Polo = require("../models/polos");

// recuperer tout les POLOS
router.get('/get' , (req,res) => {
    Polo.find()
    .then((data) => {
        res.json({result : true, Polos : data})
    })
})



module.exports = router;