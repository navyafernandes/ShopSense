CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,

    product_id INT UNIQUE NOT NULL,

    stock_quantity INT
        NOT NULL
        DEFAULT 0
        CHECK (stock_quantity >= 0),

    reorder_level INT
        DEFAULT 10
        CHECK (reorder_level >= 0),

    warehouse_location VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_inventory_product
        FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE CASCADE
);