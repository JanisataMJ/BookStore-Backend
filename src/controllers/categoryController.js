const categoryService = require('../services/categoryService');


const getCategories = async (req, res) => {
  try {
    const { CATEGORY_NAME } = req.query;
    const result = await categoryService.getCategories( CATEGORY_NAME );
    res.json({
      status: true,
      message: "Success",
      data: result.recordset,
    });
  } catch (err) {
    console.error("Error fetching categories:", err.message);
    res.status(500).json({ error: "Error fetching categories" });
  }
};


module.exports = { getCategories };
