const { mssql, mssqlConfig } = require("../config/db");
const books = [];

const fetchBooks = () => {
  return books;
};

const getBooks = async ({
  TITLE,
  AUTHOR_NAME,
  CATEGORY_ID,
  page,
  pageSize,
}) => {
  const pool = await mssql.connect(mssqlConfig);
  const request = pool.request();

  let whereClause = "WHERE BOOKS.FLAG_USE = 1";

  if (TITLE || AUTHOR_NAME) {
    whereClause += `
    AND (
      BOOKS.TITLE LIKE @SEARCH
      OR AUTHORS.AUTHOR_NAME LIKE @SEARCH
    )
  `;
    request.input("SEARCH", mssql.NVarChar, `%${TITLE || AUTHOR_NAME}%`);
  }

  if (CATEGORY_ID) {
    whereClause += " AND BOOKS.CATEGORY_ID = @CATEGORY_ID";
    request.input("CATEGORY_ID", mssql.Int, CATEGORY_ID);
  }

  const offset = (page - 1) * pageSize;
  request.input("offset", mssql.Int, offset);
  request.input("pageSize", mssql.Int, pageSize);

  const dataQuery = `
    SELECT
      BOOKS.BOOK_ID,
      BOOKS.TITLE,
      BOOKS.PRICE,
      BOOKS.STOCK_QTY,
      BOOKS.AUTHOR_ID,
      BOOKS.CATEGORY_ID,
      AUTHORS.AUTHOR_NAME,
      CATEGORIES.CATEGORY_NAME
    FROM BOOKS
    INNER JOIN AUTHORS ON BOOKS.AUTHOR_ID = AUTHORS.AUTHOR_ID
    INNER JOIN CATEGORIES ON BOOKS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
    ${whereClause}
    ORDER BY BOOKS.BOOK_ID
    OFFSET @offset ROWS
    FETCH NEXT @pageSize ROWS ONLY
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM BOOKS
    INNER JOIN AUTHORS ON BOOKS.AUTHOR_ID = AUTHORS.AUTHOR_ID
    INNER JOIN CATEGORIES ON BOOKS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
    ${whereClause}
  `;

  const dataResult = await request.query(dataQuery);

  const countRequest = pool.request();
  if (TITLE) countRequest.input("TITLE", mssql.NVarChar, `%${TITLE}%`);
  if (AUTHOR_NAME)
    countRequest.input("AUTHOR_NAME", mssql.NVarChar, `%${AUTHOR_NAME}%`);
  if (CATEGORY_ID) countRequest.input("CATEGORY_ID", mssql.Int, CATEGORY_ID);

  const countResult = await countRequest.query(countQuery);

  return {
    data: dataResult.recordset,
    total: countResult.recordset[0].total,
    page,
    pageSize,
  };
};

const getTotalBooks = async () => {
  const pool = await mssql.connect(mssqlConfig);

  const result = await pool.request().query(`
    SELECT
      COUNT(*) AS totalBooks,
      COALESCE(SUM(CAST(PRICE AS decimal(18,2)) * CAST(STOCK_QTY AS int)), 0) AS totalPrice,
      COALESCE(SUM(CAST(STOCK_QTY AS int)), 0) AS totalStock
    FROM BOOKS
    WHERE FLAG_USE = 1
  `);

  return result.recordset[0];
};

const createBook = async (data) => {
  const { TITLE, AUTHOR_ID, CATEGORY_ID, PRICE, STOCK_QTY } = data;
  const pool = await mssql.connect(mssqlConfig);
  const result = await pool
    .request()
    .input("TITLE", mssql.NVarChar(300), TITLE)
    .input("AUTHOR_ID", mssql.Int, AUTHOR_ID)
    .input("CATEGORY_ID", mssql.Int, CATEGORY_ID)
    .input("PRICE", mssql.Decimal(10, 2), PRICE)
    .input("STOCK_QTY", mssql.Int, STOCK_QTY)
    .input("CREATED_BY", mssql.NVarChar(200), "SYSTEM")
    .input("CREATED_AT", mssql.DateTime2(7), new Date())
    .input("FLAG_USE", mssql.Bit, 1).query(`
        INSERT INTO BOOKS
        (TITLE, AUTHOR_ID, CATEGORY_ID, PRICE, STOCK_QTY, CREATED_BY, CREATED_AT, FLAG_USE)
        OUTPUT INSERTED.*
        VALUES
        (@TITLE, @AUTHOR_ID, @CATEGORY_ID, @PRICE, @STOCK_QTY, @CREATED_BY, @CREATED_AT, @FLAG_USE)
      `);
  return result;
};

const getBookID = async (id) => {
  //let id = req.params.id;
  const pool = await mssql.connect(mssqlConfig);
  const result = await pool
    .request()
    .input("id", mssql.Int, id)
    .query("SELECT * FROM BOOKS WHERE BOOK_ID = @id");
  return result;
};

const updateBook = async (id, data) => {
  const { TITLE, AUTHOR_ID, CATEGORY_ID, PRICE, STOCK_QTY } = data;
  //let id = req.params.id;
  const pool = await mssql.connect(mssqlConfig);
  const result = await pool
    .request()
    .input("id", mssql.Int, id)
    .input("TITLE", mssql.NVarChar(300), TITLE)
    .input("AUTHOR_ID", mssql.Int, AUTHOR_ID)
    .input("CATEGORY_ID", mssql.Int, CATEGORY_ID)
    .input("PRICE", mssql.Decimal(10, 2), PRICE)
    .input("STOCK_QTY", mssql.Int, STOCK_QTY)
    .input("UPDATED_BY", mssql.NVarChar(200), "SYSTEM")
    .input("UPDATED_AT", mssql.DateTime2(7), new Date()).query(`
        UPDATE BOOKS
        SET
        TITLE = @TITLE,
        AUTHOR_ID = @AUTHOR_ID,
        CATEGORY_ID = @CATEGORY_ID,
        PRICE = @PRICE,
        STOCK_QTY = @STOCK_QTY,
        UPDATED_BY = @UPDATED_BY,
        UPDATED_AT = @UPDATED_AT
        OUTPUT INSERTED.*
        WHERE BOOK_ID = @id
        `);
  return result;
};

const deleteBook = async (id) => {
  //let id = req.params.id;
  const pool = await mssql.connect(mssqlConfig);
  const result = await pool
    .request()
    .input("id", mssql.Int, id)
    .input("FLAG_USE", mssql.Bit, 0)
    .input("UPDATED_BY", mssql.NVarChar(200), "SYSTEM")
    .input("UPDATED_AT", mssql.DateTime2(7), new Date()).query(`
        UPDATE BOOKS
        SET
        FLAG_USE = @FLAG_USE,
        UPDATED_BY = @UPDATED_BY,
        UPDATED_AT = @UPDATED_AT
        OUTPUT INSERTED.*
        WHERE BOOK_ID = @id`);
  return result;
};

module.exports = {
  fetchBooks,
  getBooks,
  createBook,
  getBookID,
  updateBook,
  deleteBook,
  getTotalBooks,
};
