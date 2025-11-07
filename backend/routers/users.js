const express = require('express');
const router = express.Router();
const {createUser, getAllUsers, getSpecificUser, updateUser, deleteUser, getUserBalance} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getSpecificUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/balance', getUserBalance)

module.exports = router; 