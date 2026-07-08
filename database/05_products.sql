CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,

    vendor_id INT NOT NULL,

    category_id INT NOT NULL,

    product_name VARCHAR(200) NOT NULL,

    description TEXT,

    brand VARCHAR(100),

    sku VARCHAR(50) UNIQUE,

    thumbnail_url VARCHAR(255),

    price DECIMAL(10,2)
        NOT NULL
        CHECK (price >= 0),

    discount_price DECIMAL(10,2)
        CHECK (discount_price >= 0),

    rating DECIMAL(2,1)
        DEFAULT 0.0
        CHECK (rating BETWEEN 0 AND 5),

    product_status VARCHAR(20)
        DEFAULT 'ACTIVE'
        CHECK (
            product_status IN
            ('ACTIVE','OUT_OF_STOCK','DISCONTINUED')
        ),

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