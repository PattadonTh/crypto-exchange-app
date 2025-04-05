const db = require("../db/connection");

function getAllWallets(callback) {
  const sql = `
    SELECT 
      w.wallet_id, u.username,
      w.currency_code, w.balance, w.created_at
    FROM wallets w
    JOIN users u ON w.user_id = u.user_id
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = { getAllWallets };
