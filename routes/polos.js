var express = require("express");
var router = express.Router();

const Polo = require("../models/polos");
const Review = require("../models/reviews");
const User = require("../models/users");

// recuperer tout les POLOS
router.get("/get", (req, res) => {
  Polo.find()
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((data) => {
      res.json({ result: true, polos: data });
    });
});

module.exports = router;
