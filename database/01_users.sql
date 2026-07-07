CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password_hash VARCHAR(255) NOT NULL,

    phone VARCHAR(15),

    role VARCHAR(20)
        CHECK (role IN ('CUSTOMER', 'VENDOR', 'ADMIN'))
        NOT NULL,

    status VARCHAR(20)
        DEFAULT 'ACTIVE'
        CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);