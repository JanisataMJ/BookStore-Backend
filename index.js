const express = require("express");
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const port = 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

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

// GET /books ทั้งหมดในตาราง BOOKS ออกมา
app.get("/books", async (req, res) => {
  try {
    await mssql.connect(mssqlConfig);
    const result = await mssql.query("SELECT * FROM BOOKS WHERE FLAG_USE = 1");
    res.json({
      status: true,
      message: "Success",
      data: result.recordset,
    });
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Error fetching books" });
  }
});

// GET (JOIN = BOOKS + CATEGORIES + AUTHORS)  /books/joinCatAu ทั้งหมดในตาราง BOOKS ออกมา
app.get("/books/joinCatAu", async (req, res) => {
  try {
    const pool = await mssql.connect(mssqlConfig);
    const result = await pool.request().query(`
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
    res.json({
      status: true,
      message: "Success",
      data: result.recordset,
    });
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Error fetching books" });
  }
});

// POST /book สร้าง BOOS ใหม่บันทึกเข้าไป
app.post("/books", async (req, res) => {
  try {
    const { TITLE, AUTHOR_ID, CATEGORY_ID, PRICE, STOCK_QTY } = req.body;
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
    console.log("Insert result:", result.recordset);
    res.json({
      status: true,
      message: "Success",
      data: result.recordset[0],
    });
  } catch (err) {
    console.error("Error insert books:", err.message);
    res.status(500).json({ error: "Error insert books" });
  }
}); // book_id ตอนเริ่ม ไม่เรียงจากที่มีอยู่ แต่หลังจากนั้นเรียงปกติ

// GET /books/:id เลือก BOOK_ID ในตาราง BOOKS ออกมา
app.get("/books/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const pool = await mssql.connect(mssqlConfig);
    const result = await pool
      .request()
      .input("id", mssql.Int, id)
      .query("SELECT * FROM BOOKS WHERE BOOK_ID = @id");
    if (result.recordset.length > 0) {
      res.json({
        status: true,
        message: "Success",
        data: result.recordset[0],
      });
    } else {
      res.status(404).json({
        message: "ID not found",
      });
    }
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Error fetching books" });
  }
});

// PUT /books/:id แก้ไขข้อมูลจาก BOOK_ID ในตาราง BOOKS
app.put("/books/:id", async (req, res) => {
  try {
    const { TITLE, AUTHOR_ID, CATEGORY_ID, PRICE, STOCK_QTY } = req.body;
    let id = req.params.id;
    const pool = await mssql.connect(mssqlConfig);
    // const authorResult = await pool
    //   .request()
    //   .input("AUTHOR_NAME", mssql.NVarChar(200), AUTHOR_NAME)
    //   .query("SELECT AUTHOR_ID FROM AUTHORS WHERE AUTHOR_NAME = @AUTHOR_NAME");
    // if (authorResult.recordset.length === 0) {
    //   return res.status(400).json({ message: "Author not found" });
    // }
    // const AUTHOR_ID = authorResult.recordset[0].AUTHOR_ID;

    // const categoryResult = await pool
    //   .request()
    //   .input("CATEGORY_NAME", mssql.NVarChar(200), CATEGORY_NAME)
    //   .query("SELECT CATEGORY_ID FROM CATEGORIES WHERE CATEGORY_NAME = @CATEGORY_NAME");
    // if (categoryResult.recordset.length === 0) {
    //   return res.status(400).json({ message: "Category not found" });
    // }
    // const CATEGORY_ID = categoryResult.recordset[0].CATEGORY_ID;

    const result = await pool
      .request()
      .input("id", mssql.Int, id)
      .input("TITLE", mssql.NVarChar(300), TITLE)
      .input("AUTHOR_ID", mssql.Int, AUTHOR_ID)
      .input("CATEGORY_ID", mssql.Int, CATEGORY_ID)
      .input("PRICE", mssql.Decimal(10, 2), PRICE)
      .input("STOCK_QTY", mssql.Int, STOCK_QTY)
      .input("UPDATED_BY", mssql.NVarChar(200), "SYSTEM")
      .input("UPDATED_AT", mssql.DateTime2(7), new Date())
      .query(`
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
    console.log("Update result:", result.recordset);

    if (result.recordset.length > 0) {
      res.json({
        status: true,
        message: "Success",
        data: result.recordset[0],
      });
    } else {
      res.status(404).json({
        message: "id not found",
      });
    }
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Error fetching books" });
  }
});

// DELETE /books/:id ลบข้อมูล BOOK_ID ในตาราง BOOKS
app.delete("/books/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const pool = await mssql.connect(mssqlConfig);
    const result = await pool
      .request()
      .input("id", mssql.Int, id)
      .input("FLAG_USE", mssql.Bit, 0)
      .input("UPDATED_BY", mssql.NVarChar(200), "SYSTEM")
      .input("UPDATED_AT", mssql.DateTime2(7), new Date())
      .query(`
        UPDATE BOOKS 
        SET 
        FLAG_USE = @FLAG_USE, 
        UPDATED_BY = @UPDATED_BY, 
        UPDATED_AT = @UPDATED_AT 
        OUTPUT INSERTED.* 
        WHERE BOOK_ID = @id`,
      );
    if (result.recordset.length > 0) {
      res.json({
        status: true,
        message: "Success",
        data: result.recordset[0],
      });
    } else {
      res.status(404).json({
        message: "ID not found",
      });
    }
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Error fetching books" });
  }
});

// ลบแบบในตารางหายทั้งแถว
/*app.delete("/books/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const pool = await mssql.connect(mssqlConfig);
    const result = await pool
      .request()
      .input("id", mssql.Int, id)

      .query("DELETE FROM BOOKS WHERE BOOK_ID = @id");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching books:", err.message); // ให้ dev เห็น
    res.status(500).json({ error: "Error fetching books" }); // user จะเห็นข้อความนี้
  }
});*/

// GET /categories ทั้งหมดในตาราง CATEGORIES ออกมา
app.get("/categories", async (req, res) => {
  try {
    await mssql.connect(mssqlConfig);
    const result = await mssql.query(
      "SELECT * FROM CATEGORIES WHERE FLAG_USE = 1",
    );
    res.json({
      status: true,
      message: "Success",
      data: result.recordset,
    });
  } catch (err) {
    console.error("Error fetching categories:", err.message);
    res.status(500).json({ error: "Error fetching categories" });
  }
});

// GET /authors ทั้งหมดในตาราง AUTHORS ออกมา
app.get("/authors", async (req, res) => {
  try {
    await mssql.connect(mssqlConfig);
    const result = await mssql.query(
      "SELECT * FROM AUTHORS WHERE FLAG_USE = 1",
    );
    res.json({
      status: true,
      message: "Success",
      data: result.recordset,
    });
  } catch (err) {
    console.error("Error fetching categories:", err.message);
    res.status(500).json({ error: "Error fetching categories" });
  }
});
