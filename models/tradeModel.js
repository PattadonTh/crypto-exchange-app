const db = require("../db/connection");


function createTrade(tradeData, callback) {
  const { buy_order_id, sell_order_id, amount, price } = tradeData;

  const sql = `
    INSERT INTO trades (buy_order_id, sell_order_id, amount, price)
    VALUES (?, ?, ?, ?)
  `;

  const values = [buy_order_id, sell_order_id, amount, price];

  db.run(sql, values, function (err) {
    if (err) return callback(err);
    callback(null, { trade_id: this.lastID });
  });
}

function getAllTrades(callback) {
  const sql = `
    SELECT 
      t.trade_id,
      t.buy_order_id,
      t.sell_order_id,
      t.amount,
      t.price,
      t.matched_at
    FROM trades t
    ORDER BY t.matched_at DESC
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = { createTrade, getAllTrades };
