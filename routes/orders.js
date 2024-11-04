var express = require('express');
var router = express.Router();


const Order = require('../models/orders');
const User = require('../models/users');

router.post('/', (req, res) => {
    const {token, polo, date, status, fees, total } = req.body;
    // Find the user by token
    User.findOne({ token: token })
    .then(user => { if (!user) {
               res.json({ result: false, error: 'User not found' });
                return; 
              }

    //Creation de la commande 
    const newOrder = new Order({
      User: user._id,
      Polo: polo,
      Date: date,
      Status: status,
      Fees: fees,
      Total: total,
    });
  
    newOrder.save()
      .then(data => {
        res.json({ result: true ,Order: data});
      })
      .catch(err => {
        res.json({ err: 'Failed to create order.' });
      });
  });
})

router.get('/', (req, res) => {
    Order.find().populate('User').populate('Polo')
    .then((data) => {
        if(data){
        return res.json({ result: true, orders: data  })}
        else{
            res.json({result : false, error: 'cannot find order'})
        }
    });
  });
 
  

// Route pour récupérer toutes les commandes d'un utilisateur spécifique via token

router.get('/token/:token', (req, res) => {
  const { token } = req.params;


  // Find the user by token
  User.findOne({ token: token })
    .then(user => {
      if (!user) {
        return res.json({ result: false, message: 'User not found.' });
      }
   // Find orders by user ID
  Order.find({ User: user._id })
  .populate('User') 
  .populate('Polo')
    .then(orders => {
      if (orders.length > 0) {
        return res.json({ result: true, orders });
      } else {
        res.json({ result: false, message: 'No orders found for this user.' });
      }
    })
    .catch(err => {
      return res.json({ error: 'Failed to retrieve orders.' });
    });
});

})
module.exports = router;


