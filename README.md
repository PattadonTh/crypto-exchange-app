# Crypto Exchange API

A simplified Node.js-based cryptocurrency exchange platform for trading between fiat (THB) and cryptocurrencies (BTC, ETH, etc.). Supports user accounts, wallets, orders, trades, and transactions.

---

## Getting Started

### 1. Clone the repository

### 2. Install dependencies

```bash
npm install
```

### 3. Setup SQLite database

```bash
sqlite3 db/crypto_exchange.sqlite < db/init.sql
sqlite3 db/crypto_exchange.sqlite < test/test-seed.sql
```

### 4. Start the server

```bash
npm start
```

Server will run on: `http://localhost:3000`

---

## API Endpoints

### Get all users

**GET** `/users`

```json
[
  {
    "user_id": 1,
    "username": "Alpha",
    "email": "alpha@example.com",
    "created_at": "2025-04-05 17:45:00"
  }
]
```

### Get all wallets

**GET** `/wallets`

```json
[
  {
    "wallet_id": 1,
    "user_id": 1,
    "currency_code": "BTC",
    "balance": 1.0,
    "created_at": "2025-04-05 17:45:10"
  }
]
```

### Get all orders

**GET** `/orders`

```json
[
  {
    "order_id": 1,
    "user_id": 1,
    "order_type": "sell",
    "currency_code": "BTC",
    "quote_currency_code": "THB",
    "price_per_unit": 1200000,
    "amount": 0.5,
    "status": "active",
    "created_at": "2025-04-05 17:50:00"
  }
]
```

### Create an order (buy/sell)

**POST** `/orders`

```json
{
  "user_id": 2,
  "order_type": "buy",
  "currency_code": "BTC",
  "quote_currency_code": "THB",
  "price_per_unit": 1200000,
  "amount": 0.5
}
```

**Response**

```json
{
  "message": "Order created",
  "order_id": 2
}
```

### Get all trades

**GET** `/trades`

```json
[
  {
    "trade_id": 1,
    "buy_order_id": 2,
    "sell_order_id": 1,
    "amount": 0.5,
    "price": 1200000,
    "matched_at": "2025-04-05 17:51:00"
  }
]
```

### Get all transactions

**GET** `/transactions`

```json
[
  {
    "transaction_id": 1,
    "wallet_from_id": 1,
    "wallet_to_id": 2,
    "currency_code": "BTC",
    "amount": 0.5,
    "transaction_type": "trade",
    "created_at": "2025-04-05 17:51:01"
  }
]
```

### Create a transaction (e.g., transfer)

**POST** `/transactions`

```json
{
  "wallet_from_id": 1,
  "wallet_to_id": 2,
  "currency_code": "BTC",
  "amount": 0.1,
  "transaction_type": "transfer"
}
```

**Response**

```json
{
  "message": "Transaction created and balances updated",
  "transaction_id": 2
}
```

---

## Seed & Reset Database

```bash
npm run seed:test         # Load Alpha & Bravo test data
npm run reset:all         # (Optional) Re-init + seed
```

---

## Features Summary

- [x] User & wallet system
- [x] Buy/sell order posting
- [x] Matching engine (auto-matches buy/sell)
- [x] Trade logging
- [x] Transaction record & wallet balance update
- [x] SQLite3 embedded database

---

## Contact

Created by PATTADON THEPKAN— Feel free to reach out if you'd like to contribute or collaborate!
