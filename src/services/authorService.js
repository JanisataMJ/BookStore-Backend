const { mssql, mssqlConfig } = require("../config/db");


const authors = [];


const fetchAuthors = () => {
  return authors;
};


const getAuthors = async () => {
  const pool = await mssql.connect(mssqlConfig);
  const result = await pool.request().query(
      "SELECT * FROM AUTHORS WHERE FLAG_USE = 1",
    );
    return result;
};


module.exports = { fetchAuthors, getAuthors };
