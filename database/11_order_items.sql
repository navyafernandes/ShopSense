CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,

    order_id INT NOT NULL,

    product_id INT NOT NULL,

    vendor_id INT NOT NULL,

    quantity INT
        NOT NULL
        CHECK (quantity > 0),

    price DECIMAL(10,2)
        NOT NULL
        CHECK (price >= 0),

    CONSTRAINT fk_orderitem_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_orderitem_product
        FOREIGN KEY (product_id)
        REFERENCES products(product_id),

    CONSTRAINT fk_orderitem_vendor
        FOREIGN KEY (vendor_id)
        REFERENCES vendors(vendor_id)
);