const db = require("../db/connection");
const { createTransaction, getAllTransactions } = require("../models/transactionModel");

function postTransaction(req, res) {
  const {
    wallet_from_id,
    wallet_to_id,
    currency_code,
    amount,
    transaction_type,
    external_address
  } = req.body;

  console.log("Received transaction data:", req.body);

  if (!currency_code || !amount || !transaction_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  createTransaction(
    {
      wallet_from_id,
      wallet_to_id,
      currency_code,
      amount,
      transaction_type,
      external_address
    },
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });

      // Check if both wallets use same currency
      validateSameCurrency(wallet_from_id, wallet_to_id, currency_code, (err) => {
        if (err) {
          console.error("Currency mismatch:", err.message);
          return res.status(400).json({ error: err.message });
        }

        // Update wallet balance
        if (transaction_type !== "deposit" && wallet_from_id) {
          updateWalletBalance(wallet_from_id, currency_code, -amount, (err) => {
            if (err) console.error("Error updating sender wallet:", err);
          });
        }

        if (transaction_type !== "withdraw" && wallet_to_id) {
          updateWalletBalance(wallet_to_id, currency_code, amount, (err) => {
            if (err) console.error("Error updating receiver wallet:", err);
          });
        }

        res.status(201).json({
          message: "Transaction created and balances updated",
          transaction_id: result.transaction_id
        });
      });
    }
  );
}

function getTransactions(req, res) {
  getAllTransactions((err, txs) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    res.json(txs);
  });
}

// Check currency in wallet
function validateSameCurrency(wallet1, wallet2, currency_code, callback) {
  const ids = [wallet1, wallet2].filter(Boolean); 

  if (ids.length === 0) return callback(null); 

  const sql = `
    SELECT wallet_id, currency_code 
    FROM wallets 
    WHERE wallet_id IN (${ids.map(() => '?').join(',')})
  `;

  db.all(sql, ids, (err, rows) => {
    if (err) return callback(err);

    const mismatch = rows.find(w => w.currency_code !== currency_code);
    if (mismatch) {
      return callback(new Error(`Currency mismatch in wallet_id ${mismatch.wallet_id}`));
    }

    callback(null);
  });
}

// Update wallet balance
function updateWalletBalance(wallet_id, currency_code, amountChange, callback) {
  const sql = `
    UPDATE wallets
    SET balance = balance + ?
    WHERE wallet_id = ? AND currency_code = ?
  `;
  db.run(sql, [amountChange, wallet_id, currency_code], callback);
}

module.exports = { postTransaction, getTransactions };
