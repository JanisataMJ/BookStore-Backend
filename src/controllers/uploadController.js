const { createUploadFile } = require("../services/uploadService");
const { insertBooksExcel } = require("../services/uploadService");

const excelToJson = require("convert-excel-to-json");
const fs = require("fs-extra");

/*const uploadFile = (req, res) => {
  try {
    const result = createUploadFile(req.file);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};*/

const uploadFile = async (req, res) => {
  try {
    const result = createUploadFile(req.file);
    console.log("result: ", result);
    if (!result) {
      return res
        .status(400)
        .json({ message: "File not found or invalid type" });
    } else {
      var filePath = req.file.path;

      const excelToJsonData = excelToJson({
        sourceFile: filePath,
        header: { rows: 1 },
        columnToKey: {
          A: "TITLE",
          B: "AUTHOR_NAME",
          C: "CATEGORY_NAME",
          D: "PRICE",
          E: "STOCK_QTY",
        },
      });
      console.log("excelToJsonData: ", excelToJsonData);

      const sheetNames = Object.keys(excelToJsonData);
      const jsonArray = excelToJsonData[sheetNames[0]];

      console.log("Array: ", Array.isArray(jsonArray));
      console.log("jsonArray: ", jsonArray);

      await insertBooksExcel(jsonArray);
      res.status(200).json({
        message: "Insert success",
        data: jsonArray,
      });
    }
  } catch (error) {
    console.log("error: ", error);
    //res.status(400).json({ message: error.message });
    return res.status(400).json({
      code: "DUPLICATE_TITLE",
      message: `Book title "${TITLE}" already exists`,
    });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

module.exports = {
  uploadFile,
};
