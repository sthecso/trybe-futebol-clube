import 'dotenv/config';

const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || '123456';
const database = process.env.DB_NAME || 'TRYBE_FUTEBOL_CLUBE';
const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || '3002';

const dialect = 'mysql';
const dialectOptions = {
  timezone: 'Z',
};
const logging = false;

export {
  username,
  password,
  database,
  host,
  port,
  dialect,
  dialectOptions,
  logging,
};
