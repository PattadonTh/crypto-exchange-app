const { getAllWallets } = require("../models/walletModel");

function getWallets(req, res) {
  getAllWallets((err, wallets) => {
    if (err) {
      console.error("Error fetching wallets:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(wallets);
  });
}

module.exports = { getWallets };
