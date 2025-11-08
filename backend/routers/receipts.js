const express = require("express");
const router = express.Router();
const {
  createReceipt,
  getAllReceipts,
  getReceiptById,
  updateReceipt,
  deleteReceipt,
} = require("../controllers/receiptController");

//get all receipts
router.get("/",getAllReceipts);

//create receipt
router.post("/", createReceipt);

//get single receipt y ID
router.get("/:id", getReceiptById);

//update receipt details
router.put("/:id",updateReceipt);

//delete receipt
router.delete("/:id", deleteReceipt);

module.exports = router;
