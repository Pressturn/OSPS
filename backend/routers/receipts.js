const express = require("express");
const router = express.Router();

//get all receipts
router.get("/receipts");

//get single receipt y ID
router.get("/receipts/:id");

//update receipt details
router.put("/receipts/:id");

module.exports = router;
