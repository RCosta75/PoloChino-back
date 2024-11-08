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

router.post("/post/:token", async (req, res) => {
  const user = await User.findOne({ token: req.params.token }).lean();

  const newReview = new Review({
    user: user ? user._id : null,
    titre: req.body.titre,
    message: req.body.message,
    note: req.body.note,
  });

  await newReview.save();

  await Polo.findByIdAndUpdate(String(req.body.id), {
    $push: { comments: newReview._id },
  });

  res.json({
    result: true,
    infos: "Review have been ",
    newReview: {
      titre: req.body.titre,
      message: req.body.message,
      note: req.body.note,
      user: user.username,
    },
  });
});

module.exports = router;
