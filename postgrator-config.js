"use strict";

const dotenv = require('dotenv');
let envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({ path: envFile })

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "mysql",
  "host": process.env.MIGRATION_DB_HOST,
  "port": process.env.MIGRATION_DB_PORT,
  "database": process.env.MIGRATION_DB_NAME,
  "username": process.env.MIGRATION_DB_USER,
  "password": process.env.MIGRATION_DB_PASSWORD,
  "ssl": process.env.NODE_ENV === "production" ? true : false
};
