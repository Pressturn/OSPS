//import the expense model
const Expense = require("../models/expense");
const {calculateBalances} = require('../util/balanceCalculator');

exports.createReceipt = async (req,res) => {
  try {
    const newReceipt = await Expense.create(req.body);
    return res.status(201).json(newReceipt);
    } catch (error){
        res.status(400).json({error: error.message});
    }
};


exports.getAllReceipts = async (req, res) => {
  try {
    const receipts = await Expense.find()
      .populate("paidBy", "name") //get data on who paid 
      .populate("splitBetween", "name"); //who you split the receipt with

    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get single receipt by ID
exports.getReceiptById = async (req, res) => {
    try{
        const receipt = await Expense.findById(req.params.id).populate('paidBy', 'name').populate('splitBetween.user','name');
        if(!receipt) {
            return res.status(404).json({error: "receipt not found"})
        }

        res.status(200).json(receipt);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
};

//update receipts, updating amount, description, paidby, splitbetween
exports.updateReceipt = async (req, res) => {
  try {
    const receipt = await Expense.findByIdAndUpdate(
      req.params.id, //receipt id from the url
      req.body, // data sent by the client
      { new: true, runValidators: true } //new. = true is the updated document
    );

    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.status(200).json(receipt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete receipt
exports.deleteReceipt = async (req, res) => {
  try {
    const receipt = await Expense.findByIdAndDelete(req.params.id);

    if (!receipt) {
      return res.status(404).json({ error: "receipt not found" });
    }

    res.status(200).json({ message: "Receipt deleted succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//test balance calculation
exports.testBalance = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const result = calculateBalances(expenses);

    res.json({
      message: 'Balance calculation successful!',
      totalExpenses: expenses.length,
      debts: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
