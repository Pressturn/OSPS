const express = require('express');
const router = express.Router();
const {createExpense, getAllExpenses, getSpecificExpense, updateExpense, deleteExpense} = require('../controllers/expenses');

router.post('/', createExpense);
router.get('/', getAllExpenses);
router.get('/:id', getSpecificExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router; 