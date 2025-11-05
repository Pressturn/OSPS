const express = require("express");
const router = express.Router();
const {
    getAllReceipts,
    getReceiptById,
    updateReceipt,
    deleteReceipt

} = require('../controllers/receiptController');

//get all receipts
router.get("/",getAllReceipts);

//get single receipt y ID
router.get("/:id", getReceiptById);

//update receipt details
router.put("/:id",updateReceipt);

//delete receipt
router.delete("/:id", deleteReceipt);

module.exports = router;
