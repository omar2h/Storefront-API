CREATE TABLE IF NOT EXISTS orders(
    order_uid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    product_uid UUID NOT NULL REFERENCES products(product_uid),
    quantity INTEGER NOT NULL,
    user_uid UUID NOT NULL REFERENCES users(user_uid),
    status VARCHAR(10) NOT NULL
);

ALTER TABLE orders ADD CONSTRAINT status_constraint
CHECK (status='active' or status='complete');

