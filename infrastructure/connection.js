const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'ximbas32',
  database: 'gerencia_pagamentos'
})

module.exports = connection

