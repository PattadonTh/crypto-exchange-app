const db = require("../db/connection");

function createTransaction(txData, callback) {
  const {
    wallet_from_id,
    wallet_to_id,
    currency_code,
    amount,
    transaction_type,
    external_address
  } = txData;

  const sql = `
    INSERT INTO transactions 
    (wallet_from_id, wallet_to_id, currency_code, amount, transaction_type, external_address)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    wallet_from_id || null,
    wallet_to_id || null,
    currency_code,
    amount,
    transaction_type,
    external_address || null
  ];

  db.run(sql, values, function (err) {
    if (err) return callback(err);
    callback(null, { transaction_id: this.lastID });
  });
}

function getAllTransactions(callback) {
  const sql = `
    SELECT 
      t.transaction_id,
      t.wallet_from_id,
      t.wallet_to_id,
      t.currency_code,
      t.amount,
      t.transaction_type,
      t.external_address,
      t.created_at
    FROM transactions t
    ORDER BY t.created_at DESC
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = { createTransaction, getAllTransactions };
