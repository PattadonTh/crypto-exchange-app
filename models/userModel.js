const db = require("../db/connection");

function getAllUsersWithWallets(callback) {
  const sql = `
    SELECT 
      u.user_id,
      u.username,
      u.email,
      u.created_at,
      json_group_array(
        json_object(
          'wallet_id', w.wallet_id,
          'currency_code', w.currency_code,
          'balance', w.balance
        )
      ) as wallets
    FROM users u
    LEFT JOIN wallets w ON u.user_id = w.user_id
    GROUP BY u.user_id
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = { getAllUsersWithWallets };
