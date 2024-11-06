var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkbody');
const bcrypt = require('bcrypt');
const uid2 = require('uid2');

router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['username', 'email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: uid2(32),
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  }).catch(error => {
    res.json({ result: false, error: 'Database error', details: error });
  });
});

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } }).then(data => {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token, username: data.username, email: data.email});
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});


router.get('/get/:token' , (req,res) => {
  User.findOne({token : req.params.token})
  .then((data) => {
    res.json({result : true , likes : data?.likes})
  })
})



router.put('/update', (req, res) => {
   if (!checkBody(req.body, ['token', 'username', 'email'])) {
     res.json({ result: false, error: 'Missing or empty fields' }); 
     return; 
    }

    User.findOne({ token: req.body.token })
     .then(user => {
       if (!user) {
         res.json({ result: false, error: 'User not found' });
          return; 
        }
       
        // veriefie que oldPassword chaîne vide (après avoir supprimé les espaces autour).
        //Compare l'ancien mot de passe fourni (req.body.oldPassword)
        // avec le mot de passe stocké de l'utilisateur (user.password).
        if (req.body.oldPassword && req.body.oldPassword.trim() !== "") {
          if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
            //Si on se trompe d'ancien mot de passe
          res.json({ result: false, error: 'Old password is incorrect' });
          return;} 
        } else if (req.body.password && req.body.password.trim() !== "") {
            // Si un nouveau mot de passe est fourni sans ancien mot de passe, renvoyer une erreur 
            res.json({ result: false, error: 'Old password is required to set a new password' });
            return; 
          }

        // Créer un objet avec les données à mettre à jour
        let updateData = { 
        username: req.body.username,
        email: req.body.email
        };

        // Hacher le nouveau mot de passe si présent  
        if (req.body.password && req.body.password.trim() !== "") {
            updateData.password = bcrypt.hashSync(req.body.password, 10);
            //on ajoute le password a updateData
            }

      User.findOneAndUpdate( 
        { token: req.body.token },
        updateData,
        { new: true } )
        .then((updatedUser) => {
            if (updatedUser) {
              res.json({
                result: true, 
                username: updatedUser.username,
                email: updatedUser.email
                }); 
            } else {
                res.json({ result: false, error: 'User not found' }); 
              } 
            })
            // ce catch est attaché à la promesse retournée par User.findOne.
            .catch((error) => {
                res.json({ result: false, error: 'Database error', details: error });
            });
          })// ce catch attaché à la promesse retournée par User.findOneAndUpdate.
          .catch((error) => {
              res.json({ result: false, error: 'Database error', details: error }); 
        });
    })

module.exports = router;
