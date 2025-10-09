const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');


router.get('/', async (req, res)=>{
    try {
        const products = await Product.find();
        res.json(products)
    } catch (error) {
        res.json({ message: "Ooops no products found"});
    }
});

router.post('/', async (req, res)=> {
    const { name, description, image, price, stock } = req.body;
    const product = new Product({ name, description, image, price, stock });
    await product.save();
    res.json(product);
});


module.exports = router;