DROP TYPE IF EXISTS order_status;
CREATE TYPE order_status AS ENUM ('ACTIVE', 'COMPLETE');

CREATE TABLE IF NOT EXISTS orders(
    order_uid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    product_uid UUID NOT NULL REFERENCES products(product_uid),
    quantity INTEGER NOT NULL,
    user_uid UUID NOT NULL REFERENCES users(user_uid),
    status  order_status NOT NULL
);