CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,

    user_id INT UNIQUE NOT NULL,

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    country VARCHAR(100),

    postal_code VARCHAR(10),

    CONSTRAINT fk_customer_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);