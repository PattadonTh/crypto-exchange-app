const express = require("express");
const router = express.Router();
const { getWallets } = require("../controllers/walletController");

router.get("/", getWallets);

module.exports = router;
