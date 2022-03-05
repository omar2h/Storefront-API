CREATE TYPE order_status AS ENUM ('ACTIVE', 'COMPLETE');

CREATE TABLE IF NOT EXISTS orders(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    product_id BIGINT NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(id),
    status  order_status NOT NULL
);