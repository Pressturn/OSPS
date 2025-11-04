const mongoose = require('mongoose');
const User = require('../models/user');

const expenseSchema = new moongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Enter an expense"],
    },

    description: {
        type: String,
        trim: true,
        required: [true, "Enter a description"],
    },

    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    splitBetween: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    howSplit: {

    },

    // timestamp

})