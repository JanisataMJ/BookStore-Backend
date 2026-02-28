const z = require("zod");


const ExcelData = z.object({
  TITLE: z.string().min(1, "Title is required").max(300, "Title must be less than 300 characters"),
  AUTHOR_ID: z.number().int().positive("Author ID must be positive"),
  CATEGORY_ID: z.number().int().positive("Category ID must be positive"),
  PRICE: z.number().positive("Price must be greater than 0"),
  STOCK_QTY: z.number().int().nonnegative("Stock cannot be negative"),
});


module.exports = { ExcelData };
