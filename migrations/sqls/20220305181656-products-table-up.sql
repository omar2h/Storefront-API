CREATE TABLE IF NOT EXISTS products(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    price NUMERIC(19,2) NOT NULL,
    category VARCHAR(70)
);

