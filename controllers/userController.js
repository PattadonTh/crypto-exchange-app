const { getAllUsersWithWallets } = require("../models/userModel");

function getUsers(req, res) {
  getAllUsersWithWallets((err, users) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(users);
  });
}


module.exports = { getUsers };
