//import the expense model
const Expense = require("../models/expense");
const { calculateBalances } = require('../util/balanceCalculator');
const { getUserBalanceSummary } = require('../services/balanceSummary');
const { calculateBalances } = require("../util/balanceCalculator");

//function to create new receipts
exports.createReceipt = async (req, res) => {
  try {
    const userId = req.user.userId;

    //create a new expense document in mongoDB
    const newReceipt = await Expense.create({
      ...req.body,
      paidBy: userId,
    });

    //newly created receipt object as JSON
    return res.status(201).json(newReceipt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// fetch all the receipts, get the user ID
exports.getAllReceipts = async (req, res) => {
  try {
    const userId = req.user.userId;

    //searches mongoDB expense for all receipts that fulfill who paid by/ split between this user ID
    const receipts = await Expense.find({
      $or: [{ paidBy: userId }, { "splitBetween.user": userId }],
    })
      .populate("paidBy", "name") //get data on who paid
      .populate("splitBetween", "name"); //who you split the receipt with

    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get single receipt by ID
exports.getReceiptById = async (req, res) => {
  try {
    const userId = req.user.userId;

    //from the id, in the DB find the name of who paid, who split with users
    const receipt = await Expense.findById(req.params.id)
      .populate("paidBy", "name")
      .populate("splitBetween.user", "name");

    //if no receipt return an error
    if (!receipt) {
      return res.status(404).json({ error: "receipt not found" });
    }

    //if you paid for the receipt, you can see the receipt
    const canViewRecipt =
      receipt.paidBy._id.toString() === userId ||
      receipt.splitBetween.some(
        (split) => split.user._id.toString() === userId
      );

    if (!canViewRecipt) {
      return res
        .status(403)
        .json({ error: "Not authorized to view this receipt" });
    }

    res.status(200).json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update receipts, updating amount, description, paidby, splitbetween
exports.updateReceipt = async (req, res) => {
  try {
    //who is updating the receipt, via userID
    const userId = req.user.userId;

    const receipt = await Expense.findById(req.params.id);

    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    //only the user who paid for the receipt can edit it
    if (receipt.paidBy.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorised to update this receipt" });
    }

    //replace the old fields with new ones
    const updatedReceipt = await Expense.findByIdAndUpdate(
      req.params.id, //receipt id from the url
      req.body, // data sent by the client
      { new: true, runValidators: true } //new. = true returns the updated receipt, validators: make sure the new data obeys the schema
    );

    res.status(200).json(updatedReceipt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete receipt
exports.deleteReceipt = async (req, res) => {
  try {
    const userId = req.user.userId;

    const receipt = await Expense.findById(req.params.id);

    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    if (receipt.paidBy.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorised to delete this receipt" });
    }

    //delete the receipt
    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Receipt deleted succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//test balance calculation
exports.testBalance = async (req, res) => {
  try {
    //get all expense documents from mongoDB
    const expenses = await Expense.find();
    //function from util folder
    const result = calculateBalances(expenses);

    res.json({
      message: "Balance calculation successful!",
      totalExpenses: expenses.length,
      debts: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBalanceSummary = async (req, res) => {
  try {
    const userId = req.user.userId
    const summary = await getUserBalanceSummary(userId)
    res.json(summary)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}