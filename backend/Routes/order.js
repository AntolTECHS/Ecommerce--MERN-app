const express = require('express');
const router = express.Router();
const Order = require('../Models/Order');

router.post('/', async (req, res)=>{
    const { user, items, total } = req.body;
    const order = new Order({ user, items, total });
    await order.save();
    res.json(order);
});

router.get('/:userId', async (req, res)=>{
    const orders = await Order.find({ user: req.params.id }).populate('items.product');
    res.json(orders);
});

module.exports = router;