const db = require("../db/connection");
const { getActiveOrders,  createOrder } = require("../models/orderModel");
const { createTrade } = require("../models/tradeModel");
const { createTransaction } = require("../models/transactionModel");


function getOrders(req, res) {
  getActiveOrders((err, orders) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(orders);
  });
}

function postOrder(req, res) {
  const data = req.body;

  // Validate input
  if (!data.user_id || !data.order_type || !data.currency_code || !data.quote_currency_code || !data.price_per_unit || !data.amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  createOrder(data, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    //Matching logic
    matchOrder(result.order_id);
    res.status(201).json({ message: "Order created", order_id: result.order_id });
  });
}

function matchOrder(order_id) {
  console.log("Matching order ID:", order_id); 
  const getOrderSQL = `SELECT * FROM orders WHERE order_id = ?`;

  db.get(getOrderSQL, [order_id], (err, order) => {
    if (err || !order) return;

    const {
      order_type,
      currency_code,
      quote_currency_code,
      price_per_unit,
      amount
    } = order;

    // opposite
    const oppositeType = order_type === "buy" ? "sell" : "buy";
    const priceCondition =
      order_type === "buy"
        ? "price_per_unit <= ?"
        : "price_per_unit >= ?";

    const findMatchSQL = `
      SELECT * FROM orders
      WHERE order_type = ?
        AND currency_code = ?
        AND quote_currency_code = ?
        AND ${priceCondition}
        AND status = 'active'
      ORDER BY created_at ASC
      LIMIT 1
    `;

    db.get(
      findMatchSQL,
      [oppositeType, currency_code, quote_currency_code, price_per_unit],
      (err, matched) => {
        if (err || !matched) return;

        const matchedAmount = Math.min(order.amount, matched.amount);
        const finalPrice = matched.price_per_unit;

        // Create Trade
        createTrade(
          {
            buy_order_id: order_type === "buy" ? order_id : matched.order_id,
            sell_order_id: order_type === "sell" ? order_id : matched.order_id,
            amount: matchedAmount,
            price: finalPrice
          },
          () => {
            // Create Transactions
            const baseTx = {
              wallet_from_id: order_type === "sell" ? order.user_id : matched.user_id,
              wallet_to_id: order_type === "buy" ? order.user_id : matched.user_id,
              currency_code: currency_code,
              amount: matchedAmount,
              transaction_type: "trade"
            };

            const quoteTx = {
              wallet_from_id: order_type === "buy" ? order.user_id : matched.user_id,
              wallet_to_id: order_type === "sell" ? order.user_id : matched.user_id,
              currency_code: quote_currency_code,
              amount: matchedAmount * finalPrice,
              transaction_type: "trade"
            };

            createTransaction(baseTx, () => {});
            createTransaction(quoteTx, () => {});

            // Update Both Status to 'completed'
            const updateOrder = `UPDATE orders SET status = 'completed' WHERE order_id IN (?, ?)`;
            db.run(updateOrder, [order_id, matched.order_id]);
          }
        );
      }
    );
  });
}


module.exports = {
  getOrders,
  postOrder
};


