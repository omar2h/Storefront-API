CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products(
    product_uid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    price NUMERIC(19,2) NOT NULL,
    category VARCHAR(70)
);

