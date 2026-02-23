const mssql = require("mssql");

const mssqlConfig = {
  user: "cuuser",
  password: "cuuser",
  database: "BookStore",
  server: "localhost",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

module.exports = {
  mssql,
  mssqlConfig,
};
