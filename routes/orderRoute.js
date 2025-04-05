const express = require("express");
const router = express.Router();
const { getOrders, postOrder  } = require("../controllers/orderController");

router.get("/", getOrders);
router.post("/", postOrder);

module.exports = router;
