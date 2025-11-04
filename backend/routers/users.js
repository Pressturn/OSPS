const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req,res) => {
    try{
        const newUser = await User.create(req.body);
        return res.status(201).json(newUser);
    } catch (error){
        console.log(error);
    }
});

module.exports = router; 