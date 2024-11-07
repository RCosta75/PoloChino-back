var express = require("express");
var router = express.Router();
var { ObjectId } = require("mongoose").Types;
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

router.get("/getOne/:id", (req, res) => {
  Polo.aggregate([
    {
      $match: {
        _id: new ObjectId(req.params.id),
      },
    },
    {
      $unwind: {
        path: "$comments",
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "comments",
        foreignField: "_id",
        as: "comments",
      },
    },
    {
      $addFields: {
        comments: {
          $first: "$comments",
        },
      },
    },
    {
      $sort: {
        "comments._id": -1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "comments.user",
        foreignField: "_id",
        as: "comments.user",
      },
    },
    {
      $addFields: {
        "comments.user": {
          $first: "$comments.user.username",
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        name: {
          $first: "$name",
        },
        price: {
          $first: "$price",
        },
        description: {
          $first: "$description",
        },
        matiere: {
          $first: "$matiere",
        },
        image: {
          $first: "$image",
        },
        marque: {
          $first: "$marque",
        },
        coupe: {
          $first: "$coupe",
        },
        product: {
          $first: "$product",
        },
        comments: {
          $push: "$comments",
        },
      },
    },
  ]).then((data) => {
    res.json({
      result: true,
      polos: data[0],
    });
  });
});

module.exports = router;
