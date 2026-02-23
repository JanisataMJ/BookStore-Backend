const bookService = require('../services/bookService');

/*exports.getAllBooks = (req, res) => {
  const books = bookService.fetchUsers();
  res.status(200).json(books);
};

exports.createbook = (req, res) => {
  const newBook = bookService.addBook(req.body);
  res.status(201).json(newBook);
};*/



// GET (JOIN = BOOKS + CATEGORIES + AUTHORS)  /books/joinCatAu ทั้งหมดในตาราง BOOKS ออกมา
exports.getAllBooksFlagUse = async (req, res) => {
  try {
    const res = bookService.getBooks();
    res.json({
      status: true,
      message: "Success",
      data: res.recordset,
    });
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Error fetching books" });
  }
};

// POST /book สร้าง BOOS ใหม่บันทึกเข้าไป
exports.createBook = async (req, res) => {
  try {
    //validate
    const res = bookService.createBook();
    console.log("Insert result:", res.recordset);
    res.json({
      status: true,
      message: "Success",
      data: res.recordset[0],
    });
  } catch (err) {
    console.error("Error insert books:", err.message);
    res.status(500).json({ error: "Error insert books" });
  }
}; // book_id ตอนเริ่ม ไม่เรียงจากที่มีอยู่ แต่หลังจากนั้นเรียงปกติ

// GET /books/:id เลือก BOOK_ID ในตาราง BOOKS ออกมา
exports.getBookID = async (req, res) => {
  try {
    const res = bookService.getBookID();
    if (res.recordset.length > 0) {
      res.json({
        status: true,
        message: "Success",
        data: res.recordset[0],
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
exports.updateBook("/books/:id", async (req, res) => {
  try {
    const res = bookService.updateBook();
    console.log("Update result:", res.recordset);

    if (res.recordset.length > 0) {
      res.json({
        status: true,
        message: "Success",
        data: res.recordset[0],
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
exports.deleteBook("/books/:id", async (req, res) => {
  try {
    const res = bookService.updateBook();
    if (res.recordset.length > 0) {
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