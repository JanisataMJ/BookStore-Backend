const { mssql, mssqlConfig } = require("../config/db");


const categories = [];


const fetchCategories = () => {
  return categories;
};


const getCategories = async () => {
  const pool = await mssql.connect(mssqlConfig);
  const result = await pool.request().query(
      "SELECT * FROM CATEGORIES WHERE FLAG_USE = 1",
    );


    return result;
};


module.exports = { fetchCategories, getCategories };