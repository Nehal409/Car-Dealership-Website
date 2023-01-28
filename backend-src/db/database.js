require('dotenv').config();

//db connection

const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.host,
    port: process.env.ports,
    user: process.env.user,
    password: '',
    database: process.env.database
  }
});

module.exports = db;
