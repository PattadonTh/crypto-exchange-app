const express = require("express");
const router = express.Router();
const { postTransaction, getTransactions } = require("../controllers/transactionController");

router.post("/", postTransaction);
router.get("/", getTransactions);

module.exports = router;
