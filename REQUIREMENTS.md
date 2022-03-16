# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `'api/v1/products/' (GET)` 
- Show: `'api/v1/products/:id' (GET)`
- Create: `'api/v1/products/' (POST)` [token required]

#### Users
- Index:  `'api/v1/users/' (GET)` [token required]
- Show:  `'api/v1/users/:id' (GET)` [token required]
- Create:  `'api/v1/users/' (POST)`

#### Orders
- Index:  `'api/v1/orders/' (GET)` [token required]
- Show:  `'api/v1/orders/:id' (GET)` [token required]
- Create:  `'api/v1/orders/' (POST)` [token required]
- addProduct:  `'api/v1/orders/:id/products' (POST)` [token required]

#### Dashboard
- allOrdersWithProducts `'api/v1/dashboard/orders-products' (GET)` [token required]
- singleOrderWithProducts `'api/v1/dashboard/orders-products/:id' (args: user id) (GET)` [token required]
- getUserOrders `'api/v1/dashboard/user-orders/:id' (GET)` (args: user id) (query: order status) [token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
```sql
CREATE TABLE products(
    product_uid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    price NUMERIC(19,2) NOT NULL,
    category VARCHAR(70)
);
```

#### User
- id
- email
- firstName
- lastName
- password
```sql
CREATE TABLE users(
    user_uid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    email VARCHAR(150) UNIQUE,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL
);
```

#### Orders
- id
- user_id
- status of order (active or complete)
```sql
CREATE TABLE orders(
    order_uid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    user_uid UUID NOT NULL REFERENCES users(user_uid),
    status VARCHAR(10) NOT NULL
);

ALTER TABLE orders ADD CONSTRAINT status_constraint
CHECK (status='active' or status='complete');
```
#### order-products
- id
- order_uid
- product_uid
- quantity of each product in the order
```sql
CREATE TABLE order_products(
    order_product_uid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    order_uid UUID NOT NULL REFERENCES orders(order_uid),
    product_uid UUID NOT NULL REFERENCES products(product_uid),
    quantity INTEGER NOT NULL
);
```
