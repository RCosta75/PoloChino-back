var express = require("express");
var router = express.Router();

const User = require("../models/users");

// Affiche les like d'un User
router.get("/display/:token", (req, res) => {
  User.findOne({ token: req.params.token })
    .populate("likes")
    .then((data) => {
      res.json({ result: true, likes : data.likes });
    });
});

// route pour ajouter ou retirer l'id POLO dans User.likes
router.post("/update", (req, res) => {
    // cherche User selon son token
  User.findOne({ token: req.body.token }).then((data) => {
    if (!data) {
      res.json({ result: false, info: "User not found" });
    } else {
      if (data.likes.includes(req.body.id)) {
        // Si User.[likes] contient Polo._id le retire 
        User.updateOne(
          { token: data.token },
          { $pull: { likes: req.body.id } }
        ).then(() => {
          res.json({ result: true, info: "like supp" });
        });
      } else {
        // si User.[likes] ne contient pas Polo._id l'ajoute
        User.updateOne(
          { token: data.token },
          { $push: { likes: req.body.id } }
        ).then(() => {
          res.json({ result: true, info: "like add" });
        });
      }
    }
  });
});

    // Retire Polo._id de User.[likes]
router.delete("/delete" , (req,res) => {
    User.updateOne(
        {token : req.body.token},
        {$pull : {likes : req.body.id}})
    .then(() => {
        res.json({result : true, info : 'like supp'})
    })
})

module.exports = router;
