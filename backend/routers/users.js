const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req,res) => {
    try{
        const newUser = await User.create(req.body);
        return res.status(201).json(newUser);
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

router.get('/', async (req,res) => {
    try{
        const users = await User.find();
        return res.json(users); 
    } catch (error){
        res.status(500).json({error: error.message});
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user){
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error){
        res.status(500).json({error: error.message});
    }
})

module.exports = router; 