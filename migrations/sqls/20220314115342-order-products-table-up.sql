CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_products(
    order_product_uid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    order_uid UUID NOT NULL REFERENCES orders(order_uid),
    product_uid UUID NOT NULL REFERENCES products(product_uid),
    quantity INTEGER NOT NULL
);