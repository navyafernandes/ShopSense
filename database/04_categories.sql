CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,

    category_name VARCHAR(100) UNIQUE NOT NULL,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);