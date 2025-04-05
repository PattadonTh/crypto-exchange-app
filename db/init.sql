-- USERS
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- CURRENCIES
CREATE TABLE IF NOT EXISTS currencies (
    currency_code TEXT PRIMARY KEY,
    currency_name TEXT NOT NULL,
    currency_type TEXT CHECK (
        currency_type IN ('crypto', 'fiat')
    ) NOT NULL,
    symbol TEXT
);

-- WALLETS
CREATE TABLE IF NOT EXISTS wallets (
    wallet_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    currency_code TEXT NOT NULL,
    balance REAL DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (currency_code) REFERENCES currencies (currency_code)
);

-- TRANSACTIONS
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_from_id INTEGER,
    wallet_to_id INTEGER,
    currency_code TEXT NOT NULL,
    amount REAL NOT NULL,
    transaction_type TEXT CHECK (
        transaction_type IN (
            'deposit',
            'withdraw',
            'transfer',
            'trade'
        )
    ) NOT NULL,
    external_address TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_from_id) REFERENCES wallets (wallet_id),
    FOREIGN KEY (wallet_to_id) REFERENCES wallets (wallet_id),
    FOREIGN KEY (currency_code) REFERENCES currencies (currency_code)
);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    order_type TEXT CHECK (order_type IN ('buy', 'sell')) NOT NULL,
    currency_code TEXT NOT NULL,
    quote_currency_code TEXT NOT NULL,
    price_per_unit REAL NOT NULL,
    amount REAL NOT NULL,
    status TEXT CHECK (
        status IN (
            'active',
            'completed',
            'cancelled'
        )
    ) NOT NULL DEFAULT 'active',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (currency_code) REFERENCES currencies (currency_code),
    FOREIGN KEY (quote_currency_code) REFERENCES currencies (currency_code)
);

-- TRADES
CREATE TABLE IF NOT EXISTS trades (
    trade_id INTEGER PRIMARY KEY AUTOINCREMENT,
    buy_order_id INTEGER NOT NULL,
    sell_order_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    price REAL NOT NULL,
    matched_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buy_order_id) REFERENCES orders (order_id),
    FOREIGN KEY (sell_order_id) REFERENCES orders (order_id)
);