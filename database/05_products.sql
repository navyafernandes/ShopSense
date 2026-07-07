CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,

    vendor_id INT NOT NULL,

    category_id INT NOT NULL,

    product_name VARCHAR(200) NOT NULL,

    description TEXT,

    brand VARCHAR(100),

    sku VARCHAR(50) UNIQUE,

    price DECIMAL(10,2) NOT NULL,

    discount_price DECIMAL(10,2),

    status VARCHAR(20)
        DEFAULT 'ACTIVE'
        CHECK (status IN ('ACTIVE', 'OUT_OF_STOCK', 'DISCONTINUED')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_product_vendor
        FOREIGN KEY (vendor_id)
        REFERENCES vendors(vendor_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
);