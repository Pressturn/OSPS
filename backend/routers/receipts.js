const express = require("express");
const router = express.Router();
const {
  createReceipt,
  getAllReceipts,
  getReceiptById,
  updateReceipt,
  deleteReceipt,

} = require("../controllers/receiptController");
const verifyToken = require('../middleware/verifyToken')

//get all receipts
router.get("/", verifyToken, getAllReceipts);

//create receipt
router.post("/", verifyToken, createReceipt);

//get single receipt y ID
router.get("/:id", verifyToken, getReceiptById);

//update receipt details
router.put("/:id", verifyToken, updateReceipt);

//delete receipt
router.delete("/:id", verifyToken, deleteReceipt);

module.exports = router;
