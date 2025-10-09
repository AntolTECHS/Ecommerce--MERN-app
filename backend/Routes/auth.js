const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../Models/User');

router.post('/register', async (req, res)=>{
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "User exists!"});
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "Registerd Successfully"});
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
});

router.post('/login', async (req, res)=>{
    const { email, password } = req.body;
    try {
        const regUser = await User.findOne({ email });
        if (!regUser || !(await regUser.comparedPassword(password)))
            return res.status(400).json({ message: "invalid credentials"});

        const token = jwt.sign({ id: regUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, regUser: { name: regUser.name, email: regUser.email, id: regUser._id}});
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
});


module.exports = router;