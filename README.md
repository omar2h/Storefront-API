# Build a Storefront Backend

## About <a name = "about"></a>

Storefront REST API implemented with Nodejs, Express and Typescript. Tested using Jasmine.

## Prerequisites

* NodeJs
### List of dependencies
- express - `npm i express` - Node.js web app framework
- dotenv - `npm i dotenv` - Load environment variables
- pg - `npm i pg` - PostgreSQL client
- bcrypt - `npm i bcrypt` - Password hashing
- jsonwebtoken - `npm i jsonwebtoken` - JSON web tokens
- db-migrate - `npm i -g db-migrate` - Database migration tool
- db-migrate-pg - `npm -g db-migrate-pg` - PostgreSQL driver for DB
- express-async-errors - `npm i express-async-errors` - A dead simple ES6 async/await support hack for ExpressJS
- http-status-codes - `npm i http-status-codes` - Constants enumerating the HTTP status codes
- morgan - `npm i morgan` - HTTP request logger middleware for node.js
- uuid - `npm i uuid` - For the creation of RFC4122 UUIDs
#### Dev dependencies
- eslint - `npm i --save-dev eslint` - Linter
- prettier - `npm i --save-dev prettier` - Code formatting
- eslint-plugin-prettier - `npm i --save-dev eslint-plugin-prettier` - Run prettier as an eslint rule
- eslint-config-prettier - `npm i --save-dev eslint-config-prettier` - Disable conflicting eslint rules
- eslint-plugin-import - `npm i --save-dev eslint-plugin-import` - Support for ES6 import/export syntax
- jasmine-ts - `npm i --save-dev jasmine-ts` - Jasmine unit testing
- jasmine-spec-reporter - `npm i --save-dev jasmine-spec-reporter` - Jasmine test output formatting
- ts-node - `npm i --save-dev ts-node` - Typescript node.js

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Install all dependencies

```bash
npm init
npm install
```

### Setup
**creating user**
```sh
CREATE USER wizard WITH PASSWORD '12345';
```
**Create development and testing db**
```sh
CREATE DATABASE storedb;
CREATE DATABASE storedb_test;
```
**Grant all privileges to databases**
```sh
\c storedb;
GRANT ALL PRIVILEGES ON DATABASE storedb To wizard;
\c storedb_test 
GRANT ALL PRIVILEGES ON DATABASE storedb_test To wizard;
```
#### env file
- Add to your .env file
```sh
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_USER=wizard
POSTGRES_PORT=5432
POSTGRES_PASSWORD=12345
POSTGRES_DB=storedb
POSTGRES_DB_TEST=storedb_test
ENV=dev

SALT_ROUNDS=10
BCRYPT_PASSWORD=balderdash
TOKEN_SECRET=who-are-you
```
- The server runs on <a href="http://localhost:3000">localhost</a>
### Run
```
npm run watch
```
#### Migrations
```
npm run migrate-up
npm run migrate-down
```
### Test
```
npm run test
```
