-- ลบข้อมูลเดิมก่อน
DELETE FROM transactions;

DELETE FROM trades;

DELETE FROM orders;

DELETE FROM wallets;

DELETE FROM users;

DELETE FROM currencies;

-- 1. USERS
INSERT INTO
    users (
        username,
        email,
        password_hash
    )
VALUES (
        'Alpha',
        'alpha@example.com',
        'hash_alpha'
    ),
    (
        'Bravo',
        'bravo@example.com',
        'hash_bravo'
    );

-- 2. CURRENCIES
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
        'THB',
        'Thai Baht',
        'fiat',
        '฿'
    );

-- 3. WALLETS
-- Alpha: มี BTC สำหรับขาย
-- Bravo: มี THB สำหรับซื้อ
INSERT INTO
    wallets (
        user_id,
        currency_code,
        balance
    )
VALUES (1, 'BTC', 1.0),
    (1, 'THB', 1000),
    (2, 'THB', 500000),
    (2, 'BTC', 0.0);

-- 4. ORDERS
-- Alpha ขาย 0.5 BTC ที่ราคา 1,200,000
-- Bravo ซื้อ 0.5 BTC ที่ราคา 1,200,000
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
        0.5,
        'active'
    ),
    (
        2,
        'buy',
        'BTC',
        'THB',
        1200000,
        0.5,
        'active'
    );