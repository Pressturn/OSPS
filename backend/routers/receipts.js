const express = require("express");
const router = express.Router();
const {
    getAllReceipts,
    getReceiptById,
    updateReceipt,
    deleteReceipt,
    createReceipt,
    testBalance
} = require('../controllers/receiptController');

router.post("/", createReceipt);

//get all receipts
router.get("/",getAllReceipts);

//test balance calculation
router.get("/test/balance", testBalance);

//get single receipt y ID
router.get("/:id", getReceiptById);

//update receipt details
router.put("/:id",updateReceipt);

//delete receipt
router.delete("/:id", deleteReceipt);

module.exports = router;
