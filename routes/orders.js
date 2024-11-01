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
        res.json({Order: data});
      })
      .catch(err => {
        res.json({ error: 'Failed to create order.' });
      });
  });
  
router.get('/', (req, res) => {
    Order.find().populate('users','polos')
    .then((data) => {
        if(data){
        return res.json({ result: true, orders: data  })}
        else{
            res.json({result : false})
        }
    });
  });








module.exports = router;



