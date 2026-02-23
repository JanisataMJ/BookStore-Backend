const bookService = require("../services/bookService");
const { bookSchema } = require("../validator/book_validator");

// GET (JOIN = BOOKS + CATEGORIES + AUTHORS)  /books/joinCatAu ทั้งหมดในตาราง BOOKS ออกมา
//http://localhost:8000/api/books?title=harry&page=1&pageSize=5
const getAllBooksFlagUse = async (req, res) => {
  try {
    const { title, author, category, page = 1, pageSize = 10 } = req.query;
    const result = await bookService.getBooks({
      TITLE: title,
      AUTHOR_NAME: author,
      CATEGORY_ID: category,
      page: Number(page),
      pageSize: Number(pageSize),
    });
    res.json({
      status: true,
      message: "Success",
      data: result.data,
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    });
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Error fetching books" });
  }
};

const getTotalBooks = async (req, res) => {
  try {
    const data = await bookService.getTotalBooks();
    return res.json({
      status: true,
      message: "Success",
      data: data,
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    return res.status(500).json({ error: "Error fetching books" });
  }
};

// POST /book สร้าง BOOS ใหม่บันทึกเข้าไป
const createBook = async (req, res) => {
  try {
    //validate
    const validatedBook = bookSchema.parse(req.body);
    //const validate = await validateBook(req.body);
    //const data = req.body;
    const result = await bookService.createBook(validatedBook);
    console.log("Insert result:", result.recordset);
    res.json({
      status: true,
      message: "Success",
      data: result.recordset[0],
    });
  } catch (err) {
    if (err.errors) {
      return res.status(400).json({
        status: false,
        errors: err.errors,
      });
    }

    console.error("Error insert books:", err.message);
    res.status(500).json({ error: "Error insert books" });
  }
}; // book_id ตอนเริ่ม ไม่เรียงจากที่มีอยู่ แต่หลังจากนั้นเรียงปกติ

// GET /books/:id เลือก BOOK_ID ในตาราง BOOKS ออกมา
const getBookID = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await bookService.getBookID(id);
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
};

// PUT /books/:id แก้ไขข้อมูลจาก BOOK_ID ในตาราง BOOKS
const updateBook = async (req, res) => {
  try {
    const validatedBook = bookSchema.parse(req.body);
    const id = req.params.id;
    const result = await bookService.updateBook(id, validatedBook);
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
    if (err.errors) {
      return res.status(400).json({
        status: false,
        errors: err.errors,
      });
    }
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Error fetching books" });
  }
};

// DELETE /books/:id ลบข้อมูล BOOK_ID ในตาราง BOOKS
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await bookService.deleteBook(id);
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
};

module.exports = {
  getAllBooksFlagUse,
  createBook,
  getBookID,
  updateBook,
  deleteBook,
  getTotalBooks,
};
