CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,

    order_id INT UNIQUE NOT NULL,

    payment_method VARCHAR(30)
        CHECK (
            payment_method IN
            ('UPI','CARD','NET_BANKING','COD','WALLET')
        ),

    payment_status VARCHAR(20)
        DEFAULT 'PENDING'
        CHECK (
            payment_status IN
            ('PENDING','SUCCESS','FAILED','REFUNDED')
        ),

    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_payment_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE
);