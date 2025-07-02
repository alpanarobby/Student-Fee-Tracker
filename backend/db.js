const sql = require('mssql');  
const config = {
  user: 'alpanarobby',
  password: 'wired@321',
  server: 'localhost',
  port: 1433, 

  database: 'StudentDB',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = {
  sql,
  pool,
  poolConnect
};
