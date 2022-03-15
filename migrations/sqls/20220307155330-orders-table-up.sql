CREATE TABLE orders(
    order_uid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    user_uid UUID NOT NULL REFERENCES users(user_uid),
    status VARCHAR(10) NOT NULL
);

ALTER TABLE orders ADD CONSTRAINT status_constraint
CHECK (status='active' or status='complete');

