const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');

// Utility to access the token
async function getMpesaAccessToken(){
    const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET} = process.env;

    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');
    const res = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        { headers: { Authorization: `Basic ${auth}` } }
    );
    return res.data.access_token;
}


router.post('/stk', async (req, res)=>{
    const { phone, amount } = req.body;
    const { MPESA_SHORTCODE, MPESA_PASSKEY, MPESA_CALLBACK_URL } = process.env;

    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');

    try {
        const access_token = await getMpesaAccessToken();

        const stkRes = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            {
                BusinessShortCode: MPESA_SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: phone,
                PartyB: MPESA_SHORTCODE,
                PhoneNumber: phone,
                CallBackURL: MPESA_CALLBACK_URL,
                AccountReference: "mernshop",
                TransactionDesc: "E-Commerce Payment"
            },
            { headers: {Authorization: `Bearer ${access_token}`}}
        );
        res.json(stkRes.data);
    } catch (error) {
        res.status(500).json({ message: "STK Push Failed", error: error.message })
    }
});


router.post('/callback', (req, res)=> {
    console.log('Mpesa Callback', req.body);
    res.json({status: 'Ok'});
});


module.exports = router

