const db = require("../db/connection");

function getActiveOrders(callback) {
  const sql = `
    SELECT 
      o.order_id, u.username, 
      o.currency_code, o.quote_currency_code,
      o.price_per_unit, o.amount, o.status, o.order_type,
      o.created_at
    FROM orders o
    JOIN users u ON o.user_id = u.user_id
    WHERE o.status = 'active'
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

function createOrder(orderData, callback) {
  const {
    user_id,
    order_type,
    currency_code,
    quote_currency_code,
    price_per_unit,
    amount
  } = orderData;

  const sql = `
    INSERT INTO orders 
      (user_id, order_type, currency_code, quote_currency_code, price_per_unit, amount, status)
    VALUES (?, ?, ?, ?, ?, ?, 'active')
  `;

  const values = [user_id, order_type, currency_code, quote_currency_code, price_per_unit, amount];

  db.run(sql, values, function (err) {
    if (err) return callback(err);
    callback(null, { order_id: this.lastID });
  });
}

module.exports = {
  getActiveOrders,
  createOrder
};