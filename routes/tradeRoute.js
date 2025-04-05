const express = require("express");
const router = express.Router();
const { postTrade, getTrades } = require("../controllers/tradeController");

router.post("/", postTrade);
router.get("/", getTrades);

module.exports = router;
