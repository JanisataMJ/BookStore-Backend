const authorService = require('../services/authorService');

const getAuthors = async (req, res) => {
  try {
    const getResult = await authorService.getAuthors();
    //console.log(" getResult:", getResult.recordset);
    res.json({
      status: true,
      message: "Success",
      data: getResult.recordset,
    });
  } catch (err) {
    console.error("Error fetching categories:", err.message);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

module.exports = { getAuthors };