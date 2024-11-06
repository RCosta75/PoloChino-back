var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Review = require("../models/reviews");
const Polo = require("../models/polos");

router.get("/get", (req, res) => {
  Review.find()
    .populate("user")
    .sort({ _id: -1 })
    .then((data) => {
      res.json({ result: true, data });
    });
});

router.post("/post/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((data) => {
    const newReview = new Review({
      user: data,
      titre: req.body.titre,
      message: req.body.message,
      note: req.body.note,
    });
    newReview.save().then((data) => {
      Polo.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { comments: data } }
      ).then(() =>
        res.json({ result: true, infos: "Review have been ", newReview: data })
      );
    });
  });
});

module.exports = router;
