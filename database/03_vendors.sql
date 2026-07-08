CREATE TABLE vendors (
    vendor_id SERIAL PRIMARY KEY,

    user_id INT UNIQUE NOT NULL,

    business_name VARCHAR(150) NOT NULL,

    business_type VARCHAR(100),

    gst_number VARCHAR(20) UNIQUE,

    commission_rate DECIMAL(5,2)
        DEFAULT 10.00
        CHECK (commission_rate >= 0),

    verification_status VARCHAR(20)
        DEFAULT 'PENDING'
        CHECK (
            verification_status IN
            ('PENDING','APPROVED','REJECTED')
        ),

    joined_date DATE DEFAULT CURRENT_DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_vendor_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);