const { createTrade ,getAllTrades } = require("../models/tradeModel");

function postTrade(req, res) {
  const { buy_order_id, sell_order_id, amount, price } = req.body;

  if (!buy_order_id || !sell_order_id || !amount || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  createTrade({ buy_order_id, sell_order_id, amount, price }, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(201).json({ message: "Trade created", trade_id: result.trade_id });
  });
}

function getTrades(req, res) {
  getAllTrades((err, trades) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.json(trades);
  });
}

module.exports = { postTrade, getTrades };
