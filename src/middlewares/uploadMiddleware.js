const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './files-upload')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  },
})


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {

    if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel"
    ) {
      cb(null, true);
    } else {
      cb(new Error("กรุณาอัปโหลดเฉพาะไฟล์ Excel (.xlsx หรือ .xls)"));
    }
  },
});


module.exports = upload;
