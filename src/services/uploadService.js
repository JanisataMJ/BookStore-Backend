//const { uploadFile } = require("../controllers/uploadController"); ห้าม
const { map } = require("zod");
const { mssql, mssqlConfig } = require("../config/db");

const createUploadFile = (file) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  return {
    filename: file.filename,
    originalname: file.originalname,
    path: file.path,
    size: file.size,
  };
};

const insertBooksExcel = async (data) => {
  try {
    const titles = data.map((d) => d.TITLE.trim());
    const uniqueTitles = new Set(titles);

    if (titles.length !== uniqueTitles.size) {
      throw new Error("Duplicate titles found in Excel file");
    }

    const pool = await mssql.connect(mssqlConfig);

    const request = pool.request();

    titles.forEach((title, index) => {
      request.input(`TITLE${index}`, mssql.NVarChar(300), title);
    });

    const inClause = titles.map((_, index) => `@TITLE${index}`).join(",");

    const duplicateDB = await request.query(`
  SELECT TITLE FROM BOOKS
  WHERE TITLE IN (${inClause})
  AND FLAG_USE = 1
`);

    if (duplicateDB.recordset.length > 0) {
      const dupTitles = duplicateDB.recordset.map((d) => d.TITLE);
      throw new Error(`Duplicate titles in database: ${dupTitles.join(", ")}`);
    }

    const author = await mssql.query(
      "SELECT AUTHOR_ID, AUTHOR_NAME FROM AUTHORS WHERE FLAG_USE = 1",
    );
    const category = await mssql.query(
      "SELECT CATEGORY_ID, CATEGORY_NAME FROM CATEGORIES WHERE FLAG_USE = 1",
    );

    const authorMap = new Map();
    author.recordset.forEach((a) => {
      authorMap.set(a.AUTHOR_NAME.trim(), a.AUTHOR_ID);
    });

    const categoryMap = new Map();
    category.recordset.forEach((c) => {
      categoryMap.set(c.CATEGORY_NAME.trim(), c.CATEGORY_ID);
    });

    let errors = [];

    for (let i = 0; i < data.length; i++) {
      const authorId = authorMap.get(data[i].AUTHOR_NAME?.trim());
      const categoryId = categoryMap.get(data[i].CATEGORY_NAME?.trim());

      if (!authorId) {
        errors.push(
          `AUTHOR_NAME '${data[i].AUTHOR_NAME}' not miss match with database`,
        );
      }

      if (!categoryId) {
        errors.push(
          `Row ${i + 1}: CATEGORY_NAME '${data[i].CATEGORY_NAME}' not found`,
        );
      }

      if (authorId) data[i].AUTHOR_ID = authorId;
      if (categoryId) data[i].CATEGORY_ID = categoryId;
    }

    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
    const table = new mssql.Table();
    table.columns.add("TITLE", mssql.NVarChar(300));
    table.columns.add("AUTHOR_ID", mssql.Int);
    table.columns.add("CATEGORY_ID", mssql.Int);
    table.columns.add("PRICE", mssql.Decimal(10, 2));
    table.columns.add("STOCK_QTY", mssql.Int);
    table.columns.add("CREATED_BY", mssql.NVarChar(200));
    table.columns.add("CREATED_AT", mssql.DateTime2(7));
    table.columns.add("FLAG_USE", mssql.Bit);

    data.forEach((order) => {
      table.rows.add(
        order.TITLE,
        order.AUTHOR_ID,
        order.CATEGORY_ID,
        order.PRICE,
        order.STOCK_QTY,
        "SYSTEM",
        new Date(),
        1,
      );
    });

    const result = await pool
      .request()
      .input("BOOKS", table)
      .execute("InsertBooksBulk");

    console.log("Data json insert to databasecompleted. : ", result);
    await mssql.close();

    return result;
  } catch (err) {
    console.error("Error performing insert data to database:", err);
    throw err;
  }
};

module.exports = {
  createUploadFile,
  insertBooksExcel,
};
