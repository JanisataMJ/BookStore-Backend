import { mssql } from "../../app";
import { mssqlConfig } from "../../app";

const books = [];

exports.fetchBooks = () => {
  return books;
};

/*exports.addBook = (book) => {
  books.push(book);
  return book;
};*/

exports.getBooks = async () => {
  const pool = await mssql.connect(mssqlConfig);
  await pool.request().query(`
        SELECT 
          BOOKS.BOOK_ID,
          BOOKS.TITLE,  
          BOOKS.PRICE, 
          BOOKS.STOCK_QTY, 
          AUTHORS.AUTHOR_NAME, 
          CATEGORIES.CATEGORY_NAME 
        FROM BOOKS
        INNER JOIN AUTHORS
          ON BOOKS.AUTHOR_ID = AUTHORS.AUTHOR_ID
        INNER JOIN CATEGORIES
          ON BOOKS.CATEGORY_ID = CATEGORIES.CATEGORY_ID
        WHERE BOOKS.FLAG_USE = 1
        `);
};

exports.createBook = async () => {
  const { TITLE, AUTHOR_ID, CATEGORY_ID, PRICE, STOCK_QTY } = req.body;
  const pool = await mssql.connect(mssqlConfig);
  await pool
    .request()
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
};

exports.getBookID = async () => {
  let id = req.params.id;
  const pool = await mssql.connect(mssqlConfig);
  await pool
    .request()
    .input("id", mssql.Int, id)
    .query("SELECT * FROM BOOKS WHERE BOOK_ID = @id");
};

exports.updateBook = async () => {
  const { TITLE, AUTHOR_ID, CATEGORY_ID, PRICE, STOCK_QTY } = req.body;
  let id = req.params.id;
  const pool = await mssql.connect(mssqlConfig);
  await pool
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
};

exports.deleteBook = async () => {
  let id = req.params.id;
  const pool = await mssql.connect(mssqlConfig);
  await pool
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
};
