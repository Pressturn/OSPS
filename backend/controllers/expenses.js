const Expense = require('../models/expense'); 

async function createExpense(req,res){
    try{
        const newExpense = await Expense.create(req.body);
        return res.status(201).json(newExpense);
    } catch (error){
        res.status(400).json({error: error.message});
    }
};

async function getAllExpenses(req,res){
    try{
        const expenses = await Expense.find();
        return res.json(expenses); 
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

async function getSpecificExpense(req,res){
    try{
        const expense = await Expense.findById(req.params.id);
        if(!expense){
            return res.status(404).json({error: 'Expense not found'});
        }
        return res.json(expense); 
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

async function updateExpense(req,res){
    try{
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        if (!expense){
            return res.status(404).json({error: 'Exepnse not found'});
        }
        return res.json(expense);
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

async function deleteExpense(req,res){
    try{
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense){
            return res.status(404).json({error: 'Expense not found'});
        }
        res.status(200).json({message: 'Expense deleted successfully'});
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    createExpense,
    getAllExpenses,
    getSpecificExpense,
    deleteExpense,
    updateExpense
};