const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');


dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'READ'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()) //Parse

const PORT = process.env.PORT || 5000;

connectDB();

// Import routes
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/products', require('./Routes/product'));
app.use('/api/orders', require('./Routes/order'));
app.use('/api/mpesa', require('./Routes/mpesa'));

app.get('/', (req, res)=> {
    res.send("Mern Shop Server....");
});

app.listen(PORT, ()=> {
    console.log(`Server is up and running via http://localhost:${PORT}`);
})