CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,

    customer_id INT NOT NULL,

    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    total_amount DECIMAL(10,2)
        NOT NULL
        CHECK (total_amount >= 0),

    order_status VARCHAR(20)
        DEFAULT 'PENDING'
        CHECK (
            order_status IN
            ('PENDING','CONFIRMED','SHIPPED','DELIVERED','CANCELLED')
        ),

    shipping_address TEXT NOT NULL,

    tracking_number VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE CASCADE
);