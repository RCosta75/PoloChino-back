var express = require("express");
var router = express.Router();

require("../models/connection");
const User = require("../models/users");
const Review = require("../models/reviews");
const Polo = require("../models/polos");


    router.get('/get' , (req,res) => {
        Review.find().then((data) => {
            res.json({result : true, data})
        })
    })
    
    router.post('/post' , (req,res) => {
        Review.find()
        .then((data) => {
            for(let id of data){
                Polo.updateMany({}, {$push : {comments : id._id}})
                .then()
            }
            res.json({result : true})
        })
    })


    router.put('/reviews/:id', async (req, res) => {
        try {
          const reviewId = req.params.id;
      
          // Mettre à jour la review avec la nouvelle propriété `content`
          const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { content: "J’adore ce polo ! Il va avec tout, ne se déforme pas au lavage et reste super confortable. C’est devenu un essentiel dans ma garde-robe." },
            { new: true } // retourne le document mis à jour
          );
      
          if (!updatedReview) {
            return res.status(404).json({ message: "Review non trouvée" });
          }
      
          res.status(200).json({ message: "Propriété content ajoutée avec succès", review: updatedReview });
        } catch (error) {
          res.status(500).json({ message: "Erreur lors de la mise à jour de la review", error });
        }
      });


module.exports = router;