const express = require("express");
const app = express();

const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const walletRoute = require("./routes/walletRoute");
const tradeRoute = require("./routes/tradeRoute");
const transactionRoute = require("./routes/transactionRoute");

app.use(express.json());
app.use("/users", userRoute);
app.use("/orders", orderRoute);
app.use("/wallets", walletRoute);
app.use("/trades", tradeRoute);
app.use("/transactions", transactionRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
