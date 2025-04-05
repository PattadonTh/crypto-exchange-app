-- USERS
INSERT INTO
    users (
        username,
        email,
        password_hash
    )
VALUES (
        'pattadon',
        'pattadon@example.com',
        'hashed_pw_1'
    ),
    (
        'thepkan',
        'thepkan@example.com',
        'hashed_pw_2'
    );

-- CURRENCIES
INSERT INTO
    currencies (
        currency_code,
        currency_name,
        currency_type,
        symbol
    )
VALUES (
        'BTC',
        'Bitcoin',
        'crypto',
        '₿'
    ),
    (
        'ETH',
        'Ethereum',
        'crypto',
        'Ξ'
    ),
    (
        'THB',
        'Thai Baht',
        'fiat',
        '฿'
    ),
    (
        'USDT',
        'Tether USD',
        'crypto',
        '₮'
    );

-- WALLETS
INSERT INTO
    wallets (
        user_id,
        currency_code,
        balance
    )
VALUES (1, 'BTC', 0.5),
    (1, 'THB', 100000),
    (2, 'ETH', 2.0),
    (2, 'USDT', 500);

-- ORDERS
INSERT INTO
    orders (
        user_id,
        order_type,
        currency_code,
        quote_currency_code,
        price_per_unit,
        amount,
        status
    )
VALUES (
        1,
        'sell',
        'BTC',
        'THB',
        1200000,
        0.3,
        'active'
    ),
    (
        2,
        'buy',
        'BTC',
        'THB',
        1200000,
        0.3,
        'active'
    );

-- TRADES (matching between pattadon และ thepkan)
INSERT INTO
    trades (
        buy_order_id,
        sell_order_id,
        amount,
        price
    )
VALUES (2, 1, 0.3, 1200000);

-- TRANSACTIONS (from trade)
INSERT INTO
    transactions (
        wallet_from_id,
        wallet_to_id,
        currency_code,
        amount,
        transaction_type
    )
VALUES (1, 2, 'BTC', 0.3, 'trade'),
    (2, 1, 'THB', 360000, 'trade');