var express = require('express');
var router = express.Router();


const Order = require('../models/orders');

router.post('/', (req, res) => {
    const { user, polo, date, status, fees, total } = req.body;

    
    const newOrder = new Order({
      User: user,
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
 

  

// Route pour récupérer toutes les commandes d'un utilisateur spécifique

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  Order.find({ User: userId }).populate('User').populate('Polo')
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


module.exports = router;



